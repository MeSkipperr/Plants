export default function futureTime(input: string): string | undefined {
    const unit: string = input.slice(-1);
    const amount: number = parseInt(input.slice(0, -1));

    const conversion: { [key: string]: number } = {
        h: 3600000,
        m: 60000,
        d: 86400000,
        M: 2592000000  
    };

    if (isNaN(amount) || !conversion[unit]) {
        return  undefined;
    }

    const futureDate: Date = new Date(Date.now() + amount * conversion[unit]);
    return futureDate.toISOString();
}
