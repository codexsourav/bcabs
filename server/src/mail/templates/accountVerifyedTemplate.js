import { hostUrl } from "../../keys"

export const accountVerifyEmailT = () => {
    return /*html */`


    <div style="margin: 0;padding: 0;box-sizing: border-box;font-family: Arial, sans-serif;background-color: #f5f5f5;">
        <div class="container" style="margin: 0 auto;padding: 20px;box-sizing: border-box;background: #fff;">
            <div class="header" style="margin: 0;padding: 0;box-sizing: border-box;text-align: center;margin-bottom: 20px;">
                <h1 style="margin: 0;padding: 0;box-sizing: border-box;font-size: 36px;color: #ea580c;margin-bottom: 10px;">
                    Account Verified</h1>
                <p style="margin: 0;padding: 0;box-sizing: border-box;font-size: 18px;color: #666;">Your account with
                    babagcabs has been successfully verified.</p>
            </div>
            <div class="content" style="margin: 0;padding: 0;box-sizing: border-box;margin-bottom: 20px;">
                <p
                    style="margin: 0;padding: 0;box-sizing: border-box;font-size: 18px;line-height: 1.5;color: #333;margin-bottom: 20px;">
                    Thank you for verifying your account. You can now log in to your account and start using babagcabs
                    services. If you have any questions or concerns, please don't hesitate to contact us at <a
                        href="mailto:support@babagcabs.com"
                        style="margin: 0;padding: 0;box-sizing: border-box;">support@babagcabs.com</a>.</p>
                <a class="button" href="${hostUrl}/login"
                    style="margin: 10px 0px;padding: 10px 20px;box-sizing: border-box;display: inline-block;border-radius: 5px;background-color: #ea580c;color: white;text-decoration: none;transition: background-color 0.3s ease;">Log
                    In</a>
            </div>
        </div>
    </div>
`

}
