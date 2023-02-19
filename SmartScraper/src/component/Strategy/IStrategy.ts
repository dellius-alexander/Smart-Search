
/**
 * Defines the strategy used to complete the clients request.
 * This class represents the root of the IDefaultStrategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
export interface IStrategy<T>  {
    /*
     * Saves the state of the strategy selected.
     */
    state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy<T>|T};

    /**
     * Converts the state of the strategy to a JSON object.
     * @return {JSON}
     */
    toJSON(data?: never): JSON;

}
