import { groq } from "@ai-sdk/groq";

export const model = groq("llama-3.3-70b-versatile");

export const TOKEN_LIMIT = 6_000; // service tier `on_demand` on tokens per minute (TPM): Limit 6000
