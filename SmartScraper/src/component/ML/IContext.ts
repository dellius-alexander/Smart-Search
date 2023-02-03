import {Strategy} from "./AIModels/Strategy";

interface IContext {

  setStrategy(strategy: Strategy)

  executeStrategy(options: { prompt: null; layman: false }): JSON

}

export {IContext};