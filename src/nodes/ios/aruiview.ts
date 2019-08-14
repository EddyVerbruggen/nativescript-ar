import { ARUIViewOptions } from "../../ar-common";
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
				view.parent.removeChild(view);
			}

			if (!view.ios) {
				
			}

		}

		
		const newController=views.ios.UILayoutViewController.initWithOwner(new WeakRef(view));
        newController.view.addSubview(view.nativeViewProtected);
        view.viewController = newController;
        //item.setViewController(newController, view.nativeViewProtected);
		
        const materialPlane = SCNPlane.planeWithWidthHeight(view.ios.bounds.size.width / 100, view.ios.bounds.size.height / 100);
		materialPlane.firstMaterial.diffuse.contents = view.ios.layer;
		const planeNode = SCNNode.nodeWithGeometry(materialPlane)

		return new ARUIView(options, planeNode, newController);
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