// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IHandler} from "./Pipeline.ts";

export interface IHandlerStrategy<T> extends IHandler<T>, IStrategy<T> {}