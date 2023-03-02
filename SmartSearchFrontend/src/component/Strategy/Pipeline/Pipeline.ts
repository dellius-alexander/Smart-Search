
export type Input<T> = T;
export type Output<T> = Promise<T|void>;

export interface IHandler<T> {

  /**
   * Handles execution of a strategy
   * @param {Input<T>} input
   */
  handle(input: Input<T>):  Output<T>;
}

/**
 * A generic pipeline for processing requests
 * @template T the type of the input and output of the pipeline
 */
export  class Pipeline<T> {
  // List of handlers in the pipeline
  private handlers: IHandler<T>[] = [];
  // protected constructor() {console.log("Initializing pipeline.......");}

  /**
   * Add handlers to the pipeline
   * @param {IHandler<T>[]} handlers the handlers to add
   */
  async addHandler(...handlers: IHandler<T>[]): Promise<void> {
    for await(const handler of handlers)
    {
    /*
     * Add below to ensure that the order of the handlers is maintained
     * and no duplicate handlers are injected into the pipeline.
     */
      const handlerExists = this.handlers.some((x) => x === handler);
      console.log("Handler found: ", handlerExists);
      if (!handlerExists)
      {
        console.log(handler);
        this.handlers.push(handler);
      }
    }
  }


  /**
   * Execute the pipeline handler with the input object
   * @param {Input<T>} input the data to process
   * @return {Output<T>} the output of the pipeline
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  execute(input: Input<T>): Output<T> {

    console.log(input);
    let results:  Output<T>;
    // Execute the pipeline
    this.handlers.forEach((handler) => {
      console.dir(handler);
      results = handler.handle(input);
    });
    console.dir(results);
    // Use the default handler if no other handlers were chosen
    // return this.handlers.length > 0 ? results : defaultHandler.handle(input);
    return results;
  }
}

/**
 * A generic pipeline handler
 * @template T the type of the input and output of the pipeline
 */
export class PipelineHandler<T> implements IHandler<T> {
  private readonly handler: IHandler<T>;

  /**
     * Creates a new PipelineHandler
     * @param handler the handler function to use
     *
     */
  constructor(handler: IHandler<T>) {
    console.log(handler);
    this.handler = handler;
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
      return this.handler.handle(input);
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }

  }
}

export class SingletonPipeline<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static instance: Pipeline<T>;

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
