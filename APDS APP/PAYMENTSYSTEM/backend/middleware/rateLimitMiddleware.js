import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import fs from 'fs';
import path from 'path';
import { rateLimitConfig } from '../config.js';

// Define the correct __dirname for ES module
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a write stream for logging suspicious activity
const logStream = fs.createWriteStream(path.join(__dirname, 'rateLimitLog.txt'), { flags: 'a' });

// Slow down requests from clients who exceed the rate limit
export const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // After 50 requests, slow down
    delayMs: () => 500, // Fixed 500ms delay for each exceeding request
});

// Limit the number of requests a user can make within a specific time frame
export const paymentRateLimiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: (req, res) => {
        return req.user && req.user.role === 'admin' ? rateLimitConfig.adminMaxRequests : rateLimitConfig.maxRequests;
    },
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        logStream.write(`Rate limit exceeded: ${req.ip} at ${new Date().toISOString()}\n`);
        res.status(options.statusCode).json({ message: options.message });
    }
});

// Code Attribution 
// This code was referenced from GitHub 
// https://github.com/express-rate-limit/express-rate-limit
// Author name express-rate-limit 
// express-tare-limit (github.com)