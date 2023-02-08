// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IStrategy } from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { uuid } from "../../UUID.ts";

class Yolo implements IStrategy {
  state: {
    uuid: string,
    name: string,
    type: string,
    model: string,
    version: string,
    description: string,
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
      protocols: {
        "stream-strategy": true
      },
      url: ""
    };
  }


}

export {Yolo};