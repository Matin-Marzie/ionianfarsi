import { findUserByRefreshToken,findUserByUsername, getAllUsersFromDB } from "../models/usersModel.js";
import jwt from 'jsonwebtoken'

// User all info
export const getUser = async (req, res) => {
    // Authorization:
    console.log(req.user.username,  req.params.username)
    if (req.user.username !== req.params.username) return res.sendStatus(403);

    const foundUser = await findUserByUsername(req.user.username);
    if (!foundUser) return res.sendStatus(404);

    const { password, refresh_token, ...safeUser } = foundUser;
    res.json(safeUser);
};

export const updateUser = async (req, res) => {
    res.status(501).json({ message: 'This endpoint is under development.' });
}

export const deleteUser = async (req, res) => {
    res.status(501).json({ message: 'This endpoint is under development.' });
}

export const getPublicUserProfile = async (req, res) => {
    // user getUser()
    res.status(501).json({ message: 'This endpoint is under development.' });
}

export const getAllUsers = async (req, res) => {
    try {
        const results = await getAllUsersFromDB();
        res.json(results);
    } catch (err) {
        console.error("Error fetching users from Database:", err);
        res.status(500).json({ error: "Error fetching users from Databse" });
    }
}