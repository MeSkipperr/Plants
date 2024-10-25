import bcrypt from 'bcrypt';

export default async function hashing(password:string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
