import { ARAddOptions, ARNode, ARPosition, ARRotation, ARScale } from "../../ar-common";
export declare abstract class ARCommonNode implements ARNode {
    id: string;
    ios: SCNNode;
    position: ARPosition;
    scale?: number | ARScale;
    rotation: ARRotation;
    onTapHandler?: (model: ARNode) => void;
    onLongPressHandler?: (model: ARNode) => void;
    onPanHandler?: (model: ARNode) => void;
    constructor(options: ARAddOptions, node: SCNNode);
    onTap(): void;
    onLongPress(): void;
    onPan(): void;
    remove(): void;
}
