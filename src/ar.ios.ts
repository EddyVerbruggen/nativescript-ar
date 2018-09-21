import {
  AR as ARBase,
  ARAddBoxOptions,
  ARAddModelOptions,
  ARAddSphereOptions,
  ARAddTextOptions,
  ARAddTubeOptions,
  ARDebugLevel,
  ARImageTrackingActions,
  ARLoadedEventData,
  ARNode,
  ARPlaneDetectedEventData,
  ARPlaneTappedEventData,
  ARPosition,
  ARSceneTappedEventData,
  ARTrackingImageDetectedEventData,
  ARTrackingMode
} from "./ar-common";
import { ARMaterialFactory } from "./nodes/ios/armaterialfactory";
import { ARBox } from "./nodes/ios/arbox";
import { ARCommonNode } from "./nodes/ios/arcommon";
import { ARPlane } from "./nodes/ios/arplane";
import { ARModel } from "./nodes/ios/armodel";
import { ARSphere } from "./nodes/ios/arsphere";
import { ARText } from "./nodes/ios/artext";
import { ARTube } from "./nodes/ios/artube";

export { ARDebugLevel, ARTrackingMode };

declare const ARImageAnchor: any;

const ARState = {
  planes: new Map<string, ARPlane>(),
  shapes: new Map<string, ARCommonNode>(),
};

const addBox = (options: ARAddBoxOptions, parentNode: SCNNode): Promise<ARBox> => {
  return new Promise((resolve, reject) => {
    const box = ARBox.create(options);
    ARState.shapes.set(box.id, box);
    parentNode.addChildNode(box.ios);
    resolve(box);
  });
};

const addModel = (options: ARAddModelOptions, parentNode: SCNNode): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    const model: ARModel = ARModel.create(options);
    ARState.shapes.set(model.id, model);
    parentNode.addChildNode(model.ios);
    resolve(model);
  });
};

class AR extends ARBase {
  sceneView: ARSCNView;
  private configuration: any; // TODO ARConfiguration;
  private delegate: ARSCNViewDelegateImpl;
  private physicsWorldContactDelegate: SCNPhysicsContactDelegateImpl;
  private sceneTapHandler: SceneTapHandlerImpl;
  private sceneLongPressHandler: SceneLongPressHandlerImpl;
  private scenePanHandler: ScenePanHandlerImpl;
  private sceneRotationHandler: SceneRotationHandlerImpl;

  static isSupported(): boolean {
    try {
      return !!ARSCNView && NSProcessInfo.processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME") === null;
    } catch (ignore) {
      return false;
    }
  }

  public setDebugLevel(to: ARDebugLevel): void {
    if (!this.sceneView) {
      return;
    }
    if (to === ARDebugLevel.WORLD_ORIGIN) {
      this.sceneView.debugOptions = ARSCNDebugOptionShowWorldOrigin;
    } else if (to === ARDebugLevel.FEATURE_POINTS) {
      this.sceneView.debugOptions = ARSCNDebugOptionShowFeaturePoints;
    } else if (to === ARDebugLevel.PHYSICS_SHAPES) {
      this.sceneView.debugOptions = SCNDebugOptions.ShowPhysicsShapes;
    } else {
      this.sceneView.debugOptions = SCNDebugOptions.None;
    }
  }

  public grabScreenshot(): any {
    return this.sceneView ? this.sceneView.snapshot() : null;
  }

  public toggleStatistics(on: boolean): void {
    if (!this.sceneView) {
      return;
    }
    this.sceneView.showsStatistics = on;
  }

  public togglePlaneDetection(on: boolean): void {
    if (!this.sceneView) {
      return;
    }
    this.configuration.planeDetection = on ? ARPlaneDetection.Horizontal : ARPlaneDetection.None;
    this.sceneView.session.runWithConfiguration(this.configuration);
  }

  public togglePlaneVisibility(on: boolean): void {
    const material: SCNMaterial = ARMaterialFactory.getMaterial(this.planeMaterial);
    ARState.planes.forEach(plane => {
      plane.setMaterial(material, on ? this.planeOpacity : 0);
    });
  }

