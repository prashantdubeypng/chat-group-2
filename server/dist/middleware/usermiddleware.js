import jwt from 'jsonwebtoken';
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || !decoded)
                return reject(err);
            resolve(decoded);
        });
    });
}
const usermiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    console.log("Authorization header:", auth); // Debug log
    console.log("Request URL:", req.url); // Debug log
    if (auth == null || auth == undefined) {
        return res.status(401).json({ message: 'Authorization header missing. Please login first' });
    }
    if (!auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid authorization format. Use Bearer token' });
    }
    const token = auth.split(' ')[1];
    console.log("Extracted token:", token); // Debug log
    if (!token) {
        return res.status(401).json({ message: 'Token not found in authorization header' });
    }
    try {
        const user_data = await verifyToken(token);
        console.log("Token verified for user:", user_data); // Debug log
        req.user = user_data;
        next();
    }
    catch (error) {
        console.log("Token verification error:", error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
export default usermiddleware;
//# sourceMappingURL=usermiddleware.js.map