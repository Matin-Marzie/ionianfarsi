import { findUserByUsername, getAllUsersPublicProfileFromDB, updateUserByUsernameInDB, updatePasswordInDB, deleteUserByUsernameFromDB, updateUsernameInDB, getUserPublicProfileFromDB } from "../models/usersModel.js";
import { updateUserSchema, changePasswordSchema, changeUsernameSchema } from "../validation/UserSchema.js";
import { comparePassword, hashPassword } from '../utils/password.js'
import jwt from 'jsonwebtoken';


export const getAllUsersPublicProfile = async (req, res) => {
    try {
        const results = await getAllUsersPublicProfileFromDB();
        res.json(results);
    } catch (err) {
        console.error("Error fetching users from Database:", err);
        res.status(500).json({ error: "Error fetching users from Databse" });
    }
}

export const getPublicUserProfile = async (req, res) => {
    const { username } = req.params; // extract username from URL

    try {
        const user = await getUserPublicProfileFromDB(username);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
        
    } catch (err) {
        console.error("Error fetching public profile:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// User all private info (Need Authorization)
// /api/users/me → private info
export const getUser = async (req, res) => {
    try {
        const foundUser = await findUserByUsername(req.user.username);
        // We extract username from accessToken in verifyJwt, in case username changed and client has old accessToken
        if (!foundUser) return res.status(403).json({ message: "Username not found. Invalid/expired access token" });

        const { password, refresh_token, ...safeUser } = foundUser;
        res.json(safeUser);
    } catch (err) {
        console.error("Error in getUser:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Update user profile (non-password fields)
export const updateUser = async (req, res) => {
    
    // Validate request body strictly against schema
    const { error, value } = updateUserSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const username = req.user; // comes from verifyJWT middleware
        const dbResult = await updateUserByUsernameInDB(username.username, value);

        // username not found, possible cause: username changed and accessToken is invalid
        if (dbResult.affectedRows === 0) {
            res.status(403).json({ message: "Username not found. Invalid/expired access token" });
        } else {
            res.json({ message: "User updated successfully." });
        }
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};


export const changeUsername = async (req, res) => {
    // Validating parameters with Joi. Joi schemas are located in validation/ repository
    const { error, value } = changeUsernameSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // To change username, user needs refresh token, we first check for access token in verifyJWT and in this function we check for the refreshToken
    // Hence if accessToken is stolen, attacker can't issue new refreshToken with that accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "UNAUTHORIZED. Refresh token not found" }); // Unauthorized
    const refreshToken = cookies.jwt;

    const { new_username } = value;
    let username;

    try {
        // Extract username from refreshToken (synchronous verification)
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        username = decoded.username; // Current username extracted from refresh token sent by client

        // Check if new username is same as current
        if (username === new_username) {
            return res.status(400).json({ message: "New username must be different from the current one." }); // Bad request
        }

        // Check if new_username already exists (is taken)
        const existing = await findUserByUsername(new_username);
        if (existing) return res.status(409).json({ message: "Username already taken." }); // Conflict 409

        // Issue new Tokens
        const newRefreshToken = jwt.sign(
            { username: new_username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );

        const accessToken = jwt.sign(
            { username: new_username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Update username in DB
        const dbResult = await updateUsernameInDB(username, new_username, newRefreshToken);

        // old username not found in the Database, possible cause: client/user tries to change username with old refreshToken which is not expired yet
        if (dbResult.affectedRows === 0) {
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            });
            return res.status(404).json({ message: 'Old username not found in the DB.' });
        }

        // When username update, send new RefreshToken and AccessToken to client
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true, // required if sameSite=None in production
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return res.json({ message: `Username changed successfully.`, accessToken });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};


// Change password
export const changePassword = async (req, res) => {
    try {
        // Validate input
        const { error, value } = changePasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { old_password, new_password } = value;
        const username = req.user.username; // from JWT middleware

        // Find user
        const foundUser = await findUserByUsername(username);
        // We extract username from accessToken in verifyJwt, in case username changed and client has old accessToken
        if (!foundUser) return res.status(403).json({ message: "Username not found. Invalid/expired access token" });

        // Check old password
        const match = await comparePassword(old_password, foundUser.password);
        if (!match) {
            return res.status(403).json({ message: "Old password is incorrect." });
        }

        // Hash new password
        const new_hashed_password = await hashPassword(new_password);

        // Update in DB
        await updatePasswordInDB(username, new_hashed_password);

        res.json({ message: "Password updated successfully." });
    } catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const username = req.user.username; // authenticated user

        // Delete user from DB
        const result = await deleteUserByUsernameFromDB(username);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or already deleted.' });
        }

        // Clear cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true, // use true in production with HTTPS
            sameSite: 'None',
        });

        res.json({ message: 'User deleted successfully.' });

    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};