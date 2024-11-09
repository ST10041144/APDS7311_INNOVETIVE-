import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const addSuperAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const hashedPassword = await bcrypt.hash('Test123', 10); // Replace with a strong password
  const superAdmin = new User({
    email: 'TestSuperAdmin@gmail.com.com',
    password: hashedPassword,
    role: 'superAdmin', // This ensures the conditional required fields are bypassed
});


  await superAdmin.save();
  console.log('Super admin added');
  mongoose.connection.close();
};

addSuperAdmin().catch(error => console.error(error));



//Run this script with "node seedSuperAdmin.js" to insert a super admin into the database