import { ARAddTextOptions } from "../../ar-common";
import { ARMaterial } from "./armaterial";
import { ARCommonNode } from "./arcommon";

export class ARText extends ARCommonNode {
  static create(options: ARAddTextOptions) {
    const text = SCNText.textWithStringExtrusionDepth(options.text, options.depth || 0.0);

    if (options.material) {
      const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(1);
      materialArray.addObject(ARMaterial.getMaterial(options.material));
      text.materials = materialArray;
    }

    return new ARText(options, SCNNode.nodeWithGeometry(text));
  }
}
