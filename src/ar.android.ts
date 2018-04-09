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

declare const com, android: any;

const CAMERA_PERMISSION_REQUEST_CODE = 853;

// temp
let bla;
let sv;

org.nativescript.tns.arlib.TNSSurfaceRenderer.setSurfaceEventCallbackListener(
    new org.nativescript.tns.arlib.TNSSurfaceRendererListener({
      callback: obj => {
        console.log(">>>>>>> from native: " + obj);
      }
    })
);


// see https://developers.google.com/ar/reference/java
class AR extends ARBase {
  private session: any; // com.google.ar.core.Session;
  private surfaceView: any; // android.opengl.GLSurfaceView;
  private static installRequested = false;
  private renderer: any; // TODO generate new typings, then use: org.nativescript.tns.arlib.TNSSurfaceRenderer;

  constructor() {
    super();
    console.log(">> constructor");
    bla = this;

    // TODO do as much as possible in Java (for perf), but all relevant events need to be passed to JS
    this.renderer = new org.nativescript.tns.arlib.TNSSurfaceRenderer();
  }

  static isSupported(): boolean {
    return true;
    // can't use this before the ARCore lib is downloaded 🤔
    /*
    const availability = com.google.ar.core.ArCoreApk.getInstance().checkAvailability(utils.ad.getApplicationContext(), !AR.installRequested);
    if (availability.isTransient()) {
      console.log(">>> transient availability");
      // see https://developers.google.com/ar/develop/java/enable-arcore
    }
    return availability.isSupported();
    */
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
      if (this.session && this.surfaceView) {
        this.session.resume();
        this.surfaceView.onResume();
      }
    });

    application.android.on(application.AndroidApplication.activityPausedEvent, (args: any) => {
      if (this.session && this.surfaceView) {
        this.surfaceView.onPause();
        this.session.pause();
      }
    });

    try {
      const installStatus = com.google.ar.core.ArCoreApk.getInstance().requestInstall(application.android.foregroundActivity || application.android.startActivity, !AR.installRequested);
      if ("" + installStatus !== "INSTALLED") {
        console.log(">> installStatus.. not installed ");
        AR.installRequested = true;
        return;
      }
    } catch (e) {
      console.log(">>> e: " + e);
    }

    this.surfaceView = sv = new android.opengl.GLSurfaceView(this._context);
    this.nativeView.addView(this.surfaceView);

    this.session = new com.google.ar.core.Session(application.android.foregroundActivity || application.android.startActivity);
    this.renderer.setContext(this._context);
    this.renderer.setSession(this.session);
    this.renderer.setSurfaceView(this.surfaceView); // this also sets a touch listener

    this.surfaceView.setPreserveEGLContextOnPause(true);
    this.surfaceView.setEGLContextClientVersion(2);
    this.surfaceView.setEGLConfigChooser(8, 8, 8, 8, 16, 0); // Alpha used for plane blending.

    this.surfaceView.setRenderer(this.renderer);
    this.surfaceView.setRenderMode(android.opengl.GLSurfaceView.RENDERMODE_CONTINUOUSLY); // this is the default btw

    this.session.resume();
  }

  get android(): any {
    return this.nativeView;
  }

  public createNativeView(): Object {
    let nativeView = super.createNativeView(); // ContentView

    if (AR.isSupported()) {
      setTimeout(() => {
        if (this.cameraPermissionGranted()) {
          this.initAR();
        } else {
          this.requestCameraPermission().then(() => {
            this.initAR();
          });
        }
      }, 0); // TODO remove
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
