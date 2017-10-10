import { ARPlane as IARPlane, ARPosition } from "../../ar-common";
export declare class ARPlane implements IARPlane {
    private planeGeometry;
    private anchor;
    id: string;
    position: ARPosition;
    ios: SCNNode;
    static create(anchor: ARAnchor, opacity: number, material: SCNMaterial): ARPlane;
    setMaterial(material: SCNMaterial | null, opacity: number): void;
    update(anchor: any): void;
    remove(): void;
    private static setTextureScale(planeGeometry);
}
