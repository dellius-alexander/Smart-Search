
/**
 * Defines the strategy used to complete the clients request.
 * This class represents the root of the Strategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
interface Strategy {
  /**
   * The sendRequest function will fulfill the client request and return a response from the selected API.
   * @param {{ prompt: null, layman: false }} options
   * @return {{Promise<string | void | JSX.Element | JSX.Element[]>}}
   */
  sendRequest(options: { prompt: null, layman: false }): Promise<string | void | JSX.Element | JSX.Element[]>;
}
export { Strategy };
