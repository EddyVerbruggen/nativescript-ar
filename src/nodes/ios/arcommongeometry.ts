import { Color } from "tns-core-modules/color";
import { ARAddGeometryOptions, ARMaterial } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARMaterialFactory } from "./armaterialfactory";

export abstract class ARCommonGeometryNode extends ARCommonNode {
  constructor(options: ARAddGeometryOptions, node: SCNNode, renderer?: SCNSceneRenderer) {
    super(options, node, renderer);

    if (options.materials) {
      ARCommonGeometryNode.applyMaterial(node, options.materials);
    }
  }

  protected static applyMaterial(node: SCNNode, materials: Array<string | Color | ARMaterial>): void {
    const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(materials.length);
    materials.map(material => materialArray.addObject(ARMaterialFactory.getMaterial(material)));
    node.geometry.materials = materialArray;
  }

  public setMaterials(materials: Array<string | Color | ARMaterial>) {
    ARCommonGeometryNode.applyMaterial(this.ios, materials);
  }

}
