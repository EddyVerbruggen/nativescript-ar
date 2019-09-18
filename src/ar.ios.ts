import * as application from "tns-core-modules/application";
import { fromNativeSource, ImageSource } from "tns-core-modules/image-source";
import { AR as ARBase, ARAddBoxOptions, ARAddImageOptions, ARAddModelOptions, ARAddOptions, ARAddPlaneOptions, ARAddSphereOptions, ARAddTextOptions, ARAddTubeOptions, ARAddVideoOptions, ARCommonNode, ARDebugLevel, ARFaceTrackingActions, ARImageTrackingActions, ARImageTrackingOptions, ARLoadedEventData, ARPlaneDetectedEventData, ARPlaneTappedEventData, ARPosition, ARRotation, ARSceneTappedEventData, ARTrackingFaceEventData, ARTrackingFaceEventType, ARTrackingImageDetectedEventData, ARTrackingMode, ARUIViewOptions, ARVideoNode } from "./ar-common";
import { ARBox } from "./nodes/ios/arbox";
import { ARGroup } from "./nodes/ios/argroup";
import { ARImage } from "./nodes/ios/arimage";
import { ARMaterialFactory } from "./nodes/ios/armaterialfactory";
import { ARModel } from "./nodes/ios/armodel";
import { ARPlane } from "./nodes/ios/arplane";
import { ARSphere } from "./nodes/ios/arsphere";
import { ARText } from "./nodes/ios/artext";
import { ARTube } from "./nodes/ios/artube";
import { ARUIView } from "./nodes/ios/aruiview";
import { ARVideo } from "./nodes/ios/arvideo";

export { ARDebugLevel, ARTrackingMode };

declare const ARImageAnchor: any;
const main_queue = dispatch_get_current_queue();

const ARState = {
  planes: new Map<string, ARPlane>(),
  shapes: new Map<string, ARCommonNode>(),
};

const addUIView = (options: ARUIViewOptions, parentNode: SCNNode, sceneView: ARSCNView): Promise<ARUIView> => {
  return new Promise((resolve, reject) => {
    const view = ARUIView.create(options, sceneView);
    ARState.shapes.set(view.id, view);
    parentNode.addChildNode(view.ios);
    resolve(view);
  });
};

const addNode = (options: ARAddOptions, parentNode: SCNNode): Promise<ARCommonNode> => {
  return new Promise((resolve, reject) => {
    const group = ARGroup.create(options);
    ARState.shapes.set(group.id, group);
    parentNode.addChildNode(group.ios);
    resolve(group);
  });
};

const addVideo = (options: ARAddVideoOptions, parentNode: SCNNode): Promise<ARVideoNode> => {
  return new Promise<ARVideoNode>((resolve, reject) => {
    const video = ARVideo.create(options);
    ARState.shapes.set(video.id, video);
    parentNode.addChildNode(video.ios);
    resolve(video);
  });
};

const addImage = (options: ARAddImageOptions, parentNode: SCNNode): Promise<ARImage> => {
  return ARImage.create(options).then(image => {
    ARState.shapes.set(image.id, image);
    parentNode.addChildNode(image.ios);
    return image;
  });
};

const addText = (options: ARAddTextOptions, parentNode: SCNNode): Promise<ARText> => {
  return new Promise<ARText>((resolve, reject) => {
    const text = ARText.create(options);
    ARState.shapes.set(text.id, text);
    parentNode.addChildNode(text.ios);
    resolve(text);
  });
};

const addBox = (options: ARAddBoxOptions, parentNode: SCNNode): Promise<ARBox> => {
  return new Promise((resolve, reject) => {
    const box = ARBox.create(options);
    ARState.shapes.set(box.id, box);
    parentNode.addChildNode(box.ios);
    resolve(box);
  });
};

const addPlane = (options: ARAddPlaneOptions, parentNode: SCNNode): Promise<ARPlane> => {
  return new Promise((resolve, reject) => {
    const plane = ARPlane.createExternal(options);
    ARState.shapes.set(plane.id, plane);
    parentNode.addChildNode(plane.ios);
    resolve(plane);
  });
};

const addModel = (options: ARAddModelOptions, parentNode: SCNNode): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    const model: ARModel = ARModel.create(options);
    // need to delay this a little, otherwise facedetection models don't get added (for whatever reason)
    setTimeout(() => {
      ARState.shapes.set(model.id, model);
    });
    parentNode.addChildNode(model.ios);
    resolve(model);
  });
};

