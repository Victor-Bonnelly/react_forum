import dotenv from 'dotenv';

dotenv.config();

console.log('Current directory:', process.cwd());
console.log('JWT_SECRET:', process.env.JWT_SECRET); 
console.log('PORT:', process.env.PORT);