  private initAR() {
    if (!AR.isSupported()) {
      return;
    }

    if (this.trackingMode === ARTrackingMode.IMAGE) {
      // TODO check for runtime availability of ARImageTrackingConfiguration
      const imageTrackingConfig = ARImageTrackingConfiguration.new();
      if (this.trackingImagesBundle) {
        const trackingImages = ARReferenceImage.referenceImagesInGroupNamedBundle(this.trackingImagesBundle, null);
        if (!trackingImages) {
          console.log("Could not load images from bundle!");
          return;
        }
        imageTrackingConfig.trackingImages = trackingImages;
        // tracking unlimited images probably has severe performance implications
        imageTrackingConfig.maximumNumberOfTrackedImages = Math.min(trackingImages.count, 10);
      }
      this.configuration = imageTrackingConfig;

    } else {
      const worldTrackingConfig = ARWorldTrackingConfiguration.new();
      worldTrackingConfig.detectionImages = ARReferenceImage.referenceImagesInGroupNamedBundle("AR Resources", null);
      this.configuration = worldTrackingConfig;
    }

    this.configuration.lightEstimationEnabled = true;

    this.sceneView = ARSCNView.new();
    this.sceneView.delegate = this.delegate = ARSCNViewDelegateImpl.createWithOwnerResultCallbackAndOptions(
        new WeakRef(this),
        data => {
        },
        {});

    // this.sceneView.session.delegate = ARSessionDelegateImpl.createWithOwnerResultCallbackAndOptions(
    //     new WeakRef(this),
    //     data => {
    //     },
    //     {});

    this.toggleStatistics(this.showStatistics);
    this.togglePlaneDetection(this.detectPlanes);

    // enabling these lines often result in an error: 'sensor failed to deliver [..] Make sure that the application has the required privacy settings'
    this.sceneView.autoenablesDefaultLighting = true;
    this.sceneView.automaticallyUpdatesLighting = true;
    this.sceneView.scene.rootNode.name = "root";

    const scene = SCNScene.new();
    this.sceneView.scene = scene;

    // tweak with delegate, see https://github.com/markdaws/arkit-by-example/blob/master/arkit-by-example/ViewController.m
    // const env = UIImage.imageNamed("./Assets.scnassets/Environment/spherical.jpg");
    // scene.lightingEnvironment.contents = env;

    this.addBottomPlane(scene);

    // register a tap handler
    this.sceneTapHandler = SceneTapHandlerImpl.initWithOwner(new WeakRef(this));
    const tapGestureRecognizer = UITapGestureRecognizer.alloc().initWithTargetAction(this.sceneTapHandler, "tap");
    tapGestureRecognizer.numberOfTapsRequired = 1;
    this.sceneView.addGestureRecognizer(tapGestureRecognizer);

    // register a longPress handler
    this.sceneLongPressHandler = SceneLongPressHandlerImpl.initWithOwner(new WeakRef(this));
    const longPressGestureRecognizer = UILongPressGestureRecognizer.alloc().initWithTargetAction(this.sceneLongPressHandler, "longpress");
    longPressGestureRecognizer.minimumPressDuration = 0.5;
    this.sceneView.addGestureRecognizer(longPressGestureRecognizer);

    // register a pan handler
    this.scenePanHandler = ScenePanHandlerImpl.initWithOwner(new WeakRef(this));
    const panGestureRecognizer = UIPanGestureRecognizer.alloc().initWithTargetAction(this.scenePanHandler, "pan");
    panGestureRecognizer.minimumNumberOfTouches = 1;
    this.sceneView.addGestureRecognizer(panGestureRecognizer);

    // register a rotation handler
    this.sceneRotationHandler = SceneRotationHandlerImpl.initWithOwner(new WeakRef(this));
    const rotationGestureRecognizer = UIRotationGestureRecognizer.alloc().initWithTargetAction(this.sceneRotationHandler, "rotate");
    this.sceneView.addGestureRecognizer(rotationGestureRecognizer);

    // make things look pretty
    this.sceneView.antialiasingMode = SCNAntialiasingMode.Multisampling4X;

    this.nativeView.addSubview(this.sceneView);

    const eventData: ARLoadedEventData = {
      eventName: ARBase.arLoadedEvent,
      object: this,
      ios: this.sceneView
    };
    this.notify(eventData);
  }

