import { Color } from "tns-core-modules/color";
import { ARAddGeometryOptions, ARMaterial } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARMaterialFactory } from "./armaterialfactory";

export abstract class ARCommonGeometryNode extends ARCommonNode {

  constructor(options: ARAddGeometryOptions, node: com.google.ar.sceneform.Node) {
    super(options, node);

    if (options.materials) {
      let material = options.materials[0];
      ARMaterialFactory.applyMaterial(node, <ARMaterial>material);
    }
  }

  public setMaterials(materials: Array<string | Color | ARMaterial>): void {
    ARMaterialFactory.applyMaterial(this.android, (<ARMaterial>materials[0])).catch((e) => console.log(e));
  }
}