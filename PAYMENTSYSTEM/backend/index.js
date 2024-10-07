import dotenv from 'dotenv';
import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';
import authRoutes from './Routes/auth.js';
import paymentRoutes from './Routes/payment.js';
import transactionRoutes from './Routes/transaction.js';
import { ensureSSL } from './middleware/sslMiddleware.js'; // Import SSL middleware

dotenv.config(); // Ensure dotenv is loaded before using process.env

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
   origin: 'https://localhost:3000',  // frontend origin
   credentials: true // Allow credentials to be sent
}));
app.use(helmet());
app.use(morgan('combined'));

// Apply SSL redirection middleware (optional: only in production)
if (process.env.NODE_ENV === 'production') {
   app.use(ensureSSL);  // Redirect HTTP to HTTPS
}

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/payment', paymentRoutes); // Payment routes
app.use('/api/transaction', transactionRoutes); // Transaction routes

// SSL CERTIFICATE and KEY
const httpsOptions = {
   key: fs.readFileSync(process.env.SSL_KEY_PATH),  // Read key from .env
   cert: fs.readFileSync(process.env.SSL_CERT_PATH), // Read cert from .env
};

// Create HTTPS server
https.createServer(httpsOptions, app).listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
