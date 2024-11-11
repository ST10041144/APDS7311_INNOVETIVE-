import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: function() { return this.role !== 'superAdmin'; } 
    },
    idNumber: {
        type: String,
        trim: true,
        match: [/^\d{10,15}$/, 'idNumber must be between 10 and 15 digits'],
        required: function() { return this.role !== 'superAdmin'; } 
    },
    accountNumber: {
        type: String,
        unique: true,
        trim: true,
        match: [/^\d{10,12}$/, 'accountNumber must be between 10 and 12 digits'],
        required: function() { return this.role !== 'superAdmin'; } 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'employee', 'superAdmin'],
        default: 'customer',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', userSchema);



// Code Attribution
// This code was referenced from W3Schools
// CSS Tutorial (w3schools.com)
// Author name , W3Schools 
// CSS Tutorial (w3schools.com)




// Code Attribution 
// This code was referenced from W3Schoold 
// https://www.w3schools.com/Css/css_table.asp 
// Author name W3Schools 
//CSS Styling Tables (w3schools.com)

// Code Attribution 
// This code was referenced from Hatchjs
// How to Fix Live Server Not Working in VS Code (hatchjs.com) 
// Author name Marcus Greenwood 
// How to Fix Live Server Not Working in VS Code (hatchjs.com)

// Code Attribution 
// This code was referenced from FreeCodeCamp
// https://www.freecodecamp.org/news/visual-studio-code-live-server-not-working/
// Author name FreeCodeCamp
// Visual Studio Code Live Server Not Working (freecodecamp.org)

// Code Attribution 
// This code was referenced from Github
// Segmentation fault. VS Code Server for WSL closed unexpectedly. · Issue #3556 · microsoft/vscode-remote-release (github.com)
// Author name GitHub 
//Segmentation fault. VS Code Server for WSL closed unexpectedly. · Issue #3556 · microsoft/vscode-remote-release (github.com)
