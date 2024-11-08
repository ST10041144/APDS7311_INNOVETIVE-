// import express from 'express';
// import Transaction from '../models/Transaction.js';

// import { body, validationResult } from 'express-validator';


// const router = express.Router();

// router.put('/:id/verify', async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

//     transaction.status = 'Processed';
//     await transaction.save();
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// export default router;



// // Code Attribution 
// // This code was referenced from Medium 
// // How to hash password in React App, before sending it to the API | by JonathanSanchez.Dev | Boca Code | Medium
// // Author name JonathanSanchez
// // https://medium.com/@jonathans199?source=post_page-----6e10a06f0a8e--------------------------------


// // Code Attribution
// // This code was referenced from StackOverFlow 
// // filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow
// // Author name StackOverFlow 
// // filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow



// // Code Attribution
// // This code was referened from Dev Community
// // Data Encryption: Securing Data at Rest and in Transit with Encryption Technologies - DEV Community 
// // Author name Jatin 
// //https://dev.to/j471n

// // Code Attribution 
// // This code was referenced from Practical devsecops
// // What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com) 
// // Author name Devscopes 
// //What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com)