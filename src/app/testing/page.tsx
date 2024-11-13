// "use client"
// import useLocalStorage from '@/hooks/useLocalStorage';
// import { useState } from 'react';

// export default function Component() {
//     const [token, setToken, deleteToken] = useLocalStorage("token", "");
//     const [inputValue, setInputValue] = useState(token);
  
//     return (
//       <div>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Masukkan token"
//         />
//         <button onClick={() => setToken(inputValue)}>Update Token</button>
//         <button onClick={deleteToken}>Hapus Token</button>
//       </div>
//     );
// }


import crypto from 'crypto';
// import dotenv from 'dotenv';

// dotenv.config();

const SECRET = 'your_default_secret'; // Replace with actual SECRET in .env

const encryptData = (data: object): string => {
    try {
        const iv = crypto.randomBytes(16); // Initialization vector
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET, 'utf-8'), iv);

        const jsonData = JSON.stringify(data);
        let encryptedData = cipher.update(jsonData, 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        // Concatenate the IV with the encrypted data for later use in decryption
        return `${iv.toString('hex')}:${encryptedData}`;
    } catch (error) {
        console.error("Encryption failed:", error);
        return "Encryption failed.";
    }
};

// Example usage
const data = {
    user: {
        userEmail: "admin@admin.com",
        userToken: 61217870,
    },
    expire: "Tue Nov 12 2024 15:59:51 GMT+0800 (Central Indonesia Time)3600",
};

// const encryptedData = encryptData(data);
// console.log("Encrypted Data:", encryptedData);

const Testing = async () => {
    const token = await encryptData(data);


    return ( 
        <div className="">{token}</div>
     );
}
 
export default Testing;