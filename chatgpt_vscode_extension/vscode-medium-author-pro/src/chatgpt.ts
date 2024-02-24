import axios, {AxiosResponse} from 'axios';

import * as ApiKey from './api-key';

export type ChatGptMessage = {
  role: string; // user or assistant
  content: string;
};

export type ChatGptChoice = {
  index: number;
  message: ChatGptMessage;
  finish_reason: string;
};

export type ChatGptUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type ChatGptResponse = {
  id: string;
  object: string;
  created: number; // timestamp
  choices: Array<ChatGptChoice>;
  usage: ChatGptUsage;
};

export type ChatGptCompletionPostData = {
  model: string;
  max_tokens?: number;
  messages: Array<ChatGptMessage>;
};

const OPENAPI_API_URL = 'https://api.openai.com/v1/chat/completions';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ApiKey.CHATGPT_API_KEY}`,
};

const MAX_TOKENS = 350;

let __inst: GptGetter | null = null;
export class GptGetter {
  // List of previous messages
  previousMessagesArray: Array<ChatGptMessage> = [];

  constructor() {
    this.resetHistory();
  }
  static getInst(): GptGetter {
    if (__inst === null) {
      __inst = new GptGetter();
      return __inst;
    } else {
      return __inst;
    }
  }

  resetHistory() {
    this.previousMessagesArray = [
      {
        role: 'user',
        content:
          'For the following conversation, please refer to yourself as a friendly Polestar 2 robot instead of an AI language model. Polestar 2 is a car, and you are concerned for the safety of the user.',
      },
      {role: 'assistant', content: 'OK'},
    ];
  }

  getGptCompletion = async (prompt: string): Promise<string> => {
    const newMessage: ChatGptMessage = {
      role: 'user',
      content: prompt,
    };

    this.previousMessagesArray.push(newMessage);
    console.log(
      'previousMessagesArray1::',
      JSON.stringify(this.previousMessagesArray),
    );

    const data: ChatGptCompletionPostData = {
      model: 'gpt-3.5-turbo',
      max_tokens: MAX_TOKENS,
      messages: [...this.previousMessagesArray],
    };

    try {
      console.log('Asking assistant:', JSON.stringify(data, null, 2));
      const response: AxiosResponse = await axios.post(OPENAPI_API_URL, data, {
        headers: HEADERS,
      });
      const gptRsp: ChatGptResponse = response.data;
      //console.log('AxiosResponse:\n', JSON.stringify(response, null, 2));
      if (gptRsp.choices.length > 0) {
        const newResponse: ChatGptMessage = {
          role: 'assistant',
          content: gptRsp.choices[0].message.content,
        };

        this.previousMessagesArray.push(newResponse);
        console.log(
          'previousMessagesArray2::',
          JSON.stringify(this.previousMessagesArray),
        );

        return gptRsp.choices[0].message.content;
      }
      return 'ok';
    } catch (error: any) {
      console.error('Error calling GPT API:', error.message);
      throw error;
    }
  };
}

export async function getGptCompletion(prompt: string): Promise<string> {
  //const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

  return new GptGetter().getGptCompletion(prompt);
}
