import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';

const ROLE_SYSTEM='system'
class PromptService {
    __openAI: OpenAI
    __model: string
    constructor() {
        this.__openAI = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });
        this.__model = process.env['MODEL'] || 'chat-4';
    }

    public async complete_prompt_system(content: string) : Promise<ChatCompletion> {
        const chatCompletion: ChatCompletion = await this.__openAI.chat.completions.create({
            messages: [{ role: ROLE_SYSTEM, content: content }],
            model: this.__model,
        });
        return chatCompletion
    }
}

export default PromptService;