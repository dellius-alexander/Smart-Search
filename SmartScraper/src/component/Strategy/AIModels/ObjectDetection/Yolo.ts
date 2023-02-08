// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StreamStrategy} from "../../StreamStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";

class Yolo implements StreamStrategy {
  state: {
    uuid: string,
    name: string,
    type: string,
    model: string,
    version: string,
    description: string,
    prompt: string,
    layman: boolean,
    protocols: { [key: string]: string|boolean|RegExp},
    url: string
    };
  constructor() {
    this.state = {
      uuid: uuid("yolo","single_neural_network_object_detection_model"),
      name: "yolo",
      type: "single_neural_network_object_detection_model",
      model: "YOLOv3",
      version: "v3.0",
      description: "Yolo  apply a single neural network to the full image. " +
          "This network divides the image into regions and predicts bounding boxes " +
          "and probabilities for each region. These bounding boxes are weighted by " +
          "the predicted probabilities. See: https://pjreddie.com/media/files/papers/YOLOv3.pdf",
      prompt: "",
      layman: false,
      protocols: {
        ["stream-strategy"]: true
      },
      url: ""
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
      console.log(options);
      console.log(streamOptions);
      if (reject){
        throw new Error("Rejected");
        return this.state;
      } else {
        return resolve("");
      }
    });
  }

}

export {Yolo};