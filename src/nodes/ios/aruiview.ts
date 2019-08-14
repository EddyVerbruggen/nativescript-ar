import { ARUIViewOptions, ARDimensions2D } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

import * as views from "tns-core-modules/ui/core/view"

export class ARUIView extends ARCommonNode {

	_viewController: any;

	constructor(options: ARAddOptions, node: SCNNode, controller: any) {
		super(options, node);
		this._viewController = controller;
	}


	static create(options: ARUIViewOptions): ARUIView {



		


		const view = options.view;

		if (!view) {


			
		}

		if (view) {

			if (view.parent) {
				//view.parent.removeChild(view);
			}

			if (!view.ios) {
				
			}

		}

		var nativeView=view.ios||view;
		if(!(view instanceof UIView)){
			throw "Expected a uiview";
		}

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
		materialPlane.firstMaterial.diffuse.contents = view.ios;
		const planeNode = SCNNode.nodeWithGeometry(materialPlane)

		return new ARUIView(options, planeNode, null);
	}
}



// class PlaneViewController extends UIViewController{
// 	_view:UIView;
// 	constructor(view:UIView) {
// 	    //super();
// 	    this._view = view
// 	  } 
// 	viewDidLoad() {
//     super.viewDidLoad();
//     this.view.addSubview(this._ios);

//   }
// }