import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:11434/v1",
  apiKey: "ollama", // required but unused
});

export default openai;
