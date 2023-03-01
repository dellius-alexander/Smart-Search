

export abstract class TextCompletionResponse extends Response {

  "[unknown]": unknown;
  [Symbol.toStringTag]: string;
  choices: { text: string; index: number; logprobs: never; finish_reason: string; };
  created: number;
  id: string;
  model: string;
  object: string;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };

}
