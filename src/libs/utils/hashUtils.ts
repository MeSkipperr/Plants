import crypto from 'crypto';

/**
 * Generates a hash for the given input without using salt.
 * @param input - The string to be hashed.
 * @returns The hash of the input.
 */
const generateHashWithoutSalt = (input: string): string => {
    const hash = crypto
        .createHash('sha256') // You can change 'sha256' to another algorithm like 'sha512'
        .update(input)
        .digest('hex');
    
    return hash;
};

/**
 * Generates a hash for the given input with a salt.
 * @param input - The string to be hashed.
 * @param salt - The salt to use for hashing (optional, a random salt is used if not provided).
 * @returns An object containing the hash and the salt used.
 */
const generateHashWithSalt = (input: string, salt: string = crypto.randomBytes(16).toString('hex')) => {
    const hash = crypto
        .pbkdf2Sync(input, salt, 1000, 64, 'sha512')
        .toString('hex');

    return { hash, salt };
};

/**
 * Validates whether the given password matches the stored hash using the stored salt.
 * @param inputPassword - The password input from the user.
 * @param storedHash - The stored hash to compare against.
 * @param storedSalt - The stored salt used to create the hash.
 * @returns True if the password matches the hash, otherwise false.
 */
const validatePassword = (inputPassword: string, storedHash: string, storedSalt: string): boolean => {
    const hash = crypto
        .pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512')
        .toString('hex');

    return hash === storedHash;
};


export { generateHashWithoutSalt, generateHashWithSalt, validatePassword };