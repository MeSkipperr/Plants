"use server";
import { generateHashWithoutSalt } from '@/libs/utils/hashUtils';

export async function getHashedPassword(password: string): Promise<string> {
    return generateHashWithoutSalt(password);
}