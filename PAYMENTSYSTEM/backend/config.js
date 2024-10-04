import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import express from 'express';

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

// Serve the app over HTTPS
httpsServer.listen(process.env.HTTPS_PORT || 443, () => {
  console.log(`HTTPS Server running on port ${process.env.HTTPS_PORT || 443}`);
});
