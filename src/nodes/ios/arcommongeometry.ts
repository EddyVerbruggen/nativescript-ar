import { ARAddGeometryOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARMaterialFactory } from "./armaterialfactory";

export abstract class ARCommonGeometryNode extends ARCommonNode {
  constructor(options: ARAddGeometryOptions, node: SCNNode) {
    super(options, node);

    if (options.materials) {
      const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(options.materials.length);
      options.materials.map(material => materialArray.addObject(ARMaterialFactory.getMaterial(material)));
      node.geometry.materials = materialArray;
    }
  }
}
