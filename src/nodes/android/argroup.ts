import { ARAddOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARGroup extends ARCommonNode {

  static create(options: ARAddOptions, fragment): Promise<ARGroup> {
    return new Promise<ARGroup>(async (resolve, reject) => {
      const node = ARCommonNode.createNode(options, fragment);
      resolve(new ARGroup(options, node));
    });
  }
}