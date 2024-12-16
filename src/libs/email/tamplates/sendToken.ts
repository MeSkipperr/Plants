type EmailTamplate = {
    sendMethod : string;
    verifyCode : number;
    token?:string;
    nextPage?:string;
}

export function getEmailTemplate({ sendMethod = "", verifyCode ,token,nextPage} : EmailTamplate) {
    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid #e0e0e0;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 20px;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                font-size: 16px;
                border-radius: 5px;
                margin-top: 20px;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #45a049;
            }
            .footer {
                padding: 15px;
                font-size: 12px;
                color: #999;
                text-align: center;
                background-color: #f1f1f1;
            }
        </style>
    `;

    if (sendMethod === 'number') {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Secret Code</title>
                ${styles}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        Your Secret Code
                    </div>
                    <div class="content">
                        <p>Your secret code is:</p>
                        <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${verifyCode}</p>
                    </div>
                    <div class="footer">
                        <p>If you didn’t request this, please ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    } else if (sendMethod === 'link' && token && token.trim() !==  ""&& nextPage && nextPage.trim() !== "") {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                ${styles}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        Reset Your Password
                    </div>
                    <div class="content">
                        <p>Click the button below to reset your password:</p>
                        <a href="http://localhost:3000${nextPage}?guess=${verifyCode}&token=${token}" class="button">Reset Password</a>
                    </div>
                    <div class="footer">
                        <p>If you didn’t request this, please ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }
    return false;
}

