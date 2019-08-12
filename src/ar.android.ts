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
  ARLoadedEventData,
  ARNode,
  ARPlaneTappedEventData
} from "./ar-common";

declare const com, android: any;

const CAMERA_PERMISSION_REQUEST_CODE = 853;

// temp
let ar: AR;
let sv;

function useAndroidX() {
  return global.androidx && global.androidx.appcompat;
}

const AppPackageName = useAndroidX() ? global.androidx.core.app : android.support.v4.app;
const ContentPackageName = useAndroidX() ? global.androidx.core.content : android.support.v4.content;



// see https://developers.google.com/ar/reference/java
class AR extends ARBase {
  private session: any; // com.google.ar.core.Session;
  private sceneView: any; // android.opengl.GLsceneView;
  private static installRequested = false;
  //private renderer: any; // TODO generate new typings, then use: org.nativescript.tns.arlib.TNSSurfaceRenderer;
  private scene: org.nativescript.tns.arlib.TNSSceneRenderer;

  constructor() {
    super();
    ar = this;
    //this.renderer = new org.nativescript.tns.arlib.TNSSurfaceRenderer();
    this.scene = new org.nativescript.tns.arlib.TNSSceneRenderer();


    this.scene.setSurfaceEventCallbackListener(new org.nativescript.tns.arlib.TNSEventListener({
      callback: function(obj) {
        console.log(">>>>>>> from native: " + obj);
      }
    }));


    this.scene.setOnSceneTappedListener(new org.nativescript.tns.arlib.TNSEventListener({
      callback: function(obj) {
        var eventData = {
          eventName: ARBase.sceneTappedEvent,
          object: ar,
          position: JSON.parse(obj)
        };
        ar.notify(eventData);
      }
    }));

    this.scene.setOnPlaneTappedListener(new org.nativescript.tns.arlib.TNSEventListener({
      callback: function(obj) {
        var eventData = {
          eventName: ARBase.planeTappedEvent,
          object: ar,
          position: JSON.parse(obj)
        };
        ar.notify(eventData);
      }
    }));


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
        ContentPackageName.ContextCompat.checkSelfPermission(utils.ad.getApplicationContext(), android.Manifest.permission.CAMERA);
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
      AppPackageName.ActivityCompat.requestPermissions(
        application.android.foregroundActivity,
        [android.Manifest.permission.CAMERA],
        CAMERA_PERMISSION_REQUEST_CODE);
    });
  }

  private initAR() {
    application.android.on(application.AndroidApplication.activityResumedEvent, (args: any) => {
      if (this.session && this.sceneView) {
        console.log(">> resuming");
        this.session.resume();
        this.sceneView.resume();
        this.scene.setupScene();
      }
    });

    application.android.on(application.AndroidApplication.activityPausedEvent, (args: any) => {
      if (this.session && this.sceneView) {
        this.sceneView.pause();
        this.session.pause();
      }
    });

    try {
      const installStatus = com.google.ar.core.ArCoreApk.getInstance().requestInstall(application.android.foregroundActivity || application.android.startActivity, !AR.installRequested);
      if ("" + installStatus !== "INSTALLED") {
        AR.installRequested = true;
        return;
      }
    } catch (e) {
      console.log(">>> e: " + e);
    }

    this.sceneView = sv = new com.google.ar.sceneform.ArSceneView(this._context);
    this.nativeView.addView(this.sceneView);

    this.scene.setArSceneView(sv);
    this.scene.setActivity(application.android.foregroundActivity);
    this.scene.setContext(this._context);


    this.session = new com.google.ar.core.Session(application.android.foregroundActivity || application.android.startActivity);

    this.session.resume();
    this.scene.setupScene();

    const eventData: ARLoadedEventData = {
      eventName: ARBase.arLoadedEvent,
      object: this,
      android: this.renderer
    };
    this.notify(eventData);
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
    console.log(">> togglePlaneVisibility: " + on);
    //this.renderer.setDrawPlanes(on);
  }

  togglePlaneDetection(on: boolean): void {
    // TODO this is just 'faking it' for now (by calling togglePlaneVisibility)
    console.log(">> togglePlaneDetection: " + on);
    this.togglePlaneVisibility(on);
  }

  toggleStatistics(on: boolean): void {
    console.log("Method not implemented: toggleStatistics");
  }

  setDebugLevel(to: ARDebugLevel): void {
    const drawPlanesAndPointClound = to === ARDebugLevel.FEATURE_POINTS || to === ARDebugLevel.PHYSICS_SHAPES;
    console.log(">> drawPlanesAndPointClound: " + drawPlanesAndPointClound);
    //this.renderer.setDrawPointCloud(drawPlanesAndPointClound);
    //this.renderer.setDrawPlanes(drawPlanesAndPointClound);
  }

  public grabScreenshot(): any {
    console.log("Method not implemented: grabScreenshot");
    return null;
  }

  public startRecordingVideo(): Promise<boolean> {
    console.log("Method not implemented: startRecordingVideo");
    return null;
  }

  public stopRecordingVideo(): Promise<string> {
    console.log("Method not implemented: stopRecordingVideo");
    return null;
  }

  reset(): void {
    console.log("Method not implemented: reset");
    return null;
  }
  _initObject(object: any  options: any) {
    var _this = this;

    var renderable = {
      node: {
        setName: object.setName.bind(object),
        getName: object.getName.bind(object),

        getLabelContainer: object.getLabelContainer.bind(object),
        setLabel: object.setLabel.bind(object),
        getLabelNode: object.getLabelNode.bind(object),

        showPopover: object.showPopover.bind(object),
        hidePopover: object.hidePopover.bind(object),

        setLocalPosition: object.setLocalPosition.bind(object),
        setCrowdCamera: object.setCrowdCamera.bind(object),
        lookAtCamera: object.lookAtCamera.bind(object),
        setVisible: object.setVisible.bind(object),
        setLocalScale: object.setLocalScale.bind(object),

        distance: object.distance.bind(object),
        remove: function() {
          _this.scene.remove(object);
        },

        setMaterials: function(m) {
          _this.scene.setMaterial(object, m[0]._argb)
        }
      },
      android: object
    }


    if (options.onTap) {
      object.addOnTapListener(new org.nativescript.tns.arlib.TNSEventListener({
        callback: function() {
          options.onTap.call(null, renderable)
        }
      }))
    }

    if (options.onLongPress) {
      object.addOnLongPressListener(new org.nativescript.tns.arlib.TNSEventListener({
        callback: function() {
          options.onLongPress.call(null, renderable)
        }
      }))
    }

    if (options.materials && options.materials.length >= 1) {
      _this.scene.setMaterial(object, options.materials[0]._argb)
    }

    if (options.position) {
      var p = options.position;
      object.setLocalPosition([p.x, p.y, p.z]);
    }

    return renderable;
  }

  addModel(options: ARAddModelOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {
      // TODO less PoC-like code ;)
      //this.renderer.addModel(options);
      resolve(null);
    });
  }

  addBox(options: ARAddBoxOptions): Promise<ARNode> {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (options.dimensions) {
        var d = options.dimensions
        var object = _this.scene.addCube(new com.google.ar.sceneform.math.Vector3(d.x, d.y, d.z));
      } else {
        var object = _this.scene.addCube();
      }


      resolve(_this._initObject(object, options));
    });
  }

  addSphere(options: ARAddSphereOptions): Promise<ARNode> {
    var _this = this;
    return new Promise(function(resolve, reject) {

      if (options.radius) {
        var object = _this.scene.addSphere(options.radius);
      } else {
        var object = _this.scene.addSphere();
      }


      resolve(_this._initObject(object, options));
    });
  }

  addText(options: ARAddTextOptions): Promise < ARNode > {
        return new Promise((resolve, reject) => {
          // TODO less PoC-like code ;)
          this.renderer.addText(options);
          resolve(null);
        });
      }

  addTube(options: ARAddTubeOptions): Promise < ARNode > {
        return new Promise((resolve, reject) => {
          reject("Method not implemented: addTube");
        });
      }
}

  exports.AR = AR;
