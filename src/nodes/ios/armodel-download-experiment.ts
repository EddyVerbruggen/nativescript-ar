import { Http, File } from "@nativescript/core";

import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARModel extends ARCommonNode {
  // note that these babies can be cloned, look for 'clone' at http://jamesonquave.com/blog/arkit-tutorial-in-swift-4-for-xcode-9-using-scenekit/
  static create(options: ARAddModelOptions): Promise<ARModel> {
    console.log(">> create ARModel");
    return new Promise((resolve, reject) => {
      ARModel.download("https://github.com/EddyVerbruggen/nativescript-ar/raw/master/demo/app/App_Resources/iOS/Models.scnassets/Car.dae")
          .then((file: string) => {
            const data = NSFileManager.defaultManager.contentsAtPath(file);

            // const sceneSource = SCNSceneSource.sceneSourceWithURLOptions(NSURL.URLWithString(file), null);
            const sceneSource = SCNSceneSource.sceneSourceWithDataOptions(data, null);
            const arr = sceneSource.identifiersOfEntriesWithClass(SCNMaterial.class());

            console.log(">> identifiers: " + arr.count);
            // console.log(">> identifiers[0]: " + arr[0]);
            // const node = sceneSource.entryWithIdentifierWithClass(arr[0], SCNNodeclass());
            // console.log(">> node: " + node);

            // let modelScene = SCNScene.sceneNamed(options.name);
            let modelScene = SCNScene.sceneWithURLOptionsError(NSURL.URLWithString(file), null);
            console.log(">> modelScene: " + modelScene);

            let nodeModel = options.childNodeName ? modelScene.rootNode.childNodeWithNameRecursively(options.childNodeName, true) : modelScene.rootNode;
            resolve(new ARModel(options, nodeModel));
          });
    });
  }

  private static download(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Http.getFile(url).then(
          (file: File) => {
            console.log(">>> downloaded to " + file.path);
            resolve(file.path);
          },
          (e: any) => reject(e)
      );
    });
  }
}
