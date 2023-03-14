export type Input<T> = T;
export type Output<T> = Promise<T|{ index: T; model: T; data: T}| HTMLElement>;

export interface IHandler<T> {
    readonly state: { [key: string]: T|IHandler<T>|Output<T>};

    /**
     * Handles execution of a strategy
     * @param {Input<T>} input
     */
    handle(input: Input<T>):  Output<T>;
}