const addSphere = (options: ARAddSphereOptions, parentNode: SCNNode): Promise<ARCommonNode> => {
  return new Promise((resolve, reject) => {
    const sphere: ARSphere = ARSphere.create(options);
    ARState.shapes.set(sphere.id, sphere);
    parentNode.addChildNode(sphere.ios);
    resolve(sphere);
  });
};

const addTube = (options: ARAddTubeOptions, parentNode: SCNNode): Promise<ARCommonNode> => {
  return new Promise((resolve, reject) => {
    const tube: ARTube = ARTube.create(options);
    ARState.shapes.set(tube.id, tube);
    parentNode.addChildNode(tube.ios);
    resolve(tube);
  });
};

export class AR extends ARBase {
  sceneView: ARSCNView;
  private configuration: any; // TODO ARConfiguration;
  private delegate: any; // ARSCNViewDelegateImpl;
  private physicsWorldContactDelegate: SCNPhysicsContactDelegateImpl;
  private sceneTapHandler: SceneTapHandlerImpl;
  private sceneLongPressHandler: SceneLongPressHandlerImpl;
  private scenePanHandler: ScenePanHandlerImpl;
  private sceneRotationHandler: SceneRotationHandlerImpl;
  private scenePinchHandler: ScenePinchHandlerImpl;
  private recorder: RecordAR;

  static isSupported(): boolean {
    try {
      return !!ARSCNView && NSProcessInfo.processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME") === null;
    } catch (ignore) {
      return false;
    }
  }


  static isImageTrackingSupported(): boolean {
    try {
      return !!ARImageTrackingConfiguration && ARImageTrackingConfiguration.isSupported;
    } catch (ignore) {
      return false;
    }
  }

