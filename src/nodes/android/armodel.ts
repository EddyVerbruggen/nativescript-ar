import * as utils from "tns-core-modules/utils/utils";
import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

declare const java: any;

export class ARModel extends ARCommonGeometryNode {
  static create(options: ARAddModelOptions, fragment): Promise<ARModel> {
    return new Promise<ARModel>((resolve, reject) => {
      com.google.ar.sceneform.rendering.ModelRenderable.builder()
          .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse(options.name)) // eg. "andy.sfb"
          .build()
          .thenAccept(new java.util.function.Consumer({
            accept: renderable => {
              const transformableNode = ARCommonNode.createNode(options, fragment);
              transformableNode.setRenderable(renderable);
              resolve(new ARModel(options, transformableNode));
            }
          }))
          .exceptionally(new java.util.function.Function({
              apply: error => reject(error)
          }));
    });
  }
}
