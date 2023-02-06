import {StreamStrategy} from "../../StreamStrategy";

class Yolo implements StreamStrategy {
  state: {
        id: string,
        name: string,
        version: string,
        description: string,
    };
  constructor() {
    this.state = {
      id: "",
      name: "yolo",
      version: "v3.0",
      description: "Yolo  apply a single neural network to the full image. " +
          "This network divides the image into regions and predicts bounding boxes " +
          "and probabilities for each region. These bounding boxes are weighted by " +
          "the predicted probabilities. See: https://pjreddie.com/media/files/papers/YOLOv3.pdf",
    };
  }


  /**
 * Send a request to Gpt3 API endpoints
 * @param {{prompt: string, layman: false}} options
 * @param {{element: Element}} streamOptions??
 * @returns  {{Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>}} JSX element(s), empty array, or string.
 */
  streamRequest(options: { prompt: string; layman: false }, streamOptions?: { element: Element }): Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void> {
    return new Promise<string|JSON>((resolve, reject) => {
      if (reject){
        throw new Error("Rejected");
        return;
      } else {
        return resolve("");
      }
    });
  }

}

export {Yolo};