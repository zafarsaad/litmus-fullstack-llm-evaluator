import { askChat } from "@/app/util/openAi";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        if (!query) {
            console.log(`Error beta-zeta, no query passed to /openAI/GET`);
            return NextResponse.json({ error: "Query required. Not found in URL" }, { status: 400 })
        };

        const response = await askChat({ alpha: "This was an okay response around 70%", beta: "This was a bad response around 40%", gamma: "This was a perfect response." })
        console.log("I guess it worked?");
        console.log(response);

    } catch (error: unknown) {
        console.error('Error in OpenAPI Call:');
        const errorMessage = error instanceof Error ? error.message : "Unknown error type/message";

        return NextResponse.json(
            { error: "Internal Server Error: " + errorMessage },
            { status: 500 }
        )
    }
}