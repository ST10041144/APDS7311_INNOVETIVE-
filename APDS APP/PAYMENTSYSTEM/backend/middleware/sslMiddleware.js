// backend/middleware/sslMiddleware.js
export const ensureSSL = (req, res, next) => {
    if (req.secure) {
        // If the request is already over HTTPS, proceed
        return next();
    } else {
        // Otherwise, redirect to the HTTPS version
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
};
