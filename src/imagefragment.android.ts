import { Utils, ImageSource } from "@nativescript/core";

export class TNSArFragmentForImageDetection extends com.google.ar.sceneform.ux.ArFragment {

  augmentedImageDatabase: any;
  config: any;
  session: any;
  arSceneViewPromises = [];

  constructor() {
    super();
    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  getSessionConfiguration(session) {
    const config = new (<any>com.google.ar).core.Config(session);
    this.config = config;
    this.session = session;

    config.setFocusMode((<any>com.google.ar).core.Config.FocusMode.AUTO);
    config.setUpdateMode((<any>com.google.ar).core.Config.UpdateMode.LATEST_CAMERA_IMAGE);

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

  public addImagesInFolder(name: string, imageWidthMeters?: number) {
    let width = imageWidthMeters || -1;

    const context = Utils.ad.getApplicationContext();
    const assetManager = context.getAssets();
    let list = assetManager.list(name);

    if (list.length === 0) {
      name = name + '.arresourcegroup';
      list = assetManager.list(name);
    }

    let path;
    let file;

    for (let i = 0; i < list.length; i++) {
      file = list[i];
      path = name + "/" + file;

      if (path.indexOf('.imgdb') > 0) {
        this.loadImgDatabase(path);
        return;
      }
    }

    for (let i = 0; i < list.length; i++) {
      file = list[i];
      path = name + "/" + file;

      if (file.toLowerCase() === "contents.json") {
        try {
          width = this.readContentWidth(path);
        } catch (e) {
          console.error(e);
        }
      }
    }

    for (let i = 0; i < list.length; i++) {
      file = list[i];
      path = name + "/" + file;

      if (path.indexOf('.jpg') > 0 || path.indexOf('.png') > 0) {
        let assetName = path.split('/').pop().split('.').slice(0, -1).join('.');
        this.addImage(path, assetName, width);

      } else {
        let length = assetManager.list(path).length;
        if (length) {
          this.addImagesInFolder(path, width);
        }
      }
    }
  }

  private loadImgDatabase(asset: string) {
    try {
      const context = Utils.ad.getApplicationContext();
      const assetManager = context.getAssets();
      let is = assetManager.open(asset);
      this.augmentedImageDatabase = (<any>com.google.ar).core.AugmentedImageDatabase.deserialize(this.session, is);
      this.config.setAugmentedImageDatabase(this.augmentedImageDatabase);
      this.session.configure(this.config);
      return;

    } catch (e) {
      console.error(e);
    }
  }

  private readContentWidth(asset: string) {
    const context = Utils.ad.getApplicationContext();
    const assetManager = context.getAssets();

    let text = "";
    let bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(assetManager.open(asset)));

    let output; // = bufferedReader.readLine();
    while ((output = bufferedReader.readLine()) != null) {
      text += output;
    }

    const data = JSON.parse(text);

    if (data && data.properties && data.properties.width) {
      let width = data.properties.width;
      if (data.properties.unit) {
        const unit = data.properties.unit;
        // meters

        if (unit === "centimeters") {
          width = width / 100;
        }
        if (unit === "feet") {
          width = width / 3.28084;
        }
        if (unit === "inches") {
          width = width / 39.37008;
        }
        if (unit === "yards") {
          width = width / 1.09361;
        }

      }
      console.log("using asset width: " + width + "m");
      return width;


    }

    throw 'unable to find width in Contents.json';

  }

  private addBitmap(augmentedImageBitmap, name: string, imageWidthMeters: number) {
    if (augmentedImageBitmap == null) {
      console.log('error loading asset: ' + name);
      return;
    }
    let index = -1;
    if (imageWidthMeters > 0) {
      index = this.augmentedImageDatabase.addImage(name, augmentedImageBitmap, imageWidthMeters);
    } else {
      // this will take a while to detect
      index = this.augmentedImageDatabase.addImage(name, augmentedImageBitmap);
    }
    if (index === -1) {
      console.error('Failed to add asset: ' + name);
    }
    this.config.setAugmentedImageDatabase(this.augmentedImageDatabase);
    this.session.configure(this.config);
  }

  public addImage(asset: string, name?: string, imageWidthMeters?: number): void {

    android.os.AsyncTask.execute(new java.lang.Runnable({

      run: () => {

        let width = imageWidthMeters || -1;

        if (!name) {
          // remove path and ext
          name = asset.split('/').pop().split('.').slice(0, -1).join('.');
        }

        const context = Utils.ad.getApplicationContext();
        const assetManager = context.getAssets();

        if (asset.indexOf("://") >= 0) {
          ImageSource.fromUrl(asset).then((image) => {
            this.addBitmap(image.android, name, width);
          }).catch(console.error);
          return;
        }

        let image = null;

        try {
          let is = assetManager.open(asset);
          image = android.graphics.BitmapFactory.decodeStream(is);
          this.addBitmap(image, name, width);
          return;
        } catch (e) {
        }

        try {
          image = ImageSource.fromFileOrResourceSync(asset);
          this.addBitmap(image.android, name, width);
          return;
        } catch (e) {
        }

      }
    }));

  }
}
