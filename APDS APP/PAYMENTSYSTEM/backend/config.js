import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import express from 'express';
import bcrypt from 'bcrypt';

// Load .env file contents into process.env
dotenv.config();

const app = express();

// Load your SSL certificates (in PEM format)
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
};

// Make sure MongoDB URI is loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);


//rate limit vaues
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // Default rate limit for users
  adminMaxRequests: 500, // Higher limit for admins
  delayAfter: 50, // After 50 requests, slow down
  delayMs: 500 // Delay per request after threshold
};

//predefined users
//const bcrypt = require('bcrypt');

// Replace with securely hashed passwords for each user
// const users = [
//     { email: "Test17890@gmail.com", password: "$2b$10$CohfhKlukDHTy3SgcKMOjOtXJXnIedRzVTdJP/cTGJq0DepmmT5F2" }, //password is Test123 
//     { email: "TestingStatic@gmail.com", password: "$2b$10$6J2zjt2uRr/3CQPkL7piLOOdXXwlvFwcSAhsZkwz/TMIQNBKml8O2" }, //password is TestStatic
//     { email: "WeWinning@gmail.com", password: "$2b$10$h0RZuqY76ugdr0.rpKX2e.EbT9zb58R8WiLTvqnr264S03U0GkXI6" }, //password is Winning123
//     // Add more predefined users as needed
// ];

// export default users;