  private addBottomPlane(scene): void {
    // For our physics interactions, we place a large node a couple of meters below the world
    // origin, after an explosion, if the geometry we added has fallen onto this surface which
    // is place way below all of the surfaces we would have detected via ARKit then we consider
    // this geometry to have fallen out of the world and remove it.
    const bottomPlane = SCNBox.boxWithWidthHeightLengthChamferRadius(1000, 0.5, 1000, 0);

    const bottomMaterial = SCNMaterial.new();
    bottomMaterial.diffuse.contents = UIColor.colorWithWhiteAlpha(1.0, 0.0);
    const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(6);
    materialArray.addObject(bottomMaterial);
    bottomPlane.materials = materialArray;

    const bottomNode = SCNNode.nodeWithGeometry(bottomPlane);
    // position the plane 25 meters below our plane
    bottomNode.position = new ARPosition(0, -25, 0);
    bottomNode.physicsBody = SCNPhysicsBody.bodyWithTypeShape(SCNPhysicsBodyType.Kinematic, null);
    bottomNode.physicsBody.categoryBitMask = 0; // CollisionCategoryBottom;
    bottomNode.physicsBody.contactTestBitMask = 1; // CollisionCategoryCube;
    scene.rootNode.addChildNode(bottomNode);
    scene.physicsWorld.contactDelegate = this.physicsWorldContactDelegate = SCNPhysicsContactDelegateImpl.createWithOwner(new WeakRef(this));
  }

  public createNativeView(): Object {
    let v = super.createNativeView();
    this.initAR();
    return v;
  }

  public onLayout(left: number, top: number, right: number, bottom: number): void {
    super.onLayout(left, top, right, bottom);
    if (this.sceneView) {
      this.sceneView.layer.frame = this.ios.layer.bounds;
    }
  }

  public sceneLongPressed(recognizer: UITapGestureRecognizer): void {
    if (recognizer.state !== UIGestureRecognizerState.Began) {
      return;
    }

    // Perform a hit test using the screen coordinates to see if the user pressed any 3D geometry.
    const hitTestResults: NSArray<SCNHitTestResult> =
        this.sceneView.hitTestOptions(
            recognizer.locationInView(this.sceneView),
            <any>{
              SCNHitTestBoundingBoxOnlyKey: true,
              SCNHitTestFirstFoundOnlyKey: true
            });

    if (hitTestResults.count === 0) {
      return;
    }

    const hitResult: SCNHitTestResult = hitTestResults.firstObject;
    const savedModel = ARState.shapes.get(hitResult.node.name);

    if (savedModel) {
      savedModel.onLongPress();
    }
  }

  lastPositionForPanning: CGPoint;
  targetNodeForPanning: SCNNode;
  targetNodeForRotating: SCNNode;

  public scenePanned(recognizer: UIPanGestureRecognizer): void {
    let state = recognizer.state;
    if (state === UIGestureRecognizerState.Failed || state === UIGestureRecognizerState.Cancelled) {
      return;
    }

    let position = recognizer.locationInView(this.sceneView);

    if (state === UIGestureRecognizerState.Began) {
      this.lastPositionForPanning = position;

      const hitTestResults: NSArray<SCNHitTestResult> =
          this.sceneView.hitTestOptions(
              position,
              <any>{
                SCNHitTestBoundingBoxOnlyKey: true,
                SCNHitTestFirstFoundOnlyKey: true
              });

      if (hitTestResults.count === 0) {
        this.targetNodeForPanning = undefined;
        return;
      }

      const hitResult: SCNHitTestResult = hitTestResults.firstObject;
      const savedModel: ARCommonNode = ARState.shapes.get(hitResult.node.name);
      if (savedModel && savedModel.draggingEnabled && savedModel.ios) {
        this.targetNodeForPanning = savedModel.ios;
      } else {
        this.targetNodeForPanning = undefined;
      }

    } else if (this.targetNodeForPanning) {
      if (state === UIGestureRecognizerState.Changed) {
        // no real need for this
        // savedModel.onPan();

        let deltaX = (position.x - this.lastPositionForPanning.x) / 700;
        let deltaY = (position.y - this.lastPositionForPanning.y) / 700;
        // TODO when the object is to the RIGHT of the camera, x should 0, when it's to the left, z should be 0..
        this.targetNodeForPanning.localTranslateBy({x: deltaX, y: -deltaY, z: 0});
        this.lastPositionForPanning = position;

      } else if (state === UIGestureRecognizerState.Ended) {
        this.targetNodeForPanning = undefined;
      }
    }
  }

