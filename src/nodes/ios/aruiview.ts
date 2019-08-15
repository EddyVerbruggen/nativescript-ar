import { ARUIViewOptions, ARDimensions2D } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

import * as views from "tns-core-modules/ui/core/view"

export class ARUIView extends ARCommonNode {

	static create(options: ARUIViewOptions): ARUIView {


		const view = options.view;
		const nativeView=view.ios||view;
		

		if(!options.dimensions){
			options.dimensions={
				x:Math.max(0.2,nativeView.bounds.size.width / 100), y:Math.max(0.2,nativeView.bounds.size.height / 100)
			}
		}

		const dimensions: ARDimensions2D = <ARDimensions2D>(typeof options.dimensions !== "number" ? options.dimensions : {
	      x: options.dimensions,
	      y: options.dimensions,
	    });

		//const stack=UIStackView.init([nativeView]);
		
		//const newController=views.ios.UILayoutViewController.initWithOwner(new WeakRef(view));
        //newController.view.addSubview(view.nativeViewProtected);
        //view.viewController = newController;
        //item.setViewController(newController, view.nativeViewProtected);
		
        const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);
        materialPlane.cornerRadius=options.chamferRadius||0;
		//materialPlane.firstMaterial.diffuse.contents = nativeView.layer;
		setTimeout(function(){
			try{

					UIGraphicsBeginImageContextWithOptions(nativeView.bounds.size, nativeView.opaque, 0.0);
				    nativeView.layer.renderInContext(UIGraphicsGetCurrentContext());
				    const img = UIGraphicsGetImageFromCurrentImageContext();
				    UIGraphicsEndImageContext();
					materialPlane.firstMaterial.diffuse.contents = img;
				
			}catch(e){
				console.error(e);
			}
		},100);
		const planeNode = SCNNode.nodeWithGeometry(materialPlane)

		return new ARUIView(options, planeNode);
	}
}
