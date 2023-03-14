// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pipeline} from "./Pipeline.ts";

export class SingletonPipeline<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static instance: Pipeline<T> = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static getInstance(): Pipeline<T> {
    if (!SingletonPipeline.instance) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      SingletonPipeline.instance = new Pipeline<T>();
    }

    return SingletonPipeline.instance;
  }
}
