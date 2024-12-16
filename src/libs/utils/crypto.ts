import crypto from 'crypto';

// Constants
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const IV_LENGTH = 16; // Panjang Initialization Vector (IV)

// Helper to generate IV
const generateIV = () => crypto.randomBytes(IV_LENGTH);

// Helper to generate 32-byte key
const getKey = () => crypto.createHash('sha256').update(SECRET_KEY).digest();

// Encrypt function
export function encrypt(data: string | object): string {
  const iv = generateIV();
  const key = getKey();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const dataString = typeof data === 'object' ? JSON.stringify(data) : data;

  let encrypted = cipher.update(dataString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Decrypt function
export function decrypt(encryptedData: string): string | object {
  const [ivHex, encrypted] = encryptedData.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Invalid encrypted data format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const key = getKey();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  try {
    return JSON.parse(decrypted); // Return as object if possible
  } catch {
    return decrypted; // Return as string if not a JSON
  }
}

// Hashing function with salt
export function hashing(data: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(data, salt, 1000, 64, 'sha256').toString('hex');
    return `${salt}:${hash}`;
}

// Verify hashed data
export function verifyHash(data: string, hashedData: string): boolean {
    const [salt, originalHash] = hashedData.split(':');
    if (!salt || !originalHash) {
        throw new Error('Invalid hash format');
    }

    const hash = crypto.pbkdf2Sync(data, salt, 1000, 64, 'sha256').toString('hex');
    return hash === originalHash;
}
