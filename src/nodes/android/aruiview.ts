import { ARAddOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import * as utils from "tns-core-modules/utils/utils";

export class ARUIView extends ARCommonNode {
    static create(options: ARAddOptions, fragment): Promise<ARUIView> {
        return new Promise<ARUIView>(async (resolve, reject) => {
            const node = new com.google.ar.sceneform.ux.TransformableNode(fragment.getTransformationSystem());
            const container = new android.widget.LinearLayout(utils.ad.getApplicationContext());
            container.setOrientation(android.widget.LinearLayout.VERTICAL);
            const label = new android.widget.TextView(utils.ad.getApplicationContext());
            label.setText("Hello World");
            label.setShadowLayer(4, 0, 0, android.graphics.Color.WHITE);
            label.setTextColor(android.graphics.Color.BLACK);
            container.addView(label);


            const customUI =
                com.google.ar.sceneform.rendering.ViewRenderable.builder()
                    .setView(utils.ad.getApplicationContext(), container)
                    .build()
                    .thenAccept(new java.util.function.Consumer({
                        accept: renderable => {
                            console.log(">> accepted2, renderable: " + renderable);
                            node.setRenderable(renderable);
                            node.select(); // optional; this can be removed
                            resolve(new ARUIView(options, node));
                        }
                    }));








        });
    }
}