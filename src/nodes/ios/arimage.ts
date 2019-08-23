import { ARAddImageOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ImageSource, fromFileOrResource, fromUrl } from "tns-core-modules/image-source";

let pixelsPerMeter=500;

export class ARImage extends ARCommonNode {
 
  static create(options: ARAddImageOptions) : Promise<ARImage> {



  	 if(typeof options.image=="string"){

         
        if(options.image.indexOf("://")>=0){
	        return fromUrl(options.image).then(function(image){


	        	options.image=image;
	        	return ARImage.create(options);

	        });
	
			    }

			        options.image=fromFileOrResource(options.image);
			 

		 }








  	return new Promise<ARImage>(async (resolve, reject) => {  




	      const image=(<ImageSource>options.image).ios;


  		  if(!options.dimensions){
  		  	options.dimensions={
  		  		x:image.size.width/pixelsPerMeter,
  		  		y:image.size.height/pixelsPerMeter
  		  	}
  		  }

	      const dimensions=options.dimensions;

	      const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);

	      materialPlane.firstMaterial.diffuse.contents = image;	
	      materialPlane.firstMaterial.doubleSided=true;

	      resolve(new ARImage(options, SCNNode.nodeWithGeometry(materialPlane)));

  		});
  }
}
