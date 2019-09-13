import * as application from "tns-core-modules/application";
import { ImageSource } from "tns-core-modules/image-source";
import * as utils from "tns-core-modules/utils/utils";
import { AR as ARBase, ARAddBoxOptions, ARAddImageOptions, ARAddModelOptions, ARAddOptions, ARAddPlaneOptions, ARAddSphereOptions, ARAddTextOptions, ARAddTubeOptions, ARAddVideoOptions, ARCommonNode, ARDebugLevel, ARImageTrackingActions, ARImageTrackingOptions, ARLoadedEventData, ARPlaneTappedEventData, ARPosition, ARRotation, ARTrackingImageDetectedEventData, ARTrackingMode, ARUIViewOptions, ARVideoNode } from "./ar-common";
import { TNSArFragmentForImageDetection } from "./imagefragment.android";
import { ARBox } from "./nodes/android/arbox";
import { ARGroup } from "./nodes/android/argroup";
import { ARImage } from "./nodes/android/arimage";
import { ARModel } from "./nodes/android/armodel";
import { ARPlane } from "./nodes/android/arplane";
import { ARSphere } from "./nodes/android/arsphere";
import { ARTube } from "./nodes/android/artube";
import { ARUIView } from "./nodes/android/aruiview";
import { ARVideo } from "./nodes/android/arvideo";
import { FragmentScreenGrab } from "./screengrab-android";
import { VideoRecorder } from "./videorecorder.android";

declare const com, android, global, java: any;

let _fragment, _origin, _videoRecorder;

const AppPackageName = useAndroidX() ? global.androidx.core.app : android.support.v4.app;
const ContentPackageName = useAndroidX() ? global.androidx.core.content : android.support.v4.content;

function useAndroidX() {
  return global.androidx && global.androidx.appcompat;
}

