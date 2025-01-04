import { ChatOpenAI } from "@langchain/openai";
// import { z } from "zod"

const model = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0
});

// const gradeSchema = z.object({
//     alpha: z.string().describe("Grade for Alpha (out of 100)"),
//     beta: z.string().describe("Grade for Beta (out of 100)"),
//     gamma: z.string().describe("Grade for Gamma (out of 100)"),
// });



export const askChat = async (data: { alpha: string, beta: string, gamma: string }) => {

    try {

        const prompt = `I have the following responses:
        Alpha: ${data.alpha},
        Beta: ${data.beta},
        Gamma: ${data.gamma},

        Return only the grade (a number out of 100) for each of them as a JSON object with the format:
        {"alpha": <grade>, "beta": <grade>, "gamma": <grade>},
        Don't include any explanation or extra text.
        `

        const result = await model.invoke(prompt);
        // const content = result.content;

        // const paresedResult = gradeSchema.parse(JSON.parse(content));
        // return paresedResult;
        console.log("Success " + result)
        return result;
    } catch (error) {
        console.error("Error in processing grades: ", error);
        throw new Error("Failed to process grades from OpenAI response.")
    }
}