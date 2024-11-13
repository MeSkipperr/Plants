import React from 'react';

const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    handleFunction: () => Promise<void> | void,
    triggerKey: string = 'Enter'
) => {
    if (event.key === triggerKey) {
        await handleFunction();
    }
};

export default handleKeyPress;
