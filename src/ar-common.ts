import { Color } from "tns-core-modules/color";
import { EventData } from "tns-core-modules/data/observable";
import { ImageSource } from "tns-core-modules/image-source";
import { ContentView } from "tns-core-modules/ui/content-view";
import { Property } from "tns-core-modules/ui/core/view";
import { booleanConverter } from "tns-core-modules/ui/core/view-base";
import { ARBox } from "./nodes/ios/arbox";
import { ARModel } from "./nodes/ios/armodel";

export enum ARDebugLevel {
  NONE = <any>"NONE",
  WORLD_ORIGIN = <any>"WORLD_ORIGIN",
  FEATURE_POINTS = <any>"FEATURE_POINTS",
  PHYSICS_SHAPES = <any>"PHYSICS_SHAPES"
}

export enum ARTrackingMode {
  WORLD = <any>"WORLD",
  IMAGE = <any>"IMAGE",
  FACE = <any>"FACE"
}

const debugLevelProperty = new Property<AR, ARDebugLevel>({
  name: "debugLevel",
  defaultValue: ARDebugLevel.NONE
});

const trackingModeProperty = new Property<AR, ARTrackingMode>({
  name: "trackingMode",
  defaultValue: ARTrackingMode.WORLD
});

const planeMaterialProperty = new Property<AR, string>({
  name: "planeMaterial"
});

const faceMaterialProperty = new Property<AR, string>({
  name: "faceMaterial"
});

const trackingImagesBundleProperty = new Property<AR, string>({
  name: "trackingImagesBundle"
});

const planeOpacityProperty = new Property<AR, number>({
  name: "planeOpacity",
  defaultValue: 0.1
});

const detectPlanesProperty = new Property<AR, boolean>({
  name: "detectPlanes",
  defaultValue: false,
  valueConverter: booleanConverter
});

const showStatisticsProperty = new Property<AR, boolean>({
  name: "showStatistics",
  defaultValue: false,
  valueConverter: booleanConverter
});

export interface ARNode {
  id: string;
  position: ARPosition;
  scale?: number | ARScale;
  rotation?: ARRotation;
  ios?: any; /* SCNNode */
  android?: any; /* TODO Anchor? */
  remove(): void;

  // TODO add animate({});
}

export interface ARNodeInteraction {
  touchPosition: ARDimensions2D;
  node: ARCommonNode;
}

export interface ARCommonNode extends ARNode {
  moveBy?(to: ARPosition): void;

  rotateBy?(by: ARRotation): void;

  scaleBy?(by: number | ARScale): void;
}

export interface ARAddOptions {
  position: ARPosition;
  scale?: number | ARScale;
  rotation?: ARRotation;
  mass?: number;
  onTap?: (interaction: ARNodeInteraction) => void;
  onLongPress?: (interaction: ARNodeInteraction) => void;
  // onPan?: (interaction: ARNodeInteraction) => void;
  draggingEnabled?: boolean;
  rotatingEnabled?: boolean;
  parentNode?: ARNode;
}

export type ARMaterialWrapMode = "Clamp" | "Repeat" | "ClampToBorder" | "Mirror";

export interface ARMaterialProperty {
  /**
   * Refers to a file in App_Resources.
   */
  contents: string;

  /**
   * Default "Repeat"
   */
  wrapMode?: ARMaterialWrapMode;
}

export interface ARMaterial {
  diffuse?: string | Color | ARMaterialProperty;
  roughness?: string | Color | ARMaterialProperty;
  metalness?: string | Color | ARMaterialProperty;
  normal?: string | Color | ARMaterialProperty;
  specular?: string | Color | ARMaterialProperty;
  transparency?: number;
}

export interface ARAddGeometryOptions extends ARAddOptions {
  materials?: Array<string | Color | ARMaterial>;
}

export interface ARAddImageOptions extends ARAddOptions {
  image: string | ImageSource;
  dimensions?: ARDimensions2D;
}

export interface ARAddModelOptions extends ARAddOptions {
  name: string;
  childNodeName?: string;
}

export interface ARAddBoxOptions extends ARAddGeometryOptions {
  dimensions: number | ARDimensions;
  chamferRadius?: number;
}

export interface ARAddSphereOptions extends ARAddGeometryOptions {
  radius: number;
  segmentCount?: number;
}

export interface ARAddTextOptions extends ARAddGeometryOptions {
  /**
   * iOS: DefaultHelvetica 36 point.
   */
  // font?: string;
  text: string;
  /**
   * Leaving this out, or specifying 0.0 means 2D text is added.
   */
  depth?: number;
}

export interface ARAddTubeOptions extends ARAddGeometryOptions {
  innerRadius: number;
  outerRadius: number;
  height: number;
  radialSegmentCount?: number;
  heightSegmentCount?: number;
}

export interface ARPlane extends ARNode {
}

export interface AREventData extends EventData {
  object: AR;
}

export interface ARLoadedEventData extends AREventData {
  ios?: any; /* ARSCNView */
  android?: any; /* org.nativescript.tns.arlib.TNSSurfaceRenderer */
}

