import { ChatCompletion, ChatCompletionMessage } from "openai/resources";
import PromptService from "./prompt/prompt_service";

interface LeetCodeQuestion {
    challenge: string;
    entry_function: string;
    test_cases: any[]; // Define more specific type if possible
    solution: string;
}

class GenerateProblem {
    __promptService: PromptService;
    constructor(promptService: PromptService) {
        this.__promptService = promptService;
    }

    async generateLeetcodeQuestion(difficulty: string, dataStructures: string[], dataAlgorithms: string[], programmingLanguage: string): Promise<string> {
        const dataStructuresStr = dataStructures.join(", ");
        const dataAlgorithmsStr = dataAlgorithms.join(", ");
        const jsonSchema: LeetCodeQuestion = {
          challenge: "",
          entry_function: "",
          test_cases: [],
          solution: ""
        };
        const jsonSchemaStr = JSON.stringify(jsonSchema, null, 2);
        const prompt = `As an intelligent Leetcode Builder API, given the following criteria:
      - Difficulty: ${difficulty}
      - Data Structures: ${dataStructuresStr}
      - Data Algorithms: ${dataAlgorithmsStr}
      - Programming Language: ${programmingLanguage}
      
      Create a leetcode question, make it a random scenario where the solution should involve the data structure for the best solution.
      
      The response as follows:
      1: "challenge": "text with the Leetcode challenge, give test cases and example result of test case and explain why"
      2: "entry_function": "example in Python, e.g., def solve(arr: list) -> int: return -1"
      3: "test_cases": "JSON format with input values and output values"
      4: "solution": "one way to solve the challenge"
      
      Your task is to generate a response that conforms to the following JSON schema:
      ${jsonSchemaStr}
      
      Please fill in the schema with appropriate values based on the criteria. Ensure the response strictly adheres to the given schema format.`;
        
        const chatCompletion : ChatCompletion = await this.__promptService.complete_prompt_system(prompt); 
      
        //Choose first index
        const chatCompletionMessage : ChatCompletionMessage = chatCompletion.choices[0].message

        if (chatCompletionMessage.content == null) {
          throw new Error("Content message is empty")
        }

        return chatCompletionMessage.content;
      }      
}

export default GenerateProblem