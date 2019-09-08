import * as utils from "tns-core-modules/utils/utils";

export class TNSArFragmentForImageDetection extends com.google.ar.sceneform.ux.ArFragment {

  augmentedImageDatabase: any;
  arSceneViewPrimises = [];

  constructor() {
    super();
    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  getSessionConfiguration(session) {
    const config = new (<any>com.google.ar).core.Config(session);
    this.setupAugmentedImageDatabase(config, session);
    return config;
  }

  public getImageDetectionSceneView(): Promise<any> {
    return new Promise((resolve, reject) => {
      const arSceneView = super.getArSceneView();
      if (arSceneView) {
        resolve(arSceneView);
        return;
      }
      this.arSceneViewPrimises.push(resolve);
    });
  }

  onCreateView(inflater, container, savedInstanceState) {
    const frameLayout = super.onCreateView(inflater, container, savedInstanceState);
    super.getPlaneDiscoveryController().hide();
    super.getPlaneDiscoveryController().setInstructionView(null);
    super.getArSceneView().getPlaneRenderer().setEnabled(false);
    this.arSceneViewPrimises.forEach(resolve => {
      resolve(super.getArSceneView());
    });
    return frameLayout;
  }

  setupAugmentedImageDatabase(config, session) {
    this.augmentedImageDatabase = new (<any>com.google.ar).core.AugmentedImageDatabase(session);
    // TODO get rid of this PoC code ;)
    this.addImage("tnsgranite-diffuse.png");

    config.setAugmentedImageDatabase(this.augmentedImageDatabase);
    return true;
  }

  public addImage(name: string): void {
    const context = utils.ad.getApplicationContext();
    const assetManager = context.getAssets();
    let augmentedImageBitmap = null;

    try {
      let is = assetManager.open(name);
      augmentedImageBitmap = android.graphics.BitmapFactory.decodeStream(is);
    } catch (e) {
      console.log(e);
    }

    if (augmentedImageBitmap == null) {
      return;
    }

    this.augmentedImageDatabase.addImage(name, augmentedImageBitmap);
  }
}