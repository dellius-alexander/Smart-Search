// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IStrategy } from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { uuid } from "../../UUID.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output} from "../../Pipeline/IHandler.ts";

/**
 * The `Yolo` class implements the `IStrategy` interface, and contains a
 * state containing a unique identifier, information about the type, model
 * and version, and a description about what it does, as well as the
 * protocol for stream-strategy.
 *
 * The `state` contains a `uuid` string to identify the instance, `name`
 * and `type` as a single neural network detection model, `model` as
 * "YOLOv3", `version` as "v3.0", `description` which provides a description
 * of the object detection model, `protocols` which defines a stream-strategy
 * protocol, and`url` which is set to an empty value.
 *
 * In the constructor, all the values of the `state` are set. The description
 * explains how the image is divided into regions, how the predicted bounding
 * boxes are weighted by the predicted probabilities, and provides a link to a
 * paper explaining the YOLOv3 model further.
 */
class Yolo implements IStrategy {
  /**
   * Saves the state of the strategy selected.
   */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy};
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
      protocols: {
        "stream-strategy": true
      },
      url: ""
    };
    // console.dir(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetch(prompt: string, element: HTMLElement, strategy: IStrategy):  Promise<Output<HTMLElement> | void> {
    console.dir({
      prompt: prompt,
      element: element,
      strategy: strategy
    });
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  async transformStreamToJSON(strategy: IStrategy): Promise<TransformStream>{
    console.dir({
      strategy: strategy
    });
    return null;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line class-methods-use-this
  toStringJson(data: string|object|Uint8Array)  {
    console.dir({
      data: data
    });
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  writeResponseStream(): null { return null;}

}

export {Yolo};