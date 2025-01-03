import { queryGroqAlpha, queryGroqBeta, queryGroqGamma } from "@/app/util/ai";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        if (!query) {
            console.log(`Error alpha-hector, no query found`);
            return NextResponse.json({ error: "Query is required! Not found in URL" }, { status: 400 })

        };

        // const groqResponse = await queryGroqAlpha(query); // before handling just one call
        // return NextResponse.json({ message: groqResponse });

        // Execute all three queries in parallel and handle errors
        const responses = await Promise.allSettled([
            queryGroqAlpha(query),
            queryGroqBeta(query),
            queryGroqGamma(query),
        ]);

        // Build the compound response, assuming each function's response is a string
        const result = {
            alpha: responses[0].status === "fulfilled"
                ? { response: responses[0].value }
                : { error: "Alpha LLM failed" },
            beta: responses[1].status === "fulfilled"
                ? { response: responses[1].value }
                : { error: "Beta LLM failed" },
            gamma: responses[2].status === "fulfilled"
                ? { response: responses[2].value }
                : { error: "Gamma LLM failed" },
        };

        return NextResponse.json(result);


    } catch (error: unknown) {

        console.error("Error in Groq API Call:");
        const errorMessage = error instanceof Error ? error.message : "Unkown error"

        return NextResponse.json(
            { error: "Internal Server Error: " + errorMessage },
            { status: 500 }
        )
    }
}




/* export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    if (!query) {
        return new Response("Query is required", { status: 400 });
    }

    try {
        const groqResponse = await queryGroq(String(query));  // Call the utility function
        return new Response(JSON.stringify({ message: groqResponse }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response("Error in Groq API call: " + error, { status: 500 });
    }
} */