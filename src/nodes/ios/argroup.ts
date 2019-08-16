import { ARAddTextOptions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARGroup extends ARCommonNode {
  static create(options: ARAddOptions) {
    return new ARGroup(options, SCNNode.node());
  }
}
