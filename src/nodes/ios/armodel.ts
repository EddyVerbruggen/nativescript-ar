import { ARAddModelOptions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARModel extends ARCommonGeometryNode {
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
