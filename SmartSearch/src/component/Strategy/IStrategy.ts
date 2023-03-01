
/**
 * Defines the strategy used to complete the clients request.
 * This class represents the root of the IDefaultStrategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
export interface IStrategy<T>  {
    /*
     * All object that implements this interface must maintain a state object
     * for all relevant functionality, transport protocols and more for the
     * strategy being implemented.
     */
    state: { [key: string]: T};

}
