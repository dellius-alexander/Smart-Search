
export interface ITextCompletion extends JSON, TextDecoder{
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        text: string;
        index: number;
        logprobs: never;
        finish_reason: string;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [never];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    }

    toJSON(): ThisType<TextCompletion>
    toString(): ThisType<TextCompletion>

}

export abstract class TextCompletion implements ITextCompletion {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    abstract "[unknown]";
    readonly abstract [Symbol.toStringTag]: string;
    abstract choices: { text: string; index: number; logprobs: never; finish_reason: string };
    abstract created: number;
    readonly abstract encoding: string;
    readonly abstract fatal: boolean;
    abstract id: string;
    readonly abstract ignoreBOM: boolean;
    abstract model: string;
    abstract object: string;
    abstract usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };

    abstract decode(input?: BufferSource, options?: TextDecodeOptions): string;

    abstract parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;

    abstract stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    abstract stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;

    abstract toJSON(): ThisType<TextCompletion>;
}