  public sceneRotated(recognizer: UIRotationGestureRecognizer): void {
    let state = recognizer.state;
    if (state === UIGestureRecognizerState.Failed || state === UIGestureRecognizerState.Cancelled) {
      return;
    }

    let position = recognizer.locationInView(this.sceneView);

    if (state === UIGestureRecognizerState.Began) {
      const hitTestResults: NSArray<SCNHitTestResult> =
          this.sceneView.hitTestOptions(
              position,
              <any>{
                SCNHitTestBoundingBoxOnlyKey: true,
                SCNHitTestFirstFoundOnlyKey: true
              });

      if (hitTestResults.count === 0) {
        this.targetNodeForRotating = undefined;
        return;
      }

      const hitResult: SCNHitTestResult = hitTestResults.firstObject;
      const savedModel: ARCommonNode = ARState.shapes.get(hitResult.node.name);
      if (savedModel && savedModel.rotatingEnabled && savedModel.ios) {
        this.targetNodeForRotating = savedModel.ios;
      } else {
        this.targetNodeForRotating = undefined;
      }

    } else if (this.targetNodeForRotating) {
      if (state === UIGestureRecognizerState.Changed) {
        // no real need for this
        // savedModel.onRotate();

        const previousAngles = this.targetNodeForRotating.eulerAngles;
        this.targetNodeForRotating.eulerAngles = {
          x: previousAngles.x,
          y: previousAngles.y - recognizer.rotation,
          z: previousAngles.z
        };
        recognizer.rotation = 0;

      } else if (state === UIGestureRecognizerState.Ended) {
        this.targetNodeForRotating = undefined;
      }
    }
  }

  public sceneTapped(recognizer: UITapGestureRecognizer): void {
    const sceneView = <ARSCNView>recognizer.view;
    const tapPoint = recognizer.locationInView(sceneView);
    const hitTestResults: NSArray<SCNHitTestResult> = sceneView.hitTestOptions(tapPoint, null);
    if (hitTestResults.count === 0) {
      const eventData: ARSceneTappedEventData = {
        eventName: ARBase.sceneTappedEvent,
        object: this,
        position: {
          x: tapPoint.x,
          y: tapPoint.y,
          z: 0 // irrelevant
        }
      };
      this.notify(eventData);
      return;
    }

    const hitResult: SCNHitTestResult = hitTestResults.firstObject;
    let node: SCNNode = hitResult.node;
    let existingItemTapped = false;

    if (node !== undefined) {
      let savedModel = ARState.shapes.get(node.name) || ARState.shapes.get(node.parentNode.name);
      if (savedModel !== undefined) {
        savedModel.onTap();
        existingItemTapped = true;
      }
    }

    if (!existingItemTapped) {
      // let's see if a plane was tapped instead
      const planeTapResults: NSArray<ARHitTestResult> = this.sceneView.hitTestTypes(tapPoint, ARHitTestResultType.ExistingPlaneUsingExtent);
      if (planeTapResults.count > 0) {
        const planeHitResult: ARHitTestResult = planeTapResults.firstObject;

        // Currently, in {N} hitResult.worldTransform is undefined so let's hack around it
        const hitResultStr = "" + planeHitResult;
        const transformStart = hitResultStr.indexOf("worldTransform=<translation=(") + "worldTransform=<translation=(".length;
        const transformStr = hitResultStr.substring(transformStart, hitResultStr.indexOf(")", transformStart));
        const transformParts = transformStr.split(" ");

        const eventData: ARPlaneTappedEventData = {
          eventName: ARBase.planeTappedEvent,
          object: this,
          position: {
            x: +transformParts[0],
            y: +transformParts[1],
            z: +transformParts[2]
          }
        };
        this.notify(eventData);
      }
    }
  }

  addModel(options: ARAddModelOptions): Promise<ARNode> {
    return addModel(options, this.sceneView.scene.rootNode);
  }

  addBox(options: ARAddBoxOptions): Promise<ARNode> {
    return addBox(options, this.sceneView.scene.rootNode);
  }

