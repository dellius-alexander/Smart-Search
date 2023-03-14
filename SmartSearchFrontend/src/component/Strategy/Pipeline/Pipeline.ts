// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IHandler, Input, Output} from "./IHandler.ts";


/**
 * A generic pipeline for processing requests
 * @template T the type of the input and output of the pipeline
 */
export  class Pipeline<T> {
  readonly state: {
    handlers: IHandler<T>[]
    [key: string]: T|IHandler<T>|IHandler<T>[]|Output<T>[]|[{ index: number; model: string; data: Output<T>; }],
    results: [{ index: number; model: string; data: Output<T>; }]
  };

  // List of handlers in the pipeline
  private handlers: IHandler<T>[] = [];

  protected constructor() {
    console.log("Initializing pipeline.......");

    this.state = {
      handlers: this.handlers,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      results: []
    };
  }

  /**
   * Add handlers to the pipeline
   * @param {IHandler<T>[]} handlers the handlers to add
   */
  async addHandler(...handlers: IHandler<T>[]): Promise<void> {
    /*
   * Add below to ensure that the order of the handlers is maintained
   * and no duplicate handlers are injected into the pipeline.
   */
    for await(const newHandler of handlers)
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const handlerExists = this.handlers.some((existingHandler) => existingHandler.state.handler.state.name === newHandler.state.handler.state.name);
      if (!handlerExists)
      {
        
        console.log(
          "",
          handlerExists ?  
            "Something went wrong. The handler was not found." :
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            `Adding new Handler: ${newHandler.state.handler.state.uuid}` 
        );
        this.handlers.push(newHandler);
      }
    }
    this.state.handlers = this.handlers;
  }
  
  /**
   * Execute the pipeline handler with the input object
   * @param {Input<T>} input the data to process
   * @return {Output<T>} the output of the pipeline
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  execute(input: Input<T>): Promise<[Output<T>]> {
    let index = 0;
    console.log(input);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const results: [Output<T>] = [];
    return new Promise<[Output<T>]>((resolve, reject) => {
      try {
        for (const handler of this.handlers) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          console.dir(handler.state.handler.state.uuid);
          const result = handler.handle(input);
          if (result) {
            console.dir(result);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const chunk = Object.assign({}, { index: index++, model: `${handler.state.handler.state.uuid}`.toString(), data: result });
            console.dir(chunk);
            results.push(result);
            // save the most recent results
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this.state.results.push(chunk);
            // console.dir(handler);
            // console.dir(result);
          }

        }
        console.dir(results);
        // Use the default handler if no other handlers were chosen
        // return this.handlers.length > 0 ? results : defaultHandler.handle(input);
        resolve(results);
      } catch (e) {
        console.error(e.message);
        e.stackTrace;
        reject(e);
      }
    });

  }
}
