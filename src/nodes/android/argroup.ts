import { ARAddOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARGroup extends ARCommonNode {

  static create(options: ARAddOptions, fragment): Promise<ARGroup> {
    return new Promise<ARGroup>(async (resolve, reject) => {
      const node = new com.google.ar.sceneform.ux.TransformableNode(fragment.getTransformationSystem());
      node.select(); // optional; this can be removed
      resolve(new ARGroup(options, node));
    });
  }
}