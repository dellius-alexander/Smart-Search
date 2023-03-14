// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IHandler, Input, Output} from "./IHandler.ts";

/**
 * A generic pipeline handler
 * @template T the type of the input and output of the pipeline
 */
export class PipelineHandler<T> implements IHandler<T> {
  readonly state: { [key: string]: T|IHandler<T>|Output<T>};
  private readonly handler: IHandler<T>;

  /**
     * Creates a new PipelineHandler
     * @param handler the handler function to use
     *
     */
  constructor(handler: IHandler<T>) {
    console.log(handler);
    this.handler = handler;
    this.state = {
      handler: this.handler
    };
  }

  /**
     * Handles the given data
     * @param {Input<T>} input? the data to process
     * @return {Output<T>} the output of the pipeline
     */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handle(input: Input<T>):  Output<T> {
    try {
      console.log(input);
      const result = this.handler.handle(input);
      return this.state.result = result;
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }

  }
}
