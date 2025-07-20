import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || 1) {       // After development REMOVE    || 1
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

export default corsOptions;