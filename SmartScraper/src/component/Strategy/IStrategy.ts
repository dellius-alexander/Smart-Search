
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
    toJSON(): JSON;
}
export { IStrategy };