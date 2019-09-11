import * as utils from "tns-core-modules/utils/utils";
import { fromFileOrResource, fromUrl } from "tns-core-modules/image-source";

export class TNSArFragmentForImageDetection extends com.google.ar.sceneform.ux.ArFragment {

  augmentedImageDatabase: any;
  config: any;
  arSceneViewPromises = [];

  constructor() {
    super();
    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  getSessionConfiguration(session) {
    const config = new (<any>com.google.ar).core.Config(session);
    this.config = config;

    // TODO we may need this for other fragment configs as well
    config.setFocusMode((<any>com.google.ar).core.Config.FocusMode.AUTO);

    this.setupAugmentedImageDatabase(config, session);

    this.arSceneViewPromises.forEach(resolve => {
      resolve(super.getArSceneView());
    });

    return config;
  }

  public getImageDetectionSceneView(): Promise<any> {
    return new Promise((resolve, reject) => {
      const arSceneView = super.getArSceneView();
      if (arSceneView) {
        resolve(arSceneView);
        return;
      }
      this.arSceneViewPromises.push(resolve);
    });
  }

  onCreateView(inflater, container, savedInstanceState) {
    const frameLayout = super.onCreateView(inflater, container, savedInstanceState);
    super.getPlaneDiscoveryController().hide();
    super.getPlaneDiscoveryController().setInstructionView(null);
    super.getArSceneView().getPlaneRenderer().setEnabled(false);
    return frameLayout;
  }

  setupAugmentedImageDatabase(config, session) {
    this.augmentedImageDatabase = new (<any>com.google.ar).core.AugmentedImageDatabase(session);

    config.setAugmentedImageDatabase(this.augmentedImageDatabase);
    return true;
  }

  public addImagesInFolder(name: string) {
    console.log("Add folder: " + name);

    const context = utils.ad.getApplicationContext();
    const assetManager = context.getAssets();
    let list = assetManager.list(name);

    if (list.length === 0) {
      name = name + '.arresourcegroup';
      list = assetManager.list(name);
    }

    console.log(list.length + ": " + name);
    let path;
    let file;
    for (let i = 0; i < list.length; i++) {
      file = list[i];
      path = name + "/" + file;

      if (path.indexOf('.jpg') > 0 || path.indexOf('.png') > 0) {
        this.addImage(path);
      } else {

        let length = assetManager.list(path).length;
        console.log(path + ": " + length);
        if (length) {
          this.addImagesInFolder(path);
        }
      }
    }

  }

  private addBitmap(augmentedImageBitmap, name: string) {
    console.log("augmentedImageBitmap: " + augmentedImageBitmap);
    if (augmentedImageBitmap == null) {
      console.log('error loading asset: ' + name);
      return;
    }
    const index = this.augmentedImageDatabase.addImage(name, augmentedImageBitmap);
    if (index === -1) {
      console.error('Failed to add asset: ' + name);
    }
    this.config.setAugmentedImageDatabase(this.augmentedImageDatabase);
  }

  public addImage(asset: string, name?: string): void {
    if (!name) {
      // remove path and ext
      name = asset.split('/').pop().split('.').slice(0, -1).join('.');
    }

    const context = utils.ad.getApplicationContext();
    const assetManager = context.getAssets();

    if (asset.indexOf("://") >= 0) {
      fromUrl(asset).then((image) => {
        this.addBitmap(image.android, name);
      }).catch(console.error);
      return;
    }

    let image = null;

    try {
      let is = assetManager.open(asset);
      image = android.graphics.BitmapFactory.decodeStream(is);
      this.addBitmap(image, name);
      return;
    } catch (e) {
    }

    try {
      image = fromFileOrResource(asset);
      this.addBitmap(image.android, name);
      return;
    } catch (e) {
    }
  }
}