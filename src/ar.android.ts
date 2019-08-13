import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

import { AR as ARBase, ARAddOptions, ARAddBoxOptions, ARAddModelOptions, ARAddSphereOptions, ARAddTextOptions, ARAddTubeOptions, ARDebugLevel, ARLoadedEventData, ARNode, ARPlaneTappedEventData, ARTrackingMode } from "./ar-common";
import { ARBox } from "./nodes/android/arbox";
import { ARSphere } from "./nodes/android/arsphere";
import { ARTube } from "./nodes/android/artube";
import { ARModel } from "./nodes/android/armodel";

declare const com, android, global, java: any;

let _fragment;
let _origin;

const addModel = (options: ARAddModelOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    ARModel.create(options, _fragment)
        .then((model: ARModel) => {
          model.android.setParent(parentNode);
          resolve(model);
        });
  });
};

const addBox = (options: ARAddBoxOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    ARBox.create(options, _fragment)
        .then((box: ARBox) => {
          box.android.setParent(parentNode);
          resolve(box);
        });
  });
};

const addSphere = (options: ARAddSphereOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    ARSphere.create(options, _fragment)
        .then((sphere: ARSphere) => {
          sphere.android.setParent(parentNode);
          resolve(sphere);
        });
  });
};
const addTube = (options: ARAddTubeOptions, parentNode: com.google.ar.sceneform.Node): Promise<ARModel> => {
  return new Promise((resolve, reject) => {
    ARTube.create(options, _fragment)
      .then((tube: ARTube) => {
        tube.android.setParent(parentNode);
        resolve(tube);
      });
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
}

export class AR extends ARBase {
  private faceNodeMap = new Map();

  initNativeView(): void {
    super.initNativeView();
    this.initAR();
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
        }));

      // Load the face mesh texture.
      com.google.ar.sceneform.rendering.Texture.builder()
        .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse("fox_face_mesh_texture.png"))
        .build()
        .thenAccept(new java.util.function.Consumer({
          accept: texture => foxFaceMeshTexture = texture
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
      _fragment = new com.google.ar.sceneform.ux.ArFragment();
      if (this.trackingMode === ARTrackingMode.IMAGE) {
      }
    }

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
    this.fireArLoadedEvent(100);


    // TODO below is a bunch of experiments that need to be transformed in decent code (but they mostly work)

    // const context = application.android.context;
    // const resourcestmp = context.getResources();
    // const ident = resourcestmp.getIdentifier("andy", "raw", context.getPackageName());

    /* this model-loading approach also works
    let earthRenderable: com.google.ar.sceneform.rendering.ModelRenderable;
    const earthStage =
        com.google.ar.sceneform.rendering.ModelRenderable.builder()
            .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse("Earth.sfb"))
            .build();

    java.util.concurrent.CompletableFuture
        .allOf([earthStage])
        .handle(new java.util.function.BiFunction({
          apply: (notUsed, throwable) => {
            console.log(">> handled! throwable: " + throwable);
            try {
              earthRenderable = earthStage.get();
            } catch (e) {
              console.log(e);
            }
          }
        }));
    */

    /* this works, for rendering a custom UI
    setTimeout(() => {
      const l1 = this.parent.getViewById("l1").android;
      l1.getParent().removeView(l1);

      const customUI =
          com.google.ar.sceneform.rendering.ViewRenderable.builder()
              .setView(utils.ad.getApplicationContext(), l1)
              .build()
              .thenAccept(new java.util.function.Consumer({
                accept: renderable => {
                  console.log(">> accepted2, renderable: " + renderable);
                  customUIRenderable = renderable;
                }
              }));
    }, 2000);
    */

    // custom view experiment
    // console.log(this.parent.getViewById("l1"));
    // const page = topmost().currentPage;
    // const forView = <View>page.getViewById("l1");
    // console.log(forView);

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


  addModel(options: ARAddModelOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {

      addModel(options, resolveParentNode(options))
          .then(model => resolve(model));
    });
  }

  addBox(options: ARAddBoxOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {

      addBox(options, resolveParentNode(options))
          .then(box => resolve(box));
    });
  }

  addSphere(options: ARAddSphereOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {

      addSphere(options, resolveParentNode(options))
          .then(sphere => resolve(sphere));
    });
  }

  addText(options: ARAddTextOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {
      reject("Method not implemented: addText");
    });
  }

  addTube(options: ARAddTubeOptions): Promise<ARNode> {
    return new Promise((resolve, reject) => {

      return addTube(options, resolveParentNode(options))
        .then(tube => resolve(tube));
    });
  }
}