  addSphere(options: ARAddSphereOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {
      const sphere: ARSphere = ARSphere.create(options);
      ARState.shapes.set(sphere.id, sphere);
      this.sceneView.scene.rootNode.addChildNode(sphere.ios);
      resolve(sphere);
    });
  }

  addText(options: ARAddTextOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {
      const text: ARText = ARText.create(options);
      ARState.shapes.set(text.id, text);
      this.sceneView.scene.rootNode.addChildNode(text.ios);
      resolve(text);
    });
  }

  addTube(options: ARAddTubeOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {
      const tube: ARTube = ARTube.create(options);
      ARState.shapes.set(tube.id, tube);
      this.sceneView.scene.rootNode.addChildNode(tube.ios);
      resolve(tube);
    });
  }

  public reset(): void {
    this.configuration.planeDetection = ARPlaneDetection.Horizontal;
    this.sceneView.session.runWithConfigurationOptions(this.configuration, ARSessionRunOptions.ResetTracking | ARSessionRunOptions.RemoveExistingAnchors);
    ARState.planes.forEach(plane => plane.remove());
    ARState.planes.clear();
    ARState.shapes.forEach(node => node.remove());
    ARState.shapes.clear();
  }
}

class SceneTapHandlerImpl extends NSObject {
  private _owner: WeakRef<AR>;

  public static initWithOwner(owner: WeakRef<AR>): SceneTapHandlerImpl {
    let handler = <SceneTapHandlerImpl>SceneTapHandlerImpl.new();
    handler._owner = owner;
    return handler;
  }

  public tap(args: UITapGestureRecognizer): void {
    this._owner.get().sceneTapped(args);
  }

  public static ObjCExposedMethods = {
    "tap": {returns: interop.types.void, params: [interop.types.id]}
  };
}

class SceneLongPressHandlerImpl extends NSObject {
  private _owner: WeakRef<AR>;

  public static initWithOwner(owner: WeakRef<AR>): SceneLongPressHandlerImpl {
    let handler = <SceneLongPressHandlerImpl>SceneLongPressHandlerImpl.new();
    handler._owner = owner;
    return handler;
  }

  public longpress(args: UITapGestureRecognizer): void {
    this._owner.get().sceneLongPressed(args);
  }

  public static ObjCExposedMethods = {
    "longpress": {returns: interop.types.void, params: [interop.types.id]}
  };
}

class ScenePanHandlerImpl extends NSObject {
  private _owner: WeakRef<AR>;

  public static initWithOwner(owner: WeakRef<AR>): ScenePanHandlerImpl {
    let handler = <ScenePanHandlerImpl>ScenePanHandlerImpl.new();
    handler._owner = owner;
    return handler;
  }

  public pan(args: UIPanGestureRecognizer): void {
    this._owner.get().scenePanned(args);
  }

  public static ObjCExposedMethods = {
    "pan": {returns: interop.types.void, params: [interop.types.id]}
  };
}

class SceneRotationHandlerImpl extends NSObject {
  private _owner: WeakRef<AR>;

  public static initWithOwner(owner: WeakRef<AR>): SceneRotationHandlerImpl {
    let handler = <SceneRotationHandlerImpl>SceneRotationHandlerImpl.new();
    handler._owner = owner;
    return handler;
  }

  public rotate(args: UIRotationGestureRecognizer): void {
    this._owner.get().sceneRotated(args);
  }

  public static ObjCExposedMethods = {
    "rotate": {returns: interop.types.void, params: [interop.types.id]}
  };
}

class ARSCNViewDelegateImpl extends NSObject implements ARSCNViewDelegate {
  public static ObjCProtocols = [];

  private owner: WeakRef<AR>;
  private resultCallback: (message: any) => void;
  private options?: any;
  private currentTrackingState = ARTrackingState.Normal;

  public static new(): ARSCNViewDelegateImpl {
    try {
      ARSCNViewDelegateImpl.ObjCProtocols.push(ARSCNViewDelegate);
    } catch (ignore) {
    }
    return <ARSCNViewDelegateImpl>super.new();
  }

  public static createWithOwnerResultCallbackAndOptions(owner: WeakRef<AR>, callback: (message: any) => void, options?: any): ARSCNViewDelegateImpl {
    let delegate = <ARSCNViewDelegateImpl>ARSCNViewDelegateImpl.new();
    delegate.owner = owner;
    delegate.options = options;
    delegate.resultCallback = callback;
    return delegate;
  }

