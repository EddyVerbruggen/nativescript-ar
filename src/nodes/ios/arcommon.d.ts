import { ARAddOptions, ARNode, ARPosition } from "../../ar-common";
export declare abstract class ARCommonNode implements ARNode {
    id: string;
    ios: SCNNode;
    position: ARPosition;
    onTapHandler?: (model: ARNode) => void;
    onLongPressHandler?: (model: ARNode) => void;
    constructor(options: ARAddOptions, node: SCNNode);
    onTap(): void;
    onLongPress(): void;
    remove(): void;
}
