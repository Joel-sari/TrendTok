import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

export const sendSignUpEmail = inngest.createFunction(


    { id: 'sign-up-email'},

    // when it will get triggered
    { event: 'app/user.created'},

    //the actual function we want to run
    async({ event, step }) => {
            //We are extracing all the values we get from the form, we will use this to create a prompt
            //using gemini
        const userProfile = `
        - Country: ${event.data.country}
        - Investment goals: ${event.data.investmentGoals}
        - Risk Tolerance: ${event.data.riskTolerance}
        - Preferred industry: ${event.data.preferredIndustry}
        `
        // using the prompt.ts file and userProfile infor, we will create a very personalized email that can be sent
        //to our user. That is what we are doing below
        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
                model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite'}),
                body: {
                        contents: [{
                                role: 'user',
                                parts: [
                                        {text: prompt}
                                ]
                        }]

            }
        })
        // after getting the response with the personalized email, we want to send the email
        await step.run('send-welcome-email', async () => {
                const part = response.candidates?.[0]?.content?.parts?.[0];
                const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining TrendTok, you now have access to information that will grow your money.';

                const { data: {email, name} } = event;


                // EMAIL SENDING LOGIC
                return await sendWelcomeEmail({ email, name, intro: introText });
        })


        return{
                success: true,
                message: 'Welcome email sent successfully.'

            }


    }
)