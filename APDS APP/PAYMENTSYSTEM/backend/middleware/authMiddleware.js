import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Log request headers for debugging
    console.log('Request Headers:', req.headers);

    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    // Check if Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header, access denied' });
    }

    const parts = authHeader.split(' ');

    // Validate the structure of the Authorization header
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Authorization header format must be "Bearer [token]"' });
    }

    const token = parts[1];
    console.log('Token:', token);

    // Verify the JWT token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        // Attach decoded token payload to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Token Verification Error:', err);

        // Handle specific JWT errors like expired or malformed tokens
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Server error during authentication' });
    }
};

export default authMiddleware;
