import { View } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ARDimensions2D, ARUIViewOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

const pixelsPerMeter = 500;

export class ARUIView extends ARCommonNode {

  static create(options: ARUIViewOptions): ARUIView {
    return new ARUIView(options);
  }

  constructor(options: ARUIViewOptions) {
    try {
      // TODO remove
      if (!options.view) {
        options.view = new Label();
        (<Label>options.view).text = "Hello World";
        options.view._setupUI({});
      }

      const view = options.view;
      //const stackLayout = new StackLayout();

      if (view.parent) {
        //(<LayoutBase>view.parent).removeChild(view);
        view.ios.removeFromSuperview();
        (<any>view).parent=null;
      }

      //stackLayout.addChild(view);

      if (view instanceof View && (!view.ios)) {
        view._setupUI({});
        view.loadView(view);
        // view.layout(0,0, 300, 50);
      }
      const nativeView = view.ios || view;

      view.measure(0,0)
      if (!options.dimensions) {
        options.dimensions = {
          x: view.getMeasuredWidth() / pixelsPerMeter, y: view.getMeasuredHeight() / pixelsPerMeter
        };
      }

      const dimensions: ARDimensions2D = <ARDimensions2D>(typeof options.dimensions !== "number" ? options.dimensions : {
        x: options.dimensions,
        y: options.dimensions,
      });

      const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);

      nativeView.layer.anchorPoint = CGPointMake(dimensions.x / 2, 0);
      const adjustY=0.04;
      nativeView.transform = CGAffineTransformMakeScale(1 / dimensions.x, 1 / (dimensions.y-adjustY));

      materialPlane.cornerRadius = options.chamferRadius || 0;

      const planeViewController = (<ArPlaneViewController>ArPlaneViewController.alloc()).initWithViewAndPlane(view, materialPlane);

      const planeNode = SCNNode.nodeWithGeometry(materialPlane);
      planeViewController.loadView();


      const node=SCNNode.node();
      planeNode.position = {
        x:0,
        y:(dimensions.y-adjustY)/2,
        z:0
      };
      planeNode.eulerAngles = {
        x: 0,
        y: Math.PI,
        z: 0
      };
      node.eulerAngles = {
        x: 0,
        y: Math.PI,
        z: 0
      };
      node.addChildNode(planeNode);

      super(options, node);

    } catch (e) {
      console.error(e);
    }
  }
}

class ArPlaneViewController extends UIViewController {
  childView: View;
  materialPlane: SCNPlane;

  public initWithViewAndPlane(view: View, plane: SCNPlane): ArPlaneViewController {
    super.init();
    this.childView = view;
    this.materialPlane = plane;
    this.view.hidden = false;
    return this;
  }

  loadView() {
    super.loadView();
    try {
      if (!this.childView.ios) {
        this.childView._setupUI({});
        this.childView.loadView(this.childView);
        // this.childView.layout(0, 0, this.materialPlane.width*pixelsPerMeter,this.materialPlane.height*pixelsPerMeter, true);
        this.childView.requestLayout();
      }

      this.view.addSubview(this.childView.ios);

      const frame = this.view.frame;
      const frameT = this.view.transform;
      const layout = this.childView.ios.frame;
      const layoutT = this.childView.ios.transform;

      this.view.opaque = false;

      this.materialPlane.firstMaterial.diffuse.contents = this.view;
      this.materialPlane.firstMaterial.doubleSided = true;
      //this.childView.requestLayout();

    } catch (e) {
      console.error(e);
    }
  }
}