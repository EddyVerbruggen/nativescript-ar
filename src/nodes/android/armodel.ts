import * as utils from "tns-core-modules/utils/utils";
import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

declare const java: any;

export class ARModel extends ARCommonNode {
  static create(options: ARAddModelOptions, fragment): Promise<ARModel> {
    return new Promise<ARModel>((resolve, reject) => {
      com.google.ar.sceneform.rendering.ModelRenderable.builder()
          .setSource(utils.ad.getApplicationContext(), android.net.Uri.parse(options.name)) // eg. "andy.sfb"
          .build()
          .thenAccept(new java.util.function.Consumer({
            accept: renderable => {
              const transformableNode = new com.google.ar.sceneform.ux.TransformableNode(fragment.getTransformationSystem());
              transformableNode.setRenderable(renderable);
              transformableNode.select(); // optional; this can be removed
              resolve(new ARModel(options, transformableNode));
            }
            // TODO add the exception case
          }));
    });
  }
}
