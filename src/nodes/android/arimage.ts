import { ARAddImageOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ImageSource, fromFileOrResource, fromUrl  } from "tns-core-modules/image-source";
import * as utils from "tns-core-modules/utils/utils";


export class ARImage extends ARCommonNode {

 

  static create(options: ARAddImageOptions, fragment): Promise<ARImage> {



      if(typeof options.image=="string"){

          //return fromFileOrResource(options.image).then(function(imageSource){
              if(options.image.indexOf("://")>=0){
                  return fromUrl(options.image).then(function(image){


                    options.image=image;
                    return ARImage.create(options, fragment);

                    });
              }

              options.image=fromFileOrResource(options.image);
              
               //return ARImage.create(options, fragment);

           //});

     }



       return new Promise<ARImage>(async (resolve, reject) => {



      

   
        const image=(<ImageSource>options.image).android;

        const context = utils.ad.getApplicationContext();
        const imageView = new android.widget.ImageView(context);
        imageView.setImageBitmap(image);

        com.google.ar.sceneform.rendering.ViewRenderable.builder()
            .setView(context, imageView)
            .build()
            .thenAccept(new (<any>java.util).function.Consumer({
                accept: renderable => {
                    console.log(">> accepted2, renderable: " + renderable);

                    /**
                     * pin bottom of view with node, this causes view to expand upward
                     * com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.BOTTOM
                     */
                    renderable.setVerticalAlignment(com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.BOTTOM);
                    const node = ARCommonNode.createNode(options, fragment);
                    node.setRenderable(renderable);
                    resolve(new ARImage(options, node));
                }
            }));

    });
  }
}