  /*
  rendererUpdateAtTime(): void {
    const ar: AR = this.owner.get();
    if (!ar.sceneView.session.currentFrame) {
      return;
    }
    const lightEstimate = ar.sceneView.session.currentFrame.lightEstimate;
    if (!lightEstimate) {
      return;
    }

    // A value of 1000 is considered neutral, lighting environment intensity normalizes
    // 1.0 to neutral so we need to scale the ambientIntensity value.
    const intensity = lightEstimate.ambientIntensity / 1000.0;
    ar.sceneView.scene.lightingEnvironment.intensity = intensity;
  }
  */

  sessionDidFailWithError(session: ARSession, error: NSError): void {
    // TODO inform the user
    console.log(">>> sessionDidFailWithError: " + error);
  }

  sessionWasInterrupted(session: ARSession): void {
    // TODO inform the user that the session has been interrupted because of fi. an overlay, or being put in to the background).
    console.log(">>> sessionWasInterrupted: The tracking session has been interrupted. The session will be reset once the interruption has completed");
  }

  sessionInterruptionEnded(session: ARSession): void {
    console.log(">>> sessionInterruptionEnded, calling reset");
    // Reset tracking and/or remove existing anchors if consistent tracking is required
    this.owner.get().reset();
  }

  sessionCameraDidChangeTrackingState(session: ARSession, camera: ARCamera): void {
    if (this.currentTrackingState === camera.trackingState) {
      return;
    }
    this.currentTrackingState = camera.trackingState;

    let trackingState = null,
        limitedTrackingStateReason = null;

    if (camera.trackingState === ARTrackingState.NotAvailable) {
      trackingState = "Not available";
    } else if (camera.trackingState === ARTrackingState.Limited) {
      trackingState = "Limited";
      const reason = camera.trackingStateReason;
      if (reason === ARTrackingStateReason.ExcessiveMotion) {
        limitedTrackingStateReason = "Excessive motion";
      } else if (reason === ARTrackingStateReason.InsufficientFeatures) {
        limitedTrackingStateReason = "Insufficient features";
      } else if (reason === ARTrackingStateReason.Initializing) {
        limitedTrackingStateReason = "Initializing";
      } else if (reason === ARTrackingStateReason.None) {
        limitedTrackingStateReason = "None";
      }
    } else if (camera.trackingState === ARTrackingState.Normal) {
      trackingState = "Normal";
    }

    // perhaps one day we can expose these as an event, but for now we'll just log them
    if (trackingState !== null) {
      console.log(`Tracking state changed to: ${trackingState}`);
      if (limitedTrackingStateReason !== null) {
        console.log(`Limited tracking state reason: ${limitedTrackingStateReason}`);
      }
    }
  }

  rendererDidAddNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void {
    if (anchor instanceof ARPlaneAnchor) {
      const owner = this.owner.get();
      // When a new plane is detected we create a new SceneKit plane to visualize it in 3D
      const plane: ARPlane = ARPlane.create(anchor, owner.planeOpacity, ARMaterialFactory.getMaterial(owner.planeMaterial));
      ARState.planes.set(anchor.identifier.UUIDString, plane);
      node.addChildNode(plane.ios);

      const eventData: ARPlaneDetectedEventData = {
        eventName: ARBase.planeDetectedEvent,
        object: owner,
        plane: plane
      };
      owner.notify(eventData);
    }
  }

  rendererDidUpdateNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void {
    const plane: ARPlane = ARState.planes.get(anchor.identifier.UUIDString);
    if (plane) {
      plane.update(anchor);
    }
  }

  rendererDidRemoveNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void {
    ARState.planes.delete(anchor.identifier.UUIDString);
  }

