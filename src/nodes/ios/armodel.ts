import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARModel extends ARCommonNode {
  // note that these babies can be cloned, look for 'clone' at http://jamesonquave.com/blog/arkit-tutorial-in-swift-4-for-xcode-9-using-scenekit/
  static create(options: ARAddModelOptions) {
    let modelScene = SCNScene.sceneNamed(options.name);
    let nodeModel = options.childNodeName ? modelScene.rootNode.childNodeWithNameRecursively(options.childNodeName, true) : modelScene.rootNode;
    return new ARModel(options, nodeModel);
  }
}
