// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ExecuteStrategy} from "../ExecuteStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Wolframalpha} from "./Computational/Wolframalpha.ts";

export class SingletonAlphaStrategy<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static instance: ExecuteStrategy<T> = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static getInstance(): ExecuteStrategy<T> {
    if(!SingletonAlphaStrategy.instance){
      SingletonAlphaStrategy.instance = new ExecuteStrategy<Wolframalpha>(new Wolframalpha());
    }
    return SingletonAlphaStrategy.instance;
  }
}