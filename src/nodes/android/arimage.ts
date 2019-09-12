import { fromFileOrResource, fromUrl, ImageSource } from "tns-core-modules/image-source";
import * as utils from "tns-core-modules/utils/utils";
import { ARAddImageOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

const pixelsPerMeter = 500;

export class ARImage extends ARCommonNode {

  static create(options: ARAddImageOptions, fragment): Promise<ARImage> {
    if (typeof options.image === "string") {

      if (options.image.indexOf("://") >= 0) {
        return fromUrl(options.image).then(image => {
          options.image = image;
          return ARImage.create(options, fragment);
        });
      }

      options.image = fromFileOrResource(options.image);
    }

    return new Promise<ARImage>(async (resolve, reject) => {
      const image = (<ImageSource>options.image).android;

      const context = utils.ad.getApplicationContext();
      const imageView = new android.widget.ImageView(context);
      imageView.setImageBitmap(image);


      

      com.google.ar.sceneform.rendering.ViewRenderable.builder()
          .setView(context, imageView)
          .build()
          .thenAccept(new (<any>java.util).function.Consumer({
            accept: renderable => {


              if(options.dimensions){
                renderable.setSizer(new com.google.ar.sceneform.rendering.FixedWidthViewSizer(options.dimensions.x));
              }else{
                renderable.setSizer(new com.google.ar.sceneform.rendering.DpToMetersViewSizer(pixelsPerMeter));
              }

              /**
               * pin bottom of view with node, this causes view to expand upward
               * com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.BOTTOM
               */
              renderable.setVerticalAlignment(com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.CENTER);
              const node = ARCommonNode.createNode(options, fragment);
              node.setRenderable(renderable);
              resolve(new ARImage(options, node));
            }
          }))
          .exceptionally(new (<any>java.util).function.Function({
              apply: error => reject(error)
          }));
    });
  }
}