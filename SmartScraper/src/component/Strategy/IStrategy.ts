
/**
 * Defines the strategy used to complete the clients request.
 * This class represents the root of the Strategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
export interface IStrategy  {
    state: {
        uuid: string,
        name: string,
        type: string,
        model: string,
        version: string,
        description: string,
        protocols: { [key: string]: string|boolean|RegExp},
        prompt: string,
        layman: boolean,
        url: string
    }

    /**
     * Converts the state of the strategy to a JSON object.
     * @return {JSON}
     */
    toJSON(): JSON;
}
