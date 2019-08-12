import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARModel extends ARCommonNode {
  static create(options: ARAddModelOptions) {
    let modelScene = SCNScene.sceneNamed(options.name);

    let nodeModel: SCNNode;
    if (options.childNodeName) {
      nodeModel = modelScene.rootNode.childNodeWithNameRecursively(options.childNodeName, true);
    } else if (modelScene.rootNode.childNodes.count === 1) {
      nodeModel = modelScene.rootNode.childNodes.objectAtIndex(0);
    } else {
      nodeModel = modelScene.rootNode;
    }

    return new ARModel(options, nodeModel.clone());
  }
}
