// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ExecuteStrategy} from "../ExecuteStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Gpt3} from "./Language/Gpt3.ts";

export class SingletonGptStrategy<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static instance: ExecuteStrategy<T> = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static getInstance(): ExecuteStrategy<T> {
    if (!SingletonGptStrategy.instance) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      SingletonGptStrategy.instance = new ExecuteStrategy<Gpt3>(new Gpt3());
    }
    return SingletonGptStrategy.instance;
  }
}