  rendererNodeForAnchor(renderer: SCNSceneRenderer, anchor: ARAnchor): SCNNode {
    const node = SCNNode.new();
    if (!(anchor instanceof ARImageAnchor)) {
      return node;
    }

    const imageAnchor: ARImageAnchor = <ARImageAnchor>anchor;
    const plane = SCNPlane.planeWithWidthHeight(imageAnchor.referenceImage.physicalSize.width, imageAnchor.referenceImage.physicalSize.height);
    const planeNode = SCNNode.nodeWithGeometry(plane);

    // Rotate the plane to match the anchor
    planeNode.eulerAngles = {
      x: -3.14159265359 / 2,
      y: 0,
      z: 0
    };

    // make the detected plane transparent
    plane.firstMaterial.diffuse.contents = UIColor.colorWithWhiteAlpha(1, 0);

    const owner = this.owner.get();
    const eventData: ARTrackingImageDetectedEventData = {
      eventName: ARBase.trackingImageDetectedEvent,
      object: owner,
      position: planeNode.position,
      imageName: imageAnchor.referenceImage.name,
      imageTrackingActions: new ARImageTrackingActionsImpl(plane, planeNode)
    };
    owner.notify(eventData);

    // Add plane node to parent
    node.addChildNode(planeNode);
    return node;
  }
}

class ARImageTrackingActionsImpl implements ARImageTrackingActions {
  constructor(public plane: SCNPlane, public planeNode: SCNNode) {
  }

  playVideo(nativeUrl: NSURL): void {
    const videoPlayer = AVPlayer.playerWithURL(nativeUrl);
    this.plane.firstMaterial.diffuse.contents = videoPlayer;
    videoPlayer.play();
  }

  addBox(options: ARAddBoxOptions): Promise<ARBox> {
    return addBox(options, this.planeNode);
  };

  addModel(options: ARAddModelOptions): Promise<ARModel> {
    return addModel(options, this.planeNode);
  };
}

class ARSessionDelegateImpl extends NSObject implements ARSessionDelegate {
  public static ObjCProtocols = [];

  private owner: WeakRef<AR>;
  private resultCallback: (message: any) => void;
  private options?: any;
  private currentTrackingState = ARTrackingState.Normal;

  public static new(): ARSessionDelegateImpl {
    try {
      ARSessionDelegateImpl.ObjCProtocols.push(ARSessionDelegate);
    } catch (ignore) {
    }
    return <ARSessionDelegateImpl>super.new();
  }

  public static createWithOwnerResultCallbackAndOptions(owner: WeakRef<AR>, callback: (message: any) => void, options?: any): ARSessionDelegateImpl {
    let delegate = <ARSessionDelegateImpl>ARSessionDelegateImpl.new();
    delegate.owner = owner;
    delegate.options = options;
    delegate.resultCallback = callback;
    return delegate;
  }

  sessionDidUpdateFrame(session: ARSession, frame: ARFrame): void {
    console.log("frame updated @ " + new Date().getTime());
  }
}

class SCNPhysicsContactDelegateImpl extends NSObject implements SCNPhysicsContactDelegate {
  public static ObjCProtocols = [SCNPhysicsContactDelegate];

  private owner: WeakRef<AR>;

  public static new(): SCNPhysicsContactDelegateImpl {
    return <SCNPhysicsContactDelegateImpl>super.new();
  }

  public static createWithOwner(owner: WeakRef<AR>): SCNPhysicsContactDelegateImpl {
    let delegate = <SCNPhysicsContactDelegateImpl>SCNPhysicsContactDelegateImpl.new();
    delegate.owner = owner;
    return delegate;
  }

  physicsWorldDidBeginContact(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void {
    // Here we detect a collision between pieces of geometry in the world, if one of the pieces
    // of geometry is the bottom plane it means the geometry has fallen out of the world. Then just remove it.
    const contactMask = contact.nodeA.physicsBody.categoryBitMask | contact.nodeB.physicsBody.categoryBitMask;
    // Avoid removing the bottom plane, so figure out which it is
    if (contactMask === (0 /* CollisionCategoryBottom */ | 1 /* CollisionCategoryCube */)) {
      if (contact.nodeA.physicsBody.categoryBitMask === 0 /* CollisionCategoryBottom */) {
        contact.nodeB.removeFromParentNode();
      } else {
        contact.nodeA.removeFromParentNode();
      }
    }
  }

  physicsWorldDidEndContact(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void {
    // console.log(">>> SCNPhysicsContactDelegateImpl.physicsWorldDidEndContact");
  }

  physicsWorldDidUpdateContact(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void {
    // console.log(">>> SCNPhysicsContactDelegateImpl.physicsWorldDidUpdateContact");
  }
}

exports.AR = AR;