  static isFaceTrackingSupported(): boolean {
    try {
      return !!ARFaceTrackingConfiguration && ARFaceTrackingConfiguration.isSupported;
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

  public grabScreenshot(): Promise<ImageSource> {
    return new Promise((resolve, reject) => {
      if (this.sceneView) {
        resolve(fromNativeSource(this.sceneView.snapshot()));
        return;
      }
      reject("sceneView is not available");
    });
  }

  public startRecordingVideo(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.recorder) {
        this.recorder = RecordAR.alloc().initWithARSceneKit(this.sceneView);
        // commented, because it allegedly screws things up, but let's try: this.recorder.prepare(this.configuration)
        // this.recorder.prepare(new ARWorldTrackingConfiguration());
      }

      if (this.recorder.status === RecordARStatus.ReadyToRecord) {
        this.recorder.record();
        resolve();
      } else {
        reject();
      }
    });
  }

  public stopRecordingVideo(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.recorder.stop(nsUrl => resolve(nsUrl.absoluteString));
    });
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


  public getCameraPosition(): ARPosition {
    const p = this.sceneView.defaultCameraController.pointOfView.worldPosition;
    return {x: p.x, y: p.y, z: p.z};
  }

  private getCameraRotationRad(): ARRotation {
    let rot = this.sceneView.defaultCameraController.pointOfView.eulerAngles;
    return {x: rot.x, y: rot.y, z: rot.z};
  }

  public getCameraRotation(): ARRotation {


    const rot = this.getCameraRotationRad();

    const toDeg = (rad) => {
      return ((rad * (180.0 / Math.PI)) + 360) % 360;
    };

    return {x: toDeg(rot.x), y: toDeg(rot.y), z: toDeg(rot.z)};
  }

  private initAR() {
    if (!AR.isSupported()) {
      console.log("############### AR is not supported on this device.");
      return;
    }

    if (this.trackingMode === ARTrackingMode.IMAGE) {
      if (!AR.isImageTrackingSupported()) {
        console.log("############### Image tracking is not supported on this device. It's probably not running iOS 12+.");
        return;
      }

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

    } else if (this.trackingMode === ARTrackingMode.FACE) {
      if (!AR.isFaceTrackingSupported()) {
        console.log("############### Face tracking is not supported on this device. A device running 12+ is required, with a front-facing TrueDepth camera.");
        return;
      }
      this.configuration = ARFaceTrackingConfiguration.new();

    } else {
      this.configuration = ARWorldTrackingConfiguration.new();
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

    // TODO some of this is probably only relevant for WORLD tracking
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


    // register a rotation handler
    this.scenePinchHandler = ScenePinchHandlerImpl.initWithOwner(new WeakRef(this));
    const pinchGestureRecognizer = UIPinchGestureRecognizer.alloc().initWithTargetAction(this.scenePinchHandler, "pinch");
    this.sceneView.addGestureRecognizer(pinchGestureRecognizer);

    // make things look pretty
    this.sceneView.antialiasingMode = SCNAntialiasingMode.Multisampling4X;

    setTimeout(() => {
      this.nativeView.addSubview(this.sceneView);

      const eventData: ARLoadedEventData = {
        eventName: ARBase.arLoadedEvent,
        object: this,
        ios: this.sceneView
      };
      this.notify(eventData);
    });
  }

  private resolveParentNode(options: ARAddOptions): any {
    if (options.parentNode && options.parentNode.ios) {
      return options.parentNode.ios;
    }
    return this.sceneView.scene.rootNode;
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

    const tapPoint = recognizer.locationInView(this.sceneView);

    // Perform a hit test using the screen coordinates to see if the user pressed any 3D geometry.
    const hitTestResults: NSArray<SCNHitTestResult> =
        this.sceneView.hitTestOptions(
            tapPoint,
            <any>{
              SCNHitTestBoundingBoxOnlyKey: true,
              SCNHitTestFirstFoundOnlyKey: true
            });

    if (hitTestResults.count === 0) {
      return;
    }

    const hitResult: SCNHitTestResult = hitTestResults.firstObject;
    const savedModel = this.getTargetARNodeFromSCNNode(hitResult.node);
    if (savedModel) {
      savedModel.onLongPress({
        x: tapPoint.x,
        y: tapPoint.y
      });
    }
  }

  private getHitTargetWithProperty(position: CGPoint, property: string) {

    const hitTestResults: NSArray<SCNHitTestResult> =
        this.sceneView.hitTestOptions(
            position,
            NSDictionary.dictionaryWithDictionary(<any>{
              SCNHitTestBoundingBoxOnlyKey: false,
              SCNHitTestFirstFoundOnlyKey: false
            }));


    if (hitTestResults.count === 0) {
      return undefined;
    }

    let i = 0;
    let savedModel = null;
    while (hitTestResults.count > i) {
      savedModel = this.getTargetARNodeFromSCNNode(hitTestResults.objectAtIndex(i).node);
      if (savedModel && (!!savedModel[property])) {
        return savedModel;
      }
      i++;
    }
    return undefined;
  }

  private getTargetARNodeFromSCNNode(node: SCNNode): ARCommonNode {
    if (!(node && node.name)) {
      return undefined;
    }

    if (node.name[0] === '{') {
      return ARState.shapes.get(node.name);
    }

    return node.parentNode ? this.getTargetARNodeFromSCNNode(node.parentNode) : undefined;
  }

  lastPositionForPanning: CGPoint;
  targetNodeForPanning: ARCommonNode;
  targetNodeForRotating: SCNNode;
  targetNodeForScaling: SCNNode;
  targetNodeInitialScale: SCNVector3;
  targetNodeInitialPan: SCNVector3;

  public scenePanned(recognizer: UIPanGestureRecognizer): void {
    let state = recognizer.state;
    if (state === UIGestureRecognizerState.Failed || state === UIGestureRecognizerState.Cancelled) {
      return;
    }

    let position = recognizer.locationInView(null);
    let translation = recognizer.translationInView(null);
    if (state === UIGestureRecognizerState.Began) {
      this.lastPositionForPanning = position;

      const savedModel: ARCommonNode = this.getHitTargetWithProperty(position, "draggingEnabled");
      if (savedModel) {
        this.targetNodeForPanning = savedModel;
        this.targetNodeInitialPan = this.targetNodeForPanning.getWorldPosition();
      } else {
        this.targetNodeForPanning = undefined;
      }

    } else if (this.targetNodeForPanning) {
      if (state === UIGestureRecognizerState.Changed) {

        const pixelsPerMeter = 700;

        let node = SCNNode.node();
        node.position = this.sceneView.defaultCameraController.pointOfView.convertPositionToNode({
          x: (translation.x / pixelsPerMeter),
          y: -(translation.y / pixelsPerMeter),
          z: 0
        }, null);

        node.rotation = this.sceneView.defaultCameraController.pointOfView.rotation;
        let p = node.worldPosition;
        let cp = this.sceneView.defaultCameraController.pointOfView.worldPosition;


        const pos = this.targetNodeInitialPan;

        this.targetNodeForPanning.setWorldPosition({
          x: pos.x + p.x - cp.x, y: pos.y + p.y - cp.y, z: pos.z + p.z - cp.z
        });

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

      const savedModel: ARCommonNode = this.getHitTargetWithProperty(position, "rotatingEnabled");

      if (savedModel && savedModel.ios) {
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

  public scenePinched(recognizer: UIPinchGestureRecognizer): void {
    let state = recognizer.state;
    if (state === UIGestureRecognizerState.Failed || state === UIGestureRecognizerState.Cancelled) {
      return;
    }

    let position = recognizer.locationInView(this.sceneView);

    if (state === UIGestureRecognizerState.Began) {

      const savedModel: ARCommonNode = this.getHitTargetWithProperty(position, "scalingEnabled");

      if (savedModel && savedModel.ios) {
        this.targetNodeForScaling = savedModel.ios;
        this.targetNodeInitialScale = this.targetNodeForScaling.scale;
      } else {
        this.targetNodeForScaling = undefined;
      }

    } else if (this.targetNodeForScaling) {
      if (state === UIGestureRecognizerState.Changed) {
        // no real need for this
        // savedModel.onRotate();

        this.targetNodeForScaling.scale = {
          x: this.targetNodeInitialScale.x * recognizer.scale,
          y: this.targetNodeInitialScale.y * recognizer.scale,
          z: this.targetNodeInitialScale.z * recognizer.scale
        };

      } else if (state === UIGestureRecognizerState.Ended) {
        this.targetNodeForScaling = undefined;
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

    if (node !== undefined) {
      let savedModel = this.getTargetARNodeFromSCNNode(node);
      if (savedModel !== undefined) {
        savedModel.onTap({
          x: tapPoint.x,
          y: tapPoint.y
        });
        return;
      }
    }

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


  addUIView(options: ARUIViewOptions): Promise<ARUIView> {
    return addUIView(options, this.resolveParentNode(options), this.sceneView);
  }

  addNode(options: ARAddOptions): Promise<ARCommonNode> {
    return addNode(options, this.resolveParentNode(options));
  }

  addVideo(options: ARAddVideoOptions): Promise<ARVideoNode> {
    return addVideo(options, this.resolveParentNode(options));
  }

  addImage(options: ARAddImageOptions): Promise<ARCommonNode> {
    return addImage(options, this.resolveParentNode(options));
  }

  addModel(options: ARAddModelOptions): Promise<ARCommonNode> {
    return addModel(options, this.resolveParentNode(options));
  }

  addPlane(options: ARAddPlaneOptions): Promise<ARCommonNode> {
    return addPlane(options, this.resolveParentNode(options));
  }

  addBox(options: ARAddBoxOptions): Promise<ARCommonNode> {
    return addBox(options, this.resolveParentNode(options));
  }

  addSphere(options: ARAddSphereOptions): Promise<ARCommonNode> {
    return addSphere(options, this.resolveParentNode(options));
  }

  addText(options: ARAddTextOptions): Promise<ARCommonNode> {
    return addText(options, this.resolveParentNode(options));
  }

  addTube(options: ARAddTubeOptions): Promise<ARCommonNode> {
    return addTube(options, this.resolveParentNode(options));
  }

  trackImage(options: ARImageTrackingOptions): void {
    if (!(this.configuration instanceof ARImageTrackingConfiguration)) {
      throw "Only supported in trackingMode: IMAGE";
    }

    const set = NSMutableSet.setWithSet(this.configuration.trackingImages);
    const name = options.name || options.image.split('/').pop().split('.').slice(0, -1).join('.');

    let img;

    if (options.image.indexOf('://') > 0) {
      img = UIImage.imageWithData(NSData.alloc().initWithContentsOfURL(NSURL.URLWithString(options.image)));
    } else {
      img = UIImage.imageNamed(options.image);
    }

    const refImage = ARReferenceImage.alloc().initWithCGImageOrientationPhysicalWidth(img.CGImage, 1, options.width || 1);
    refImage.name = name;
    set.addObject(refImage);


    this.configuration.maximumNumberOfTrackedImages = Math.min(set.count, 10);
    this.configuration.trackingImages = set;
    this.sceneView.session.runWithConfigurationOptions(this.configuration, ARSessionRunOptions.ResetTracking | ARSessionRunOptions.RemoveExistingAnchors);

    if (!options.onDetectedImage) {
      return;
    }

    this.on(ARBase.trackingImageDetectedEvent, (args: ARTrackingImageDetectedEventData) => {
      if (args.imageName === name) {
        options.onDetectedImage(args);
      }
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


class ScenePinchHandlerImpl extends NSObject {
  private _owner: WeakRef<AR>;

  public static initWithOwner(owner: WeakRef<AR>): ScenePinchHandlerImpl {
    let handler = <ScenePinchHandlerImpl>ScenePinchHandlerImpl.new();
    handler._owner = owner;
    return handler;
  }

  public pinch(args: UIPinchGestureRecognizer): void {
    this._owner.get().scenePinched(args);
  }

  public static ObjCExposedMethods = {
    "pinch": {returns: interop.types.void, params: [interop.types.id]}
  };
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
  private hasFace = false;

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
    if (anchor instanceof ARPlaneAnchor) {
      const plane: ARPlane = ARState.planes.get(anchor.identifier.UUIDString);
      if (plane) {
        plane.update(anchor);
      }
      return;
    }

    const owner: AR = this.owner.get();

    if (!(anchor instanceof ARFaceAnchor)) {
      // if we had a face, now we lost it
      if (this.hasFace) {
        this.hasFace = false;

        owner.notify(<ARTrackingFaceEventData>{
          eventName: ARBase.trackingFaceDetectedEvent,
          object: owner,
          eventType: "LOST"
        });
      }
      return;
    }

    const faceAnchor: ARFaceAnchor = anchor;
    let eventType: ARTrackingFaceEventType = "UPDATED";

    // if we didn't have a face but now we do
    if (!this.hasFace) {
      this.hasFace = true;
      owner.reset();
      eventType = "FOUND";
    }

    let faceGeometry;
    if (this.occlusionNode) {
      faceGeometry = this.occlusionNode.geometry as ARSCNFaceGeometry;
    } else {
      faceGeometry = node.geometry as ARSCNFaceGeometry;
    }
    if (faceGeometry) {
      const faceAnchor = anchor as ARFaceAnchor;
      faceGeometry.updateFromFaceGeometry(faceAnchor.geometry);
    }

    const blendShapes: NSDictionary<string, number> = faceAnchor.blendShapes;

    owner.notify(<ARTrackingFaceEventData>{
      eventName: ARBase.trackingFaceDetectedEvent,
      object: owner,
      eventType: eventType,
      properties: {
        eyeBlinkLeft: blendShapes.valueForKey(ARBlendShapeLocationEyeBlinkLeft),
        eyeBlinkRight: blendShapes.valueForKey(ARBlendShapeLocationEyeBlinkRight),
        jawOpen: blendShapes.valueForKey(ARBlendShapeLocationJawOpen),
        lookAtPoint: {
          x: faceAnchor.lookAtPoint[0],
          y: faceAnchor.lookAtPoint[1],
          z: faceAnchor.lookAtPoint[2]
        },
        mouthFunnel: blendShapes.valueForKey(ARBlendShapeLocationMouthFunnel),
        mouthSmileLeft: blendShapes.valueForKey(ARBlendShapeLocationMouthSmileLeft),
        mouthSmileRight: blendShapes.valueForKey(ARBlendShapeLocationMouthSmileRight),
        tongueOut: blendShapes.valueForKey(ARBlendShapeLocationTongueOut)
      },
      faceTrackingActions: eventType === "FOUND" ? new ARFaceTrackingActionsImpl(renderer, anchor, node, this) : undefined
    });
  }

  rendererDidRemoveNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void {
    ARState.planes.delete(anchor.identifier.UUIDString);
  }

  public occlusionNode: SCNNode;

  rendererNodeForAnchor(renderer: SCNSceneRenderer, anchor: ARAnchor): SCNNode {
    const node = SCNNode.new();
    const owner = this.owner.get();

    const sceneViewRenderer: any = renderer; // ARSCNView

    let faceGeometry: ARSCNFaceGeometry;
    // if faceMaterial is set, make the faceGeometry mesh exclude eyes and mouth
    if (owner.faceMaterial) {
      faceGeometry = ARSCNFaceGeometry.faceGeometryWithDevice(sceneViewRenderer.device);
      const material = faceGeometry.firstMaterial;

      material.colorBufferWriteMask = SCNColorMask.All;
      material.diffuse.contents = owner.faceMaterial;
      material.lightingModelName = SCNLightingModelPhysicallyBased;

      node.addChildNode(SCNNode.nodeWithGeometry(faceGeometry));
    } else {
      // if faceMaterial is NOT set, make the faceGeometry mesh include eyes and mouth
      faceGeometry = ARSCNFaceGeometry.faceGeometryWithDeviceFillMesh(sceneViewRenderer.device, true);
      if (faceGeometry) {
        faceGeometry.firstMaterial.colorBufferWriteMask = SCNColorMask.None;
      }
    }

    this.occlusionNode = SCNNode.nodeWithGeometry(faceGeometry);
    this.occlusionNode.renderingOrder = -1;
    node.addChildNode(this.occlusionNode);

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

    planeNode.renderingOrder = -1;
    planeNode.opacity = 1;

    // this makes the detected image transparent:
    plane.firstMaterial.diffuse.contents = UIColor.colorWithWhiteAlpha(1, 0);
    // and this makes the detected image opaque
    // plane.firstMaterial.colorBufferWriteMask = SCNColorMask.Alpha;

    const eventData: ARTrackingImageDetectedEventData = {
      eventName: ARBase.trackingImageDetectedEvent,
      object: owner,
      position: planeNode.position,
      size: imageAnchor.referenceImage.physicalSize,
      imageName: imageAnchor.referenceImage.name,
      imageTrackingActions: new ARImageTrackingActionsImpl(plane, planeNode, owner.sceneView)
    };

    // run this on the main thread, otherwise updating the UI from the "imageTrackingActions" callback will error
    dispatch_async(main_queue, () => owner.notify(eventData));

    // Add plane node to parent
    node.addChildNode(planeNode);
    return node;
  }
}

class ARImageTrackingActionsImpl implements ARImageTrackingActions {
  AVPlayerItemDidPlayToEndTimeNotificationObserver: any;

  constructor(public plane: SCNPlane, public planeNode: SCNNode, private sceneView: ARSCNView) {
  }

  playVideo(nativeUrl: string, loop?: boolean): void {
    const videoPlayer = AVPlayer.playerWithURL(NSURL.URLWithString(nativeUrl));
    this.plane.firstMaterial.diffuse.contents = videoPlayer;

    if (loop === true) {
      this.AVPlayerItemDidPlayToEndTimeNotificationObserver = application.ios.addNotificationObserver(
          AVPlayerItemDidPlayToEndTimeNotification,
          (notification: NSNotification) => {
            // const player = this.plane.firstMaterial.diffuse.contents;
            if (videoPlayer.currentItem && videoPlayer.currentItem === notification.object) {
              videoPlayer.seekToTime(CMTimeMake(5, 100));
              videoPlayer.play();
            }
          }
      );
    }
    videoPlayer.play();
  }

  stopVideoLoop(): void {
    if (this.AVPlayerItemDidPlayToEndTimeNotificationObserver) {
      application.ios.removeNotificationObserver(
          this.AVPlayerItemDidPlayToEndTimeNotificationObserver,
          AVPlayerItemDidPlayToEndTimeNotification
      );
      this.AVPlayerItemDidPlayToEndTimeNotificationObserver = undefined;
    }
  }

  addBox(options: ARAddBoxOptions): Promise<ARBox> {
    return addBox(options, this.planeNode);
  }

  addModel(options: ARAddModelOptions): Promise<ARModel> {
    return addModel(options, this.planeNode);
  }

  addImage(options: ARAddImageOptions): Promise<ARImage> {
    return addImage(options, this.planeNode);
  }

  addUIView(options: ARUIViewOptions): Promise<ARUIView> {
    return addUIView(options, this.planeNode, this.sceneView);
  }

  addNode(options: ARUIViewOptions): Promise<ARCommonNode> {
    return addNode(options, this.planeNode);
  }
}

class ARFaceTrackingActionsImpl implements ARFaceTrackingActions {
  constructor(public renderer: SCNSceneRenderer, public anchor: ARAnchor, public node: SCNNode, public owner: ARSCNViewDelegateImpl) {
  }

  addModel(options: ARAddModelOptions): Promise<ARModel> {
    return addModel(options, this.node);
  }

  addText(options: ARAddTextOptions): Promise<ARText> {
    return addText(options, this.node);
  }
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
