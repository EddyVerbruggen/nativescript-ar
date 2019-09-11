import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";
import { ARDimensions2D, ARUIViewOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

const pixelsPerMeter = 200 * screen.mainScreen.scale;

const main_queue = dispatch_get_current_queue();

export class ARUIView extends ARCommonNode {

  static create(options: ARUIViewOptions, sceneView: ARSCNView): ARUIView {
    return new ARUIView(options, sceneView);
  }

  constructor(options: ARUIViewOptions, sceneView: ARSCNView) {
    try {
      const view = options.view;

      const node = SCNNode.node();

      // when adding a UIView in image tracking, we need to move this operation to the main thread to avoid errors
      dispatch_async(main_queue, () => {

        if (view.parent) {
          view.ios.removeFromSuperview();
          (<any>view).parent = null;
        }

        if (view instanceof View && (!view.ios)) {
          view._setupUI({});
          view.loadView(view);
        }

        const nativeView = view.ios || view;

        view.measure(0, 0);
        if (!options.dimensions) {
          options.dimensions = <ARDimensions2D>{
            x: view.getMeasuredWidth() / pixelsPerMeter, y: view.getMeasuredHeight() / pixelsPerMeter
          };
        }

        // the NativeScript View x/y ratio is different than the camera ratio, so compensate for the difference, otherwise the view is vertically compressed
        const cameraRatio = Math.max(sceneView.session.currentFrame.camera.imageResolution.height, sceneView.session.currentFrame.camera.imageResolution.width) / Math.min(sceneView.session.currentFrame.camera.imageResolution.height, sceneView.session.currentFrame.camera.imageResolution.width);
        const screenRatio = Math.max(screen.mainScreen.heightPixels, screen.mainScreen.widthPixels) / Math.min(screen.mainScreen.heightPixels, screen.mainScreen.widthPixels);
        const yStretchCompensation = (cameraRatio + screenRatio) / 2;
        console.log("yStretchCompensation: " + yStretchCompensation);

        const dimensions: ARDimensions2D = <ARDimensions2D>(typeof options.dimensions !== "number" ? options.dimensions : {
          x: options.dimensions,
          y: options.dimensions * yStretchCompensation,
        });

        const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y * yStretchCompensation);

        // with these uncommented, the image tracking UI is very small and weirdly positioned.. so better leave 'em like this
        // nativeView.layer.anchorPoint = CGPointMake(dimensions.x / 2, 0);
        // nativeView.transform = CGAffineTransformMakeScale(1 / dimensions.x, 1 / dimensions.y);

        materialPlane.cornerRadius = options.chamferRadius || 0;

        const planeViewController = (<ArPlaneViewController>ArPlaneViewController.alloc()).initWithViewAndPlane(view, materialPlane);

        const planeNode = SCNNode.nodeWithGeometry(materialPlane);
        planeViewController.loadView();

        planeNode.position = {
          x: 0,
          y: dimensions.y / 2,
          z: 0
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
      });

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

    } catch (e) {
      console.error(e);
    }
  }
}