import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {       // After development REMOVE    || !origin
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

export default corsOptions;