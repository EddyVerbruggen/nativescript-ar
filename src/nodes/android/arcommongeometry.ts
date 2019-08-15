import { Color } from "tns-core-modules/color";
import * as utils from "tns-core-modules/utils/utils";
import { ARAddGeometryOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

declare const java: any;

export abstract class ARCommonGeometryNode extends ARCommonNode {
  constructor(options: ARAddGeometryOptions, node: com.google.ar.sceneform.Node) {
    super(options, node);

    if (options.materials) {
      // TODO other material types
      if (options.materials[0].constructor.name === "Color") {
        ARCommonGeometryNode.applyMaterial(node, (<Color>options.materials[0]).android)
            .then(() => console.log("Material applied"))
            .catch(err => console.log("Error applying material: " + err));
      }
    }
  }

  protected static applyMaterial(node: com.google.ar.sceneform.Node, color: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      com.google.ar.sceneform.rendering.MaterialFactory.makeOpaqueWithColor(
          utils.ad.getApplicationContext(),
          new com.google.ar.sceneform.rendering.Color(color))
          .thenAccept(new java.util.function.Consumer({
            accept: material => {
              console.log("applyMaterial, material: " + material);
              console.log("applyMaterial, node: " + node);
              const renderable = node.getRenderable();
              console.log("applyMaterial, renderable: " + renderable);
              if (renderable) {
                renderable.setMaterial(material);
              }
              resolve();
            }
          }));
    });
  }

  public setMaterials(materials: Array<number>): void {
    ARCommonGeometryNode.applyMaterial(this.android, materials[0]);
  }

}
