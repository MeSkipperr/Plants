export default function randomNumber(length: number): number {
    if (length <= 0) throw new Error("Length must be greater than 0");

    const [min, max] = [10 ** (length - 1), 10 ** length - 1];
    return Math.floor(min + Math.random() * (max - min + 1));
}
