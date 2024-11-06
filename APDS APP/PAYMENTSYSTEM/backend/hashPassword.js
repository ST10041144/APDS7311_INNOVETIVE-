import bcrypt from 'bcrypt';

// Replace these with your plaintext passwords
const passwords = ["Test123", "Winning123"]; // Add all passwords you need

async function hashPasswords() {
    for (const password of passwords) {
        const hash = await bcrypt.hash(password, 10);
        console.log(`Plain: ${password} -> Hashed: ${hash}`);
    }
}

hashPasswords();
