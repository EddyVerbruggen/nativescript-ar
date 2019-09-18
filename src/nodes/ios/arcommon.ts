import { ARAddOptions, ARCommonNode as IARCommonNode, ARDimensions2D, ARNodeInteraction, ARPosition, ARRotation, ARScale } from "../../ar-common";

export abstract class ARCommonNode implements IARCommonNode {
  id: string;
  ios: SCNNode;
  position: ARPosition;
  onTapHandler?: (interaction: ARNodeInteraction) => void;
  onLongPressHandler?: (interaction: ARNodeInteraction) => void;
  onPanHandler?: (interaction: ARNodeInteraction) => void;
  draggingEnabled: boolean;
  rotatingEnabled: boolean;
  scalingEnabled: boolean;

  constructor(options: ARAddOptions, node: SCNNode) {
    this.onTapHandler = options.onTap;
    this.onLongPressHandler = options.onLongPress;

    if (options.parentNode) {
      // propagate event to parent if not listening for it here
      if (!this.onTapHandler) {
        this.onTapHandler = (interaction => (<ARCommonNode>options.parentNode).onTap(interaction.touchPosition));
      }
      if (!this.onLongPressHandler) {
        this.onLongPressHandler = (interaction => (<ARCommonNode>options.parentNode).onLongPress(interaction.touchPosition));
      }
    }

    // this.onPanHandler = options.onPan;
    this.draggingEnabled = options.draggingEnabled;
    this.rotatingEnabled = options.rotatingEnabled;
    this.scalingEnabled = options.scalingEnabled;

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

    // note that certain models stop working when using image tracking when these lines are enabled, so only applying when 'mass' was requested (which makes sense anyway IMO)
    if (options.mass) {
      node.physicsBody = SCNPhysicsBody.bodyWithTypeShape(SCNPhysicsBodyType.Dynamic, null);
      node.physicsBody.mass = options.mass || 0;
      node.physicsBody.categoryBitMask = 1; // CollisionCategoryCube
    }

    if (options.scale) {
      node.scale = <ARPosition>(options.scale instanceof ARScale || (<any>options.scale).x ? options.scale : {
        x: options.scale,
        y: options.scale,
        z: options.scale
      });
    }

    this.ios = node;
  }

  moveTo(to: ARPosition): void {
    this.ios.position = {
      x: to.x !== undefined ? to.x : this.ios.position.x,
      y: to.y !== undefined ? to.y : this.ios.position.y,
      z: to.z !== undefined ? to.z : this.ios.position.z,
    };
  }

  moveBy(by: ARPosition): void {
    this.ios.position = {
      x: this.ios.position.x + by.x,
      y: this.ios.position.y + by.y,
      z: this.ios.position.z + by.z
    };
  }

  getPosition(): ARPosition {
    const pos = this.ios.position;
    return {
      x: pos.x,
      y: pos.y,
      z: pos.z
    };
  }

  getWorldPosition(): ARPosition {
    const pos = this.ios.worldPosition;
    return {
      x: pos.x,
      y: pos.y,
      z: pos.z
    };
  }

  setPosition(pos: ARPosition): void {

    this.ios.position = {
      x: pos.x,
      y: pos.y,
      z: pos.z
    };
  }

  setWorldPosition(pos: ARPosition): void {

    this.ios.worldPosition = {
      x: pos.x,
      y: pos.y,
      z: pos.z
    };
  }

  rotateBy(by: ARRotation): void {
    this.ios.eulerAngles = {
      x: this.ios.eulerAngles.x + ARCommonNode.degToRadians(by.x),
      y: this.ios.eulerAngles.y + ARCommonNode.degToRadians(by.y),
      z: this.ios.eulerAngles.z + ARCommonNode.degToRadians(by.z)
    };
  }


  setRotation(rot: ARRotation): void {
    this.ios.eulerAngles = {
      x: ARCommonNode.degToRadians(rot.x),
      y: ARCommonNode.degToRadians(rot.y),
      z: ARCommonNode.degToRadians(rot.z)
    };
  }

  lookAtWorldPosition(worldPos: ARPosition): void {
    this.ios.lookAt(worldPos); // ,  {x:0, y:1, z:0},  {x:0, y:0, z:1}
  }

  lookAtPosition(localPos: ARPosition): void {
    const worldPos = this.ios.convertPositionToNode(localPos, null);
    this.lookAtWorldPosition(worldPos);
  }

  lookAtNode(node: ARCommonNode): void {
    this.lookAtWorldPosition(node.getWorldPosition());
  }

  scaleBy(by: number | ARScale): void {
    this.ios.scale = {
      x: this.ios.scale.x + (by instanceof ARScale ? by.x : by),
      y: this.ios.scale.y + (by instanceof ARScale ? by.y : by),
      z: this.ios.scale.z + (by instanceof ARScale ? by.z : by)
    };
  }

  setScale(scale: number | ARScale): void {
    this.ios.scale = {
      x: (scale instanceof ARScale ? scale.x : scale),
      y: (scale instanceof ARScale ? scale.y : scale),
      z: (scale instanceof ARScale ? scale.z : scale)
    };
  }

  onTap(touchPosition: ARDimensions2D): void {
    this.onTapHandler && this.onTapHandler({
      node: this,
      touchPosition
    });
  }

  onLongPress(touchPosition: ARDimensions2D): void {
    this.onLongPressHandler && this.onLongPressHandler({
      node: this,
      touchPosition
    });
  }

  onPan(touchPosition: ARDimensions2D): void {
    this.onPanHandler && this.onPanHandler({
      node: this,
      touchPosition
    });
  }

  setVisible(visible: boolean): void {
    this.ios.hidden = !visible;
  }


  allowDragging(): boolean {
    return this.draggingEnabled;
  }

  allowRotating(): boolean {
    return this.rotatingEnabled;
  }

  allowScaling(): boolean {
    return this.scalingEnabled;
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

