
/**
 * The parent/root of the ML hierarchy.
 */
interface AIFactory {
  sendRequest(options: { prompt: null, layman: false }): Promise<string | void | JSX.Element | JSX.Element[]>;
}
export { AIFactory };
