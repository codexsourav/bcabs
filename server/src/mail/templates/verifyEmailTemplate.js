import { hostUrl } from "../../keys"

// @ts-check 
export const verifyEmailT = (token) => {
    return /*html*/`

    <div style="margin: 0;padding: 0;box-sizing: border-box;font-family: Arial, sans-serif;background-color: #f5f5f5;">
        <div class="container" style="margin: 0 auto;padding: 20px;box-sizing: border-box; gap: 20px;background-color: #fff;">
            <h1 style="margin: 0;padding: 0;box-sizing: border-box;">Welcome to babagcabs!</h1>
            <br />
            <p style="margin: 0;padding: 0;box-sizing: border-box;">Thank you for signing up. To complete your registration,
                please verify your email address:</p>
            <br />

            <div class="" style="margin: 0;padding: 0;box-sizing: border-box;">
                <a class="button" href="${hostUrl}/verify/${token}" style="margin: 10px 0px;padding: 10px 20px;box-sizing: border-box;display: inline-block;border-radius: 5px;background-color: #ea580c;color: white;text-decoration: none;transition: background-color 0.3s ease;">Verify
                    Email Address</a>
            </div>
            <br />

            <p style="margin: 0;padding: 0;box-sizing: border-box;">If you have any questions or concerns, please don't
                hesitate to contact us at <a href="mailto:support@babagcabs.com" style="margin: 0;padding: 0;box-sizing: border-box;">support@babagcabs.com</a>.</p>
            <p style="margin: 0;padding: 0;box-sizing: border-box;">Thanks, and we look forward to seeing you on the road!
            </p>
        </div>
    </div>

    `
}