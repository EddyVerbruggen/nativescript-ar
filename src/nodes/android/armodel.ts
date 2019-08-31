import * as utils from "tns-core-modules/utils/utils";
import { ARAddModelOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

declare const java: any;

export class ARModel extends ARCommonGeometryNode {
  static create(options: ARAddModelOptions, fragment): Promise<ARModel> {
    return new Promise<ARModel>((resolve, reject) => {



      let model;
      const context = utils.ad.getApplicationContext();
      if(options.name.indexOf(".glb")>0||options.name.indexOf(".gltf")>0){
          model=ARModel.getGLTFSource(options.name)
      }else{
        model= android.net.Uri.parse(options.name);
      }



      com.google.ar.sceneform.rendering.ModelRenderable.builder()
          .setSource(context, model) // eg. "andy.sfb"
          .build()
          .thenAccept(new java.util.function.Consumer({
            accept: renderable => {
              const transformableNode = ARCommonNode.createNode(options, fragment);
              transformableNode.setRenderable(renderable);
              resolve(new ARModel(options, transformableNode));
            }
          }))
          .exceptionally(new java.util.function.Function({

              apply: error => {
                 console.error("failed loading: "+options.name);
                reject(error);
              }
          }));
    });
  }



  static getGLTFSource(asset:string): any {
    const context = utils.ad.getApplicationContext();


        const type=(asset.indexOf(".glb")>0)?(<any>com.google.ar.sceneform).assets.RenderableSource.SourceType.GLB:(<any>com.google.ar.sceneform).assets.RenderableSource.SourceType.GLTF2;

        return (<any>com.google.ar.sceneform).assets.RenderableSource.builder().setSource(
            context, android.net.Uri.parse(asset), type
          ).build();
  }
}
