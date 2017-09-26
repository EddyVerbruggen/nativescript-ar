import { ARMaterial } from "../../ar-common";
import { Color } from "tns-core-modules/color";
export declare class ARMaterialFactory {
    static getMaterial(material: string | Color | ARMaterial): SCNMaterial;
    private static applyMaterialByColor(mat, material);
    private static applyMaterialByString(mat, material);
    private static applyMaterialByARMaterial(mat, material);
    private static applyMaterialProperty(scnMaterialProperty, materialProperty?);
    private static getWrapMode(wrapMode);
}