const addNode = (options: ARAddOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARCommonNode> => {
  return new Promise((resolve, reject) => {
    ARGroup.create(options, _fragment)
        .then((group: ARGroup) => {
          group.android.setParent(parentNode);
          resolve(group);
        }).catch(reject);
  });
};

const addVideo = (options: ARAddVideoOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARVideoNode> => {
  return new Promise<ARVideoNode>((resolve, reject) => {
    ARVideo.create(options, _fragment)
        .then((video: ARVideoNode) => {
          video.android.setParent(parentNode);
          resolve(video);
        }).catch(reject);
  });
};

const addImage = (options: ARAddImageOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARImage> => {
  return new Promise((resolve, reject) => {
    ARImage.create(options, _fragment)
        .then((image: ARImage) => {
          image.android.setParent(parentNode);
          resolve(image);
        }).catch(reject);
  });
};

const addPlane = (options: ARAddPlaneOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARPlane> => {
  return new Promise((resolve, reject) => {
    ARPlane.create(options, _fragment)
        .then((plane: ARPlane) => {
          plane.android.setParent(parentNode);
          resolve(plane);
        }).catch(reject);
  });
};

const addModel = (options: ARAddModelOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    ARModel.create(options, _fragment)
        .then((model: ARModel) => {
          model.android.setParent(parentNode);
          resolve(model);
        }).catch(reject);
  });
};

const addBox = (options: ARAddBoxOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARBox> => {
  return new Promise((resolve, reject) => {
    ARBox.create(options, _fragment)
        .then((box: ARBox) => {
          box.android.setParent(parentNode);
          // TODO testing this: https://github.com/EddyVerbruggen/nativescript-ar/issues/41#issuecomment-527308848
          //  .. but this code assumes the parent is the 'inner' box here, which is probably correct in most cases.
          //  .. Also see addSphere
          if (parentNode && parentNode.getRenderable()) {
            parentNode.getRenderable().setRenderPriority(Math.max(0, box.android.getRenderable().getRenderPriority() - 1));
          }
          resolve(box);
        }).catch(reject);
  });
};

const addSphere = (options: ARAddSphereOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARSphere> => {
  return new Promise((resolve, reject) => {
    ARSphere.create(options, _fragment)
        .then((sphere: ARSphere) => {
          sphere.android.setParent(parentNode);
          // TODO testing this: https://github.com/EddyVerbruggen/nativescript-ar/issues/41#issuecomment-527308848
          //  .. but this code assumes the parent is the 'inner' sphere here, which is probably correct in most cases.
          //  .. Also see addBox
          if (parentNode && parentNode.getRenderable()) {
            parentNode.getRenderable().setRenderPriority(Math.max(0, sphere.android.getRenderable().getRenderPriority() - 1));
          }
          resolve(sphere);
        }).catch(reject);
  });
};

const addUIView = (options: ARUIViewOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARUIView> => {
  return new Promise((resolve, reject) => {
    ARUIView.create(options, _fragment)
        .then((view: ARUIView) => {
          view.android.setParent(parentNode);
          resolve(view);
        }).catch(reject);
  });
};

const addTube = (options: ARAddTubeOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARTube> => {
  return new Promise((resolve, reject) => {
    ARTube.create(options, _fragment)
        .then((tube: ARTube) => {
          tube.android.setParent(parentNode);
          resolve(tube);
        }).catch(reject);
  });
};

const resolveParentNode = (options: ARAddOptions) => {
  if (options.parentNode && options.parentNode.android) {
    return options.parentNode.android;
  }
  return getOriginAnchor();
};

const getOriginAnchor = () => {
  if (!_origin) {
    const session = _fragment.getArSceneView().getSession();
    const pose = com.google.ar.core.Pose.IDENTITY;
    const anchor = session.createAnchor(pose);
    const anchorNode = new com.google.ar.sceneform.AnchorNode(anchor);
    anchorNode.setParent(_fragment.getArSceneView().getScene());
    _origin = anchorNode;
  }
  return _origin;
};


class TNSArFragmentForFaceDetection extends com.google.ar.sceneform.ux.ArFragment {

  constructor() {
    super();
    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  getSessionConfiguration(session) {
    const config = new com.google.ar.core.Config(session);
    config.setAugmentedFaceMode(com.google.ar.core.Config.AugmentedFaceMode.MESH3D);
    return config;
  }

  getSessionFeatures() {
    return java.util.EnumSet.of(com.google.ar.core.Session.Feature.FRONT_CAMERA);
  }

  onCreateView(inflater, container, savedInstanceState) {
    const frameLayout = super.onCreateView(inflater, container, savedInstanceState);
    super.getPlaneDiscoveryController().hide();
    super.getPlaneDiscoveryController().setInstructionView(null);
    return frameLayout;
  }

  // TODO for recording support we could consider passing it here
  // getAdditionalPermissions(): native.Array<string>;
}

class ARImageTrackingActionsImpl implements ARImageTrackingActions {

  anchor: any; // com.google.ar.core.AugmentedImage;
  planeNode: com.google.ar.sceneform.Node;
  video: ARVideoNode;

  constructor(anchor, planeNode) {
    this.anchor = anchor;
    this.planeNode = planeNode;
    this.video;
  }

  playVideo(url: string, loop?: boolean): void {
    addVideo({
      dimensions: {
        x: this.anchor.getExtentX(),
        y: this.anchor.getExtentZ()
      },
      position: {x: 0, y: 0, z: 0},
      scale: 1 / this.planeNode.getLocalScale().x,
      video: url,
      loop: loop
    }, this.planeNode).then(video => this.video = video).catch(console.error);
  }

  stopVideoLoop(): void {
    if (this.video) {
      this.video.pause();
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
    return addUIView(options, this.planeNode);
  }
}

export class AR extends ARBase {
  private faceNodeMap = new Map();

  initNativeView(): void {
    super.initNativeView();
    this.initAR();
  }

  public getCameraPosition(): ARPosition {
    const p = Array.create("float", 3);
    _fragment.getArSceneView().getArFrame().getCamera().getPose().getTranslation(p, 0);
    return {x: p[0], y: p[1], z: p[2]};
  }


  public getCameraRotation(): ARRotation {

    // modified from:
    // https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles#Source_Code_2
    // note that the xyz describes a different axis definition than arcore
    const q1 = Array.create("float", 4);
    _fragment.getArSceneView().getArFrame().getCamera().getPose().getRotationQuaternion(q1, 0);

    // arcore axis is mapped here, but could be done by replacing q.x with q.z, q.y with q.x, and q.z with q.y below
    const q = {
      x: q1[2],
      y: q1[0],
      z: q1[1],
      w: q1[3]
    };

    const rot = {
      z: 0,
      x: 0,
      y: 0
    };

    // roll (x-axis rotation)
    const sinr_cosp = +2.0 * (q.w * q.x + q.y * q.z);
    const cosr_cosp = +1.0 - 2.0 * (q.x * q.x + q.y * q.y);
    rot.z = -(Math.atan2(sinr_cosp, cosr_cosp) + Math.PI / 2);

    // pitch (y-axis rotation)
    const sinp = +2.0 * (q.w * q.y - q.z * q.x);
    if (Math.abs(sinp) >= 1) {
      rot.x = -(sinp / Math.abs(sinp)) * (Math.PI / 2); // use 90 degrees if out of range
    } else {
      rot.x = -Math.asin(sinp);
    }

    // yaw (z-axis rotation)
    const siny_cosp = +2.0 * (q.w * q.z + q.x * q.y);
    const cosy_cosp = +1.0 - 2.0 * (q.y * q.y + q.z * q.z);
    rot.y = Math.atan2(siny_cosp, cosy_cosp) + Math.PI;

    const toDeg = (rad) => {
      return ((rad * (180.0 / Math.PI)) + 360) % 360;
    };

    return {x: toDeg(rot.x), y: toDeg(rot.y), z: toDeg(rot.z)};
  }

  private initAR() {
    this.nativeView.setId(android.view.View.generateViewId());

    if (this.trackingMode === ARTrackingMode.FACE) {
      _fragment = new TNSArFragmentForFaceDetection();

      // TODO for now this is a fixed face mesh, but of course we want to pass this stuff in
      let foxFaceRenderable: com.google.ar.sceneform.rendering.ModelRenderable;
      let foxFaceMeshTexture: com.google.ar.sceneform.rendering.Texture;

      com.google.ar.sceneform.rendering.ModelRenderable.builder()
          .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse("fox_face.sfb"))
          .build()
          .thenAccept(new java.util.function.Consumer({
            accept: renderable => {
              foxFaceRenderable = renderable;
              foxFaceRenderable.setShadowCaster(false);
              foxFaceRenderable.setShadowReceiver(false);
            }
          }))
          .exceptionally(new java.util.function.Function({
            apply: error => console.error(error)
          }));


      // Load the face mesh texture.
      com.google.ar.sceneform.rendering.Texture.builder()
          .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse("fox_face_mesh_texture.png"))
          .build()
          .thenAccept(new java.util.function.Consumer({
            accept: texture => foxFaceMeshTexture = texture
          }))
          .exceptionally(new java.util.function.Function({
            apply: error => console.error(error)
          }));

      setTimeout(() => {
        const sceneView = _fragment.getArSceneView();
        // This is important to make sure that the camera stream renders first so that the face mesh occlusion works correctly.
        sceneView.setCameraStreamRenderPriority(com.google.ar.sceneform.rendering.Renderable.RENDER_PRIORITY_FIRST);
        const scene = sceneView.getScene();

        scene.addOnUpdateListener(new com.google.ar.sceneform.Scene.OnUpdateListener({
          onUpdate: frameTime => {
            if (!foxFaceRenderable || !foxFaceMeshTexture) {
              return;
            }

            const faceList = sceneView.getSession().getAllTrackables(com.google.ar.core.AugmentedFace.class);

            // create AugmentedFaceNodes for any new faces
            for (let i = 0; i < faceList.size(); i++) {
              const face = faceList.get(i);
              if (!this.faceNodeMap.has(face)) {
                const faceNode = new com.google.ar.sceneform.ux.AugmentedFaceNode(face);
                faceNode.setParent(scene);
                faceNode.setFaceRegionsRenderable(foxFaceRenderable);
                // note that (at least in this case) the texture doesn't seem to make a difference
                faceNode.setFaceMeshTexture(foxFaceMeshTexture);
                this.faceNodeMap.set(face, faceNode);
              }
            }


            // Remove any AugmentedFaceNodes associated with an AugmentedFace that stopped tracking.
            this.faceNodeMap.forEach((node: any, face: any) => {
              if (face.getTrackingState() === com.google.ar.core.TrackingState.STOPPED) {
                node.setParent(null);
                this.faceNodeMap.delete(node);
              }
            });
          }
        }));
      }, 0);

    } else {

      if (this.trackingMode === ARTrackingMode.IMAGE) {
        _fragment = new TNSArFragmentForImageDetection();

        _fragment.getImageDetectionSceneView().then(sceneView => {

          if (this.trackingImagesBundle) {
            _fragment.addImagesInFolder(this.trackingImagesBundle);
          }

          const scene = sceneView.getScene();
          const augmentedImages = [];

          scene.addOnUpdateListener(new com.google.ar.sceneform.Scene.OnUpdateListener({
            onUpdate: frameTime => {
              const frame = sceneView.getArFrame();

              // If there is no frame, just return.
              if (frame == null) {
                return;
              }

              const updatedAugmentedImages = frame.getUpdatedTrackables(com.google.ar.core.AugmentedImage.class).toArray();

              for (let i = 0; i < updatedAugmentedImages.length; i++) {
                let augmentedImage = updatedAugmentedImages[i];

                const state = augmentedImage.getTrackingState();

                if (state === com.google.ar.core.TrackingState.PAUSED) {
                  // When an image is in PAUSED state, but the camera is not PAUSED, it has been detected but not yet tracked.

                } else if (state === com.google.ar.core.TrackingState.TRACKING) {
                  // Create a new anchor for newly found images.
                  if (augmentedImages.indexOf(augmentedImage.getName()) === -1) {
                    const anchor = new com.google.ar.sceneform.AnchorNode(augmentedImage.createAnchor(augmentedImage.getCenterPose()));

                    augmentedImages.push(augmentedImage.getName());
                    scene.addChild(anchor);

                    const planeNode = new com.google.ar.sceneform.Node();
                    anchor.addChild(planeNode);

                    planeNode.setLocalRotation(new (<any>com.google.ar.sceneform).math.Quaternion(
                        new (<any>com.google.ar.sceneform).math.Vector3(
                            -90, // sceneform orients tracked images in x-z plane
                            0,
                            0
                        )
                    ));


                    // TODO calculate actual proper scale factor. for ios, tracking images have a defined width - I
                    //  believe the scale factor is measured-width/defined-width in ios...
                    const definedWidth = 0.05;
                    const measuredWidth = augmentedImage.getExtentX();
                    const scale = measuredWidth / definedWidth;
                    console.log("scale: " + scale);
                    planeNode.setLocalScale(new (<any>com.google.ar.sceneform).math.Vector3(scale, scale, scale));

                    const eventData: ARTrackingImageDetectedEventData = {
                      eventName: ARBase.trackingImageDetectedEvent,
                      object: this,
                      size: undefined, // TODO
                      position: {
                        x: augmentedImage.getCenterPose().tx(),
                        y: augmentedImage.getCenterPose().ty(),
                        z: augmentedImage.getCenterPose().tz()
                      },
                      imageName: augmentedImage.getName(),
                      imageTrackingActions: new ARImageTrackingActionsImpl(augmentedImage, planeNode)
                    };
                    this.notify(eventData);
                  }

                } else if (state === com.google.ar.core.TrackingState.STOPPED) {
                  const i = augmentedImages.indexOf(augmentedImage.getName());
                  augmentedImages.splice(i, 1);
                }
              }
            }
          }));
        }).catch(console.log);

      } else {
        _fragment = new com.google.ar.sceneform.ux.ArFragment();
      }
    }

    const onCamPermissionGranted = () => {
      const supportFragmentManager = (application.android.foregroundActivity || application.android.startActivity).getSupportFragmentManager();
      supportFragmentManager.beginTransaction().add(this.nativeView.getId(), _fragment).commit();

      // no need for these - the fragment will manage session suspending etc.. unless we get crashes which are not caused by livesync..
      // application.android.on(application.AndroidApplication.activityResumedEvent, (args: any) => {
      // });
      // application.android.on(application.AndroidApplication.activityPausedEvent, (args: any) => {
      // });

      _fragment.setOnTapArPlaneListener(new com.google.ar.sceneform.ux.BaseArFragment.OnTapArPlaneListener({
        onTapPlane: (hitResult, plane, motionEvent) => {
          const eventData: ARPlaneTappedEventData = {
            eventName: ARBase.planeTappedEvent,
            object: this,
            position: {
              x: hitResult.getHitPose().tx(),
              y: hitResult.getHitPose().ty(),
              z: hitResult.getHitPose().tz()
            }
          };
          this.notify(eventData);
        }
      }));

      // don't fire the event now, because that's too early.. but there doesn't seem to be an event we can listen to, so using our own impl here
      this.fireArLoadedEvent(1000);
    };

    const cameraPermission = android.Manifest.permission.CAMERA;
    if (this.wasPermissionGranted(cameraPermission)) {
      setTimeout(() => onCamPermissionGranted(), 0);
    } else {
      this._requestPermission(cameraPermission, () => onCamPermissionGranted());
    }
  }

  private fireArLoadedEvent(attemptsLeft: number): void {
    if (attemptsLeft-- <= 0) {
      return;
    }

    setTimeout(() => {
      if (_fragment.getArSceneView() &&
          _fragment.getArSceneView().getSession() &&
          _fragment.getArSceneView().getArFrame() &&
          _fragment.getArSceneView().getArFrame().getCamera() &&
          _fragment.getArSceneView().getArFrame().getCamera().getTrackingState() === com.google.ar.core.TrackingState.TRACKING) {

        const eventData: ARLoadedEventData = {
          eventName: ARBase.arLoadedEvent,
          object: this,
          android: _fragment
        };
        this.notify(eventData);
      } else {
        this.fireArLoadedEvent(attemptsLeft);
      }
    }, 300);
  }


  // TODO see sceneform example
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


  getFragment() {
    return _fragment;
  }

  get android(): any {
    return this.nativeView;
  }

  togglePlaneVisibility(on: boolean): void {
    console.log(">> togglePlaneVisibility: " + on);
    // this.renderer.setDrawPlanes(on); // TODO
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
    // const drawPlanesAndPointClound = to === ARDebugLevel.FEATURE_POINTS || to === ARDebugLevel.PHYSICS_SHAPES;
    // console.log(">> drawPlanesAndPointClound: " + drawPlanesAndPointClound);
    // this.renderer.setDrawPointCloud(drawPlanesAndPointClound);
    // this.renderer.setDrawPlanes(drawPlanesAndPointClound);
  }

  public grabScreenshot(): Promise<ImageSource> {
    return (new FragmentScreenGrab()).grabScreenshot(_fragment);
  }

  public startRecordingVideo(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!_videoRecorder) {
        _videoRecorder = VideoRecorder.fromFragment(_fragment);
      } else if (_videoRecorder.isRecording()) {
        reject("already recording");
        return;
      }

      const record = () => {
        _videoRecorder.setVideoQualityAuto();
        _videoRecorder.startRecordingVideo();
      };

      const permission = android.Manifest.permission.WRITE_EXTERNAL_STORAGE;
      if (!this.wasPermissionGranted(permission)) {
        // note that this will reset the AR experience, so perhaps better to request this permission up front instead
        this._requestPermission(permission, record, reject);
        return;
      }

      record();
      resolve(true);
    });
  }

  public stopRecordingVideo(): Promise<string> {
    return new Promise((resolve, reject) => {

      if (!(_videoRecorder && _videoRecorder.isRecording())) {
        reject("not recording");
      }

      _videoRecorder.stopRecordingVideo();
      resolve(_videoRecorder.getVideoPath());

    });
  }

  reset(): void {
    console.log("Method not implemented: reset");
    return null;
  }

  addNode(options: ARAddOptions): Promise<ARCommonNode> {
    return addNode(options, resolveParentNode(options));
  }

  addVideo(options: ARAddVideoOptions): Promise<ARVideoNode> {
    return addVideo(options, resolveParentNode(options));
  }

  addImage(options: ARAddImageOptions): Promise<ARCommonNode> {
    return addImage(options, resolveParentNode(options));
  }

  addModel(options: ARAddModelOptions): Promise<ARCommonNode> {
    return addModel(options, resolveParentNode(options));
  }

  addPlane(options: ARAddPlaneOptions): Promise<ARCommonNode> {
    return addPlane(options, resolveParentNode(options));
  }

  addBox(options: ARAddBoxOptions): Promise<ARCommonNode> {
    return addBox(options, resolveParentNode(options));
  }

  addSphere(options: ARAddSphereOptions): Promise<ARCommonNode> {
    return addSphere(options, resolveParentNode(options));
  }

  addText(options: ARAddTextOptions): Promise<ARCommonNode> {
    return new Promise((resolve, reject) => {
      reject("Method not implemented: addText");
    });
  }

  addTube(options: ARAddTubeOptions): Promise<ARCommonNode> {
    return addTube(options, resolveParentNode(options));
  }

  addUIView(options: ARUIViewOptions): Promise<ARCommonNode> {
    return addUIView(options, resolveParentNode(options));
  }

  trackImage(options: ARImageTrackingOptions): void {
    if (!(_fragment instanceof TNSArFragmentForImageDetection)) {
      throw "Only supported in trackingMode: IMAGE";
    }

    _fragment.addImage(options.image);
    if (!options.onDetectedImage) {
      return;
    }

    this.on(ARBase.trackingImageDetectedEvent, (args: ARTrackingImageDetectedEventData) => {
      if (args.imageName === options.image.split('/').pop().split('.').slice(0, -1).join('.')) {
        options.onDetectedImage(args);
      }
    });
  }

  private wasPermissionGranted(permission: string): boolean {
    let hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
    if (!hasPermission) {
      hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ===
          ContentPackageName.ContextCompat.checkSelfPermission(
              utils.ad.getApplicationContext(),
              permission);
    }
    return hasPermission;
  }

  private _requestPermission(permission: string, onPermissionGranted: Function, reject?): void {
    console.log(">> requesting permission");
    const permissionRequestCode = 678; // random-ish id

    const onPermissionEvent = (args: any) => {
      if (args.requestCode === permissionRequestCode) {
        for (let i = 0; i < args.permissions.length; i++) {
          if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
            application.off(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionEvent);
            reject && reject("Please allow access to external storage and try again.");
            return;
          }
        }
        application.off(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionEvent);
        onPermissionGranted();
      }
    };

    application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionEvent);

    AppPackageName.ActivityCompat.requestPermissions(
        application.android.foregroundActivity || application.android.startActivity,
        [permission],
        permissionRequestCode
    );
  }

}
