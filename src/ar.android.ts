import * as utils from "tns-core-modules/utils/utils";
import * as application from "tns-core-modules/application";

import {
  AR as ARBase,
  ARAddBoxOptions,
  ARAddModelOptions,
  ARAddSphereOptions,
  ARAddTextOptions,
  ARAddTubeOptions,
  ARDebugLevel,
  ARNode
} from "./ar-common";

declare const com, android, org: any;

const CAMERA_PERMISSION_REQUEST_CODE = 853;

// temp
let bla;
let sv;

// TODO do as much as possible in Java (for perf), but all relevant events need to be passed to JS
const renderer = new org.nativescript.tns.arlib.TNSSurfaceRenderer();
org.nativescript.tns.arlib.TNSSurfaceRenderer.setSurfaceEventCallbackListener(
    new org.nativescript.tns.arlib.TNSSurfaceRendererListener({
      callback: obj => {
        console.log(">>>>>>> from native");
      }
    })
);

// see https://developers.google.com/ar/reference/java
// TODO generate typings based on .aar
class AR extends ARBase {
  private _android: any;
  private config: any; // com.google.ar.core.Config
  private session: any; // com.google.ar.core.Session
  private surfaceView: any; // android.opengl.GLSurfaceView;

  constructor() {
    super();
    console.log(">> constructor");
    bla = this;
  }

  static isSupported(): boolean {
    const arSession = new com.google.ar.core.Session(application.android.foregroundActivity);
    return arSession.isSupported(com.google.ar.core.Config.createDefaultConfig());
  }

  private cameraPermissionGranted(): boolean {
    let hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
    if (!hasPermission) {
      hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ===
          android.support.v4.content.ContextCompat.checkSelfPermission(utils.ad.getApplicationContext(), android.Manifest.permission.CAMERA);
    }
    return hasPermission;
  }

  private requestCameraPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // grab the permission dialog result
      // TODO check for requestcode CAMERA_PERMISSION_REQUEST_CODE
      application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, (args: any) => {
        for (let i = 0; i < args.permissions.length; i++) {
          if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
            reject("Permission denied");
            return;
          }
        }
        resolve();
      });

      // invoke the permission dialog
      android.support.v4.app.ActivityCompat.requestPermissions(
          application.android.foregroundActivity,
          [android.Manifest.permission.CAMERA],
          CAMERA_PERMISSION_REQUEST_CODE);
    });
  }

  private initAR() {
    console.log(">> initAR");

    application.android.on(application.AndroidApplication.activityResumedEvent, (args: any) => {
      this.session.resume(this.config);
      this.surfaceView.onResume();
    });

    application.android.on(application.AndroidApplication.activityPausedEvent, (args: any) => {
      this.surfaceView.onPause();
      this.session.pause();
    });

    this.config = com.google.ar.core.Config.createDefaultConfig();
    this.surfaceView = sv = new android.opengl.GLSurfaceView(this._context);
    this.nativeView.addView(this.surfaceView);
    this.session = new com.google.ar.core.Session(application.android.foregroundActivity);
    renderer.setContext(this._context);
    renderer.setSession(this.session);

    // TODO set up tap listener

    this.surfaceView.setPreserveEGLContextOnPause(true);
    this.surfaceView.setEGLContextClientVersion(2);
    this.surfaceView.setEGLConfigChooser(8, 8, 8, 8, 16, 0); // Alpha used for plane blending.


    // check https://github.com/kazemihabib/nativescript-vlc-player/blob/master/src/app/components/vlc.component.ts#L501
    // and https://developer.android.com/reference/android/opengl/GLSurfaceView.html#setRenderer(android.opengl.GLSurfaceView.Renderer)
    this.surfaceView.setRenderer(renderer);
    this.surfaceView.setRenderMode(android.opengl.GLSurfaceView.RENDERMODE_CONTINUOUSLY);
  }

  get android(): any {
    return this.nativeView;
  }

  public createNativeView(): Object {
    let nativeView = super.createNativeView(); // ContentLayout

    if (AR.isSupported()) {
      setTimeout(() => {
        if (this.cameraPermissionGranted()) {
          this.initAR();
        } else {
          this.requestCameraPermission().then(() => {
            this.initAR();
          });
        }
      }, 500); // TODO remove
    }

    return nativeView;
  }

  public initNativeView(): void {
    console.log(">> initNativeView");
    super.initNativeView();
  }

  togglePlaneVisibility(on: boolean): void {
    throw new Error("Method not implemented: togglePlaneVisibility");
  }

  togglePlaneDetection(on: boolean): void {
    throw new Error("Method not implemented: togglePlaneDetection");
  }

  toggleStatistics(on: boolean): void {
    throw new Error("Method not implemented: toggleStatistics");
  }

  setDebugLevel(to: ARDebugLevel): void {
    // surfaceview has a method 'setDebugFlags'
    console.log("TODO implement setDebugLevel");
  }

  reset(): void {
    throw new Error("Method not implemented: reset");
  }

  addModel(options: ARAddModelOptions): Promise<ARNode> {
    throw new Error("Method not implemented: addModel");
  }

  addBox(options: ARAddBoxOptions): Promise<ARNode> {
    throw new Error("Method not implemented: addBox");
  }

  addSphere(options: ARAddSphereOptions): Promise<ARNode> {
    throw new Error("Method not implemented: addSphere");
  }

  addText(options: ARAddTextOptions): Promise<ARNode> {
    throw new Error("Method not implemented: addText");
  }

  addTube(options: ARAddTubeOptions): Promise<ARNode> {
    throw new Error("Method not implemented: addTube");
  }
}

exports.AR = AR;
