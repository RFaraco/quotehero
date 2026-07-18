import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
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

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    return NextResponse.json({
      result: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate proposal." },
      { status: 500 }
    );
  }
}