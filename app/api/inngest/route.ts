import { serve } from "inngest/next"
import {inngest} from "@/lib/inngest/client";
import {sendSignUpEmail, sendDailyNewsSummary} from "@/lib/inngest/functions";

/* What this file does: we are essentially exposing our Inngest functions via a NextJS API route (makes our functions callable withion out app)
*
* We need to create Background functions/jobs
*
*  */
export const {GET, POST,PUT} = serve({
    client: inngest,
    functions: [sendSignUpEmail, sendDailyNewsSummary],
})
