import { ARAddOptions, ARNode, ARPosition } from "../../ar-common";
export declare abstract class ARCommonNode implements ARNode {
    id: string;
    ios: SCNNode;
    position: ARPosition;
    onTapHandler?: (model: ARNode) => void;
    onLongPressHandler?: (model: ARNode) => void;
    onPanHandler?: (model: ARNode) => void;
    draggingEnabled: boolean;
    rotatingEnabled: boolean;
    constructor(options: ARAddOptions, node: SCNNode);
    onTap(): void;
    onLongPress(): void;
    onPan(): void;
    allowDragging(): boolean;
    allowRotating(): boolean;
    remove(): void;
    private static degToRadians(degrees);
}
