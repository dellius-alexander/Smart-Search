// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ExecuteStrategy} from "../ExecuteStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Yolo} from "./ObjectDetection/Yolo.ts";

export class SingletonYoloStrategy<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static instance: ExecuteStrategy<T> = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static getInstance(): ExecuteStrategy<T> {
    if (!SingletonYoloStrategy.instance) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      SingletonYoloStrategy.instance = new ExecuteStrategy<Yolo>(new Yolo());
    }
    return SingletonYoloStrategy.instance;
  }
}
