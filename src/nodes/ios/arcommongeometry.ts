import { ARAddGeometryOptions, ARMaterial, Color } from "../../ar-common";
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

	public setMaterials(materials: Array<string | Color | ARMaterial>) {
		const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(materials.length);
		materials.map(material => materialArray.addObject(ARMaterialFactory.getMaterial(material)));
		this.ios.geometry.materials = materialArray;
	}

}
