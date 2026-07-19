import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

  try {
    const body = await req.json();

    const { customerRequest, trade, pricingType, fixedPrice, hourlyRate, estimatedHours } = body;

    const prompt = `
You are an expert contractor.

Create a professional proposal based on the information below.

Trade:
${trade}

Customer Request:
${customerRequest}

Pricing:
${pricingType === "fixed"
  ? `Fixed Price: $${fixedPrice}`
  : `Hourly Rate: $${hourlyRate} | Estimated Hours: ${estimatedHours}`}

Return ONLY valid JSON in this format:

{
  "projectSummary": "...",
  "scope": [
    "...",
    "...",
    "..."
  ],
  "timeline": "..."
}
`;

    console.log("OPENAI KEY EXISTS:", !!process.env.OPENAI_API_KEY);
    console.log("OPENAI KEY PREFIX:", process.env.OPENAI_API_KEY?.substring(0, 10));
    console.log("OPENAI KEY LENGTH:", process.env.OPENAI_API_KEY?.length);

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
      
    });

    return NextResponse.json({
      result: response.output_text,
    });

    } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json(
        {
        
        message: error?.message,
        code: error?.code,
        type: error?.type,
        },
        { status: 500 }
    );
    }
}