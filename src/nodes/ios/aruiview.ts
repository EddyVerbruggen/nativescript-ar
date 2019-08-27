import { ARUIViewOptions, ARDimensions2D } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Label } from "tns-core-modules/ui/label";
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { View } from "tns-core-modules/ui/core/view";


let pixelsPerMeter=500;

export class ARUIView extends ARCommonNode {




	static create(options: ARUIViewOptions): ARUIView {	
		return new ARUIView(options);
	}

	constructor(options: ARUIViewOptions) {
		
		try{

		if(!options.view){
			options.view=new Label();
			(<Label>options.view).text="Hello World";
			options.view._setupUI({});
		}

		const view = options.view;

		const stackLayout = new StackLayout();



		if(view.parent){
			(<LayoutBase>view.parent).removeChild(view)
		}

		stackLayout.addChild(view);
				

		if(view instanceof View&&(!view.ios)){
			view._setupUI({});
			view.loadView(view);
			//view.layout(0,0, 300, 50);
			
		}
		const nativeView=view.ios||view;

		if(!options.dimensions){
			options.dimensions={
				x:nativeView.bounds.size.width/pixelsPerMeter, y:nativeView.bounds.size.height/pixelsPerMeter
			}
		}



		const dimensions: ARDimensions2D = <ARDimensions2D>(typeof options.dimensions !== "number" ? options.dimensions : {
	      x: options.dimensions,
	      y: options.dimensions,
	    });

		

        const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);

        nativeView.layer.anchorPoint=CGPointMake(dimensions.x/2,0);
        nativeView.transform = CGAffineTransformMakeScale(1/dimensions.x, 1/dimensions.y);
  
        materialPlane.cornerRadius=options.chamferRadius||0;
       
        const planeViewController=(<ArPlaneViewController>ArPlaneViewController.alloc()).initWithViewAndPlane(stackLayout,  materialPlane);


		const planeNode = SCNNode.nodeWithGeometry(materialPlane)
		planeViewController.loadView();

		super(options, planeNode);

		}catch(e){
			console.error(e);
		}
	}


	
}




 class ArPlaneViewController extends UIViewController{

	childView:View;
	materialPlane:SCNPlane;

	public initWithViewAndPlane(view:View, plane:SCNPlane):ArPlaneViewController{
		super.init();
		this.childView=view;
		this.materialPlane=plane;
		this.view.hidden = false;
		return this;
	}

    viewDidLoad () {
        super.viewDidLoad();
    }

    loadView () {

    	super.loadView()
		try{

			if(!this.childView.ios){
				this.childView._setupUI({});
				this.childView.loadView(this.childView);
				//this.childView.layout(0, 0, this.materialPlane.width*pixelsPerMeter,this.materialPlane.height*pixelsPerMeter, true);
				this.childView.requestLayout();
			}

			this.view.addSubview(this.childView.ios);

			const frame=this.view.frame;
			const frameT=this.view.transform;
			const layout=this.childView.ios.frame;
			const layoutT=this.childView.ios.transform;

			this.view.opaque=false;

	       	this.materialPlane.firstMaterial.diffuse.contents =this.view;
	       	this.materialPlane.firstMaterial.doubleSided=true;
	       	this.childView.requestLayout();
	       	
       	}catch(e){
       		console.error(e);
       	}

    }

}