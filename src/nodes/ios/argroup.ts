import { ARAddOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARGroup extends ARCommonNode {
  static create(options: ARAddOptions) {
    return new ARGroup(options, SCNNode.node());
  }
}