export interface ARPlaneTappedEventData extends AREventData {
  position: ARPosition;
}

export interface ARSceneTappedEventData extends AREventData {
  position: ARPosition;
}

export interface ARPlaneDetectedEventData extends AREventData {
  plane: ARPlane;
}

export interface ARTrackingImageDetectedEventData extends AREventData {
  position: ARPosition;
  imageName: string;
  imageTrackingActions: ARImageTrackingActions;
}

export type ARTrackingFaceEventType = "FOUND" | "UPDATED" | "LOST";

export interface ARTrackingFaceEventData extends AREventData {
  eventType: ARTrackingFaceEventType;
  /**
   * Set when eventType is either "FOUND" or "UPDATED".
   */
  properties?: {
    eyeBlinkLeft: number;
    eyeBlinkRight: number;
    jawOpen: number;
    lookAtPoint: ARPosition;
    mouthFunnel: number;
    mouthSmileLeft: number;
    mouthSmileRight: number;
    tongueOut: number;
  };
  /**
   * Set when eventType is "FOUND".
   */
  faceTrackingActions?: ARFaceTrackingActions;
}

export interface ARFaceTrackingActions {
  addModel(options: ARAddModelOptions): Promise<ARModel>;

  addText(options: ARAddTextOptions): Promise<ARModel>;
}

export interface ARImageTrackingActions {
  playVideo(nativeUrl: any /* iOS: NSURL */, loop?: boolean): void;

  stopVideoLoop(): void;

  addBox(options: ARAddBoxOptions): Promise<ARBox>;

  addModel(options: ARAddModelOptions): Promise<ARModel>;
}

export class ARDimensions {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class ARDimensions2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class ARScale extends ARDimensions {
  // same as super
}

export class ARPosition extends ARDimensions {
  // same as super
}

export class ARRotation extends ARDimensions {
  // same as super
}

export abstract class AR extends ContentView {
  static arLoadedEvent: string = "arLoaded";
  static sceneTappedEvent: string = "sceneTapped";
  static planeDetectedEvent: string = "planeDetected";
  static planeTappedEvent: string = "planeTapped";
  static trackingImageDetectedEvent: string = "trackingImageDetected";
  static trackingFaceDetectedEvent: string = "trackingFaceDetected";

  faceMaterial: string;
  planeMaterial: string;
  planeOpacity: number;
  detectPlanes: boolean;
  showStatistics: boolean;
  trackingMode: ARTrackingMode;
  trackingImagesBundle: string;

  static isSupported(): boolean {
    return false;
  }

  static isImageTrackingSupported(): boolean {
    return true;
  }

  /**
   * This one seems to need work, so not documented yet.
   */
  abstract reset(): void;

  abstract addModel(options: ARAddModelOptions): Promise<ARNode>;

  abstract addImage(options: ARAddImageOptions): Promise<ARNode>;

  abstract addBox(options: ARAddBoxOptions): Promise<ARNode>;

  abstract addSphere(options: ARAddSphereOptions): Promise<ARNode>;

  abstract addText(options: ARAddTextOptions): Promise<ARNode>;

  abstract addTube(options: ARAddTubeOptions): Promise<ARNode>;

  abstract togglePlaneDetection(on: boolean): void;

  abstract toggleStatistics(on: boolean): void;

  abstract togglePlaneVisibility(on: boolean): void;

  abstract setDebugLevel(to: ARDebugLevel): void;

  abstract grabScreenshot(): Promise<ImageSource>;

  abstract startRecordingVideo(): Promise<boolean>;

  abstract stopRecordingVideo(): Promise<string>;

  [debugLevelProperty.setNative](value?: string | ARDebugLevel) {
    if (value) {
      if (typeof value === "string") {
        this.setDebugLevel(ARDebugLevel[value]);
      } else {
        this.setDebugLevel(<ARDebugLevel>value);
      }
    }
  }

  [trackingModeProperty.setNative](value?: string | ARTrackingMode) {
    this.trackingMode = typeof value === "string" ? ARTrackingMode[value] : <ARTrackingMode>value;
  }

  [planeMaterialProperty.setNative](value: string) {
    this.planeMaterial = value;
  }

  [faceMaterialProperty.setNative](value: string) {
    this.faceMaterial = value;
  }

  [trackingImagesBundleProperty.setNative](value: string) {
    this.trackingImagesBundle = value;
  }

  [detectPlanesProperty.setNative](value: boolean) {
    this.detectPlanes = value;
  }

  [showStatisticsProperty.setNative](value: boolean) {
    this.showStatistics = value;
  }

  [planeOpacityProperty.setNative](value: number) {
    if (!isNaN(value)) {
      this.planeOpacity = +value;
    }
  }
}

showStatisticsProperty.register(AR);
detectPlanesProperty.register(AR);
debugLevelProperty.register(AR);
trackingModeProperty.register(AR);
trackingImagesBundleProperty.register(AR);
faceMaterialProperty.register(AR);
planeMaterialProperty.register(AR);
planeOpacityProperty.register(AR);
