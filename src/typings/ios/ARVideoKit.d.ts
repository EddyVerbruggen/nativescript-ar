declare const enum ARFrameMode {

  Auto = 0,

  AspectFit = 1,

  AspectFill = 2
}

declare const enum ARInputViewOrientation {

  Portrait = 1,

  LandscapeLeft = 3,

  LandscapeRight = 4
}

declare const enum ARVideoFrameRate {

  Auto = 0,

  Fps30 = 30,

  Fps60 = 60
}

declare var ARVideoKitVersionNumber: number;

declare var ARVideoKitVersionNumberVar: number;

declare var ARVideoKitVersionString: interop.Reference<number>;

declare var ARVideoKitVersionStringVar: interop.Reference<number>;

declare const enum ARVideoOrientation {

  Auto = 0,

  AlwaysPortrait = 1,

  AlwaysLandscape = 2
}

declare class ARView extends NSObject {

  static alloc(): ARView; // inherited from NSObject

  static new(): ARView; // inherited from NSObject
}

declare class PHLivePhotoPlus {

  livePhoto: interop.Pointer | interop.Reference<number>;

  constructor();

  constructor(o: { coder: NSCoder; });

  constructor(o: { photo: any; });

  init(): this;

  initWithCoder(aDecoder: NSCoder): this;

  initWithPhoto(photo: any): this;
}

declare class RecordAR extends ARView {

  static alloc(): RecordAR; // inherited from NSObject

  static new(): RecordAR; // inherited from NSObject

  adjustGIFForSharing: boolean;

  adjustVideoForSharing: boolean;

  contentMode: ARFrameMode;

  delegate: RecordARDelegate;

  deleteCacheWhenExported: boolean;

  enableAdjustEnvironmentLighting: boolean;

  enableAudio: boolean;

  enableMixWithOthers: boolean;

  fps: ARVideoFrameRate;

  readonly micStatus: RecordARMicrophoneStatus;

  onlyRenderWhileRecording: boolean;

  renderAR: RenderARDelegate;

  requestMicPermission: RecordARMicrophonePermission;

  readonly status: RecordARStatus;

  videoOrientation: ARVideoOrientation;

  constructor(o: { ARSceneKit: ARSCNView; });

  constructor(o: { ARSpriteKit: ARSKView; });

  constructor(o: { sceneKit: SCNView; });

  exportWithImageUIImage(path: NSURL, UIImage: UIImage, finished: (p1: boolean, p2: number) => void): void;

  exportWithLive(photo: PHLivePhotoPlus, finished: (p1: boolean, p2: number) => void): void;

  exportWithVideo(path: NSURL, finished: (p1: boolean, p2: number) => void): void;

  gifForDurationExport(duration: number, export_: boolean, finished: (p1: boolean, p2: NSURL, p3: number, p4: boolean) => void): void;

  initWithARSceneKit(ARSceneKit: ARSCNView): this;

  initWithARSpriteKit(ARSpriteKit: ARSKView): this;

  initWithSceneKit(SceneKit: SCNView): this;

  livePhotoWithExport(export_: boolean, finished: (p1: boolean, p2: PHLivePhotoPlus, p3: number, p4: boolean) => void): void;

  pause(): void;

  photo(): UIImage;

  prepare(configuration: ARConfiguration): void;

  record(): void;

  recordForDuration(duration: number, finished: (p1: NSURL) => void): void;

  requestMicrophonePermission(finished: (p1: boolean) => void): void;

  rest(): void;

  stop(finished: (p1: NSURL) => void): void;

  stopAndExport(finished: (p1: NSURL, p2: number, p3: boolean) => void): void;
}

interface RecordARDelegate {

  recorderWithDidEndRecordingWith(path: NSURL, noError: boolean): void;

  recorderWithDidFailRecording(error: NSError): void;

  recorderWithDidUpdateRecording?(duration: number): void;

  recorderWithWillEnterBackground(status: RecordARStatus): void;
}

declare var RecordARDelegate: {

  prototype: RecordARDelegate;
};

declare const enum RecordARMicrophonePermission {

  Auto = 0,

  Manual = 1
}

declare const enum RecordARMicrophoneStatus {

  Unknown = 0,

  Enabled = 1,

  Disabled = 2
}

declare const enum RecordARStatus {

  Unknown = 0,

  ReadyToRecord = 1,

  Recording = 2,

  Paused = 3
}

interface RenderARDelegate {

  frameWithDidRenderWithUsing(buffer: any, time: CMTime, rawBuffer: any): void;
}

declare var RenderARDelegate: {

  prototype: RenderARDelegate;
};

declare class ViewAR extends NSObject {

  static alloc(): ViewAR; // inherited from NSObject

  static new(): ViewAR; // inherited from NSObject

  static readonly orientation: UIInterfaceOrientationMask;
}
