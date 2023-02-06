
/**
 * Defines the strategy used to complete the clients request.
 * This class represents the root of the Strategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
interface IStrategy  {
    state: {
        id: string,
        name: string,
        version: string,
        description: string,
    }

    /**
     * Converts the state of the strategy to a JSON object.
     * @return {JSON}
     */
    toJSON(): JSON;
}
export { IStrategy };