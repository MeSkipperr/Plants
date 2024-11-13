import Email from 'next-auth/providers/email';
import { useState, useEffect } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Set sesuai breakpoint mobile
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;

const data = {
    user:{
        userEmail : "",
        userToken : 61217870
    }, expire : "Tue Nov 12 2024 15:59:51 GMT+0800 (Central Indonesia Time)3600"
}