import futureTime from "./futureTime";
import crypto from 'crypto';


export async function encrypt(data: object, expired?: string): Promise<string | undefined> {
    if (!data) return;

    // Calculate the expiration date if provided
    const expiredDate = expired ? futureTime(expired) : undefined;

    const newData = {
        data,
        expiredDate
    };

    const dataString = JSON.stringify(newData);

    // Use a secret key for AES encryption (stored in your environment variables)
    const secretKey = process.env.ENCRYPTION_SECRET_KEY || 'defaultSecretKey';

    // Ensure the secret key is exactly 32 bytes long (use SHA-256 hash)
    const key = crypto.createHash('sha256').update(secretKey).digest();

    const iv = crypto.randomBytes(16);  // Generate a random initialization vector (IV)

    // AES encryption: Create a cipher and encrypt the data
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(dataString, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    // The IV is important for decryption, so store it alongside the encrypted data
    const ivHex = iv.toString('hex');
    const result = {
        iv: ivHex,
        encryptedData
    };

    return JSON.stringify(result);  // Return both encrypted data and IV as a JSON string
}

export function decrypt(encryptedData: string): object | null {
    const { iv, encryptedData: encrypted } = JSON.parse(encryptedData);

    // Use the same secret key as used in encryption
    const secretKey = process.env.ENCRYPTION_SECRET_KEY || 'defaultSecretKey';
    const ivBuffer = Buffer.from(iv, 'hex');  // Convert IV from hex to buffer

    // AES decryption: Create a decipher and decrypt the data
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf-8'), ivBuffer);
    let decryptedData = decipher.update(encrypted, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    try {
        const data = JSON.parse(decryptedData);
        return data; // Return the decrypted object
    } catch (error) {
        return null;  // If decryption fails, return null
    }
}

export function validateExpiration(expiredDate: string): boolean {
    const currentDate = new Date();
    const expirationDate = new Date(expiredDate);

    return currentDate < expirationDate;  // If the current date is before the expiration date, it's valid
}