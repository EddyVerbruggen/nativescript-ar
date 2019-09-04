import { ARUIViewOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import * as utils from "tns-core-modules/utils/utils";

declare const java: any;

export class ARUIView extends ARCommonNode {
  static create(options: ARUIViewOptions, fragment): Promise<ARUIView> {
    return new Promise<ARUIView>(async (resolve, reject) => {
      const node = ARCommonNode.createNode(options, fragment);

      const context = utils.ad.getApplicationContext();
      const container = new android.widget.LinearLayout(context);

      container.setOrientation(android.widget.LinearLayout.VERTICAL);

      const view = options.view;

      if (!view) {
        // this is only here for testing and does not print if view is defined in ARUIViewOptions
        const label = new android.widget.TextView(context);
        label.setText("Hello World");
        label.setShadowLayer(4, 0, 0, android.graphics.Color.WHITE);
        label.setTextColor(android.graphics.Color.BLACK);
        container.addView(label);

      } else {
        if (view.android && view.android.getParent()) {
          view.android.getParent().removeView(view.android);
        }

        if (!view.android) {
          view._setupUI(context);
          view.loadView(view);
          view.requestLayout();
        }

        container.addView(view.android);
      }


      const customUI =
          com.google.ar.sceneform.rendering.ViewRenderable.builder()
              .setView(context, container)
              .build()
              .thenAccept(new java.util.function.Consumer({
                accept: renderable => {
                  console.log(">> accepted2, renderable: " + renderable);

                  /**
                   * pin bottom of view with node, this causes view to expand upward
                   * com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.BOTTOM
                   */
                  renderable.setVerticalAlignment(com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment.BOTTOM);

                  node.setRenderable(renderable);
                  resolve(new ARUIView(options, node));
                }
              }))
              .exceptionally(new java.util.function.Function({
                apply: error => reject(error)
              }));
    });
  }
}