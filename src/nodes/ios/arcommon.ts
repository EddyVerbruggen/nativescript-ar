import { ARAddOptions, ARNode, ARPosition, ARScale } from "../../ar-common";

export abstract class ARCommonNode implements ARNode {
  id: string;
  ios: SCNNode;
  position: ARPosition;
  onTapHandler?: (model: ARNode) => void;
  onLongPressHandler?: (model: ARNode) => void;
  onPanHandler?: (model: ARNode) => void;
  draggingEnabled: boolean;
  rotatingEnabled: boolean;

  constructor(options: ARAddOptions, node: SCNNode) {
    this.onTapHandler = options.onTap;
    this.onLongPressHandler = options.onLongPress;
    // this.onPanHandler = options.onPan;
    this.draggingEnabled = options.draggingEnabled;
    this.rotatingEnabled = options.rotatingEnabled;

    node.position = this.position = options.position;
    if (options.rotation) {
      node.eulerAngles = {
        x: ARCommonNode.degToRadians(options.rotation.x),
        y: ARCommonNode.degToRadians(options.rotation.y),
        z: ARCommonNode.degToRadians(options.rotation.z)
      };
    }

    // generate a unique name, used for later reference
    node.name = this.id = (JSON.stringify(options.position) + "_" + new Date().getTime());

    node.physicsBody = SCNPhysicsBody.bodyWithTypeShape(SCNPhysicsBodyType.Dynamic, null);
    node.physicsBody.mass = options.mass || 0;
    node.physicsBody.categoryBitMask = 1; // CollisionCategoryCube

    if (options.scale) {
      node.scale = <ARPosition>(options.scale instanceof ARScale ? options.scale : {
        x: options.scale,
        y: options.scale,
        z: options.scale
      });
    }

    this.ios = node;
  }

  onTap(): void {
    this.onTapHandler && this.onTapHandler(this);
  }

  onLongPress(): void {
    this.onLongPressHandler && this.onLongPressHandler(this);
  }

  onPan(): void {
    this.onPanHandler && this.onPanHandler(this);
  }

  allowDragging(): boolean {
    return this.draggingEnabled;
  }

  allowRotating(): boolean {
    return this.rotatingEnabled;
  }

  remove(): void {
    // TODO would be nice if we could delete it from the cache.. perhaps move it to this common class as a static prop?
    // ARState.shapes.delete(this.id);
    this.ios.removeFromParentNode();
  }

  private static degToRadians(degrees: number): number {
    return degrees * (3.14159265359 / 180);
  }
}

