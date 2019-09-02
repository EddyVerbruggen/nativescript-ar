import { ARMaterial, ARMaterialProperty, ARMaterialWrapMode } from "../../ar-common";
import { Color } from "tns-core-modules/color";

export class ARMaterialFactory {

  static getMaterial(material?: string | Color | ARMaterial): SCNMaterial | null {
    if (!material) {
      return null;
    }

    const mat = SCNMaterial.new(); // I'm sure these can be cached
    mat.lightingModelName = SCNLightingModelPhysicallyBased;
    if (typeof material === "string") {
      ARMaterialFactory.applyMaterialByString(mat, material);
    } else if (material.constructor.name === "Color") {
      ARMaterialFactory.applyMaterialByColor(mat, <Color>material);
    } else {
      ARMaterialFactory.applyMaterialByARMaterial(mat, <ARMaterial>material);
    }
    return mat;
  }

  private static applyMaterialByColor(mat: SCNMaterial, material: Color): void {
    mat.diffuse.contents = material.ios;
    mat.specular.contents = material.ios;
  }

  private static applyMaterialByString(mat: SCNMaterial, material: string): void {
    this.applyMaterialProperty(
        mat.diffuse,
        {
          contents: material,
          wrapMode: "Repeat"
        }
    );
  }

  private static applyMaterialByARMaterial(mat: SCNMaterial, material: ARMaterial): void {
    this.applyMaterialProperty(mat.diffuse, material.diffuse);
    this.applyMaterialProperty(mat.roughness, material.roughness);
    this.applyMaterialProperty(mat.metalness, material.metalness);
    this.applyMaterialProperty(mat.normal, material.normal);
    this.applyMaterialProperty(mat.specular, material.specular);
    this.applyMaterialProperty(mat.emission, material.emission);

    if (material.transparency !== undefined) {
      mat.transparency = material.transparency; // lower is more transparent
    }

    if (material.lightingModel === "CONSTANT") {
      console.log("lightingmodel is constant for mat.diffuse: " + mat.diffuse);
      mat.lightingModelName = SCNLightingModelConstant;
      mat.writesToDepthBuffer = false;
    // } else {
    //   mat.lightingModelName = SCNLightingModelPhysicallyBased;
    }
  }

  private static applyMaterialProperty(scnMaterialProperty: SCNMaterialProperty, materialProperty?: string | Color | ARMaterialProperty) {
    if (materialProperty === undefined) {
      return;
    }

    if (typeof materialProperty === "string") {
      scnMaterialProperty.contents = UIImage.imageNamed(materialProperty);
      scnMaterialProperty.wrapS = SCNWrapMode.Repeat;
      scnMaterialProperty.wrapT = SCNWrapMode.Repeat;

    } else if (materialProperty.constructor.name === "Color") {
      scnMaterialProperty.contents = (<Color>materialProperty).ios;

    } else {
      const prop = <ARMaterialProperty>materialProperty;
      scnMaterialProperty.contents = UIImage.imageNamed(prop.contents);
      if (prop.wrapMode) {
        const wrapMode = ARMaterialFactory.getWrapMode(prop.wrapMode);
        scnMaterialProperty.wrapS = wrapMode;
        scnMaterialProperty.wrapT = wrapMode;
      } else {
        scnMaterialProperty.wrapS = SCNWrapMode.Repeat;
        scnMaterialProperty.wrapT = SCNWrapMode.Repeat;
      }
    }
  }

  private static getWrapMode(wrapMode: ARMaterialWrapMode): SCNWrapMode {
    if (wrapMode === "Mirror") {
      return SCNWrapMode.Mirror;
    } else if (wrapMode === "Clamp") {
      return SCNWrapMode.Clamp;
    } else if (wrapMode === "ClampToBorder") {
      return SCNWrapMode.ClampToBorder;
    } else {
      return SCNWrapMode.Repeat;
    }
  }
}
