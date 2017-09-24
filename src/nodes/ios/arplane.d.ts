import { ARNode, ARPosition } from "../../ar-common";
export declare class ARPlane implements ARNode {
    private planeGeometry;
    private anchor;
    id: string;
    position: ARPosition;
    ios: SCNNode;
    static create(anchor: ARAnchor, hidden: boolean, material: SCNMaterial): ARPlane;
    setMaterial(material: SCNMaterial, hidden: boolean): void;
    update(anchor: any): void;
    remove(): void;
    private static setTextureScale(planeGeometry);
}
