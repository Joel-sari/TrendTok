import { Inngest } from "inngest";
export const inngest = new Inngest({
    id: 'trendtok',
    ai: { gemini: { apiKey: process.env.GEMINI_APP_KEY! } }
})