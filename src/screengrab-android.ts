import { ImageSource } from "@nativescript/core";

export class FragmentScreenGrab {

  public grabScreenshot(fragment: com.google.ar.sceneform.ux.ArFragment): Promise<ImageSource> {

    return new Promise((resolve, reject) => {
      const view = <android.view.SurfaceView><unknown>fragment.getArSceneView();

      // Create a bitmap the size of the scene view.
      const bitmap = android.graphics.Bitmap.createBitmap(view.getWidth(), view.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
      // Create a handler thread to offload the processing of the image.
      const handlerThread = new android.os.HandlerThread("PixelCopier");
      handlerThread.start();
      // Make the request to copy.
      android.view.PixelCopy.request(view, bitmap, new android.view.PixelCopy.OnPixelCopyFinishedListener({

        onPixelCopyFinished: (copyResult: number) => {
          if (copyResult === android.view.PixelCopy.SUCCESS) {
            resolve(ImageSource.fromDataSync(bitmap));
          } else {
            reject("Field to copy screen image");
          }
          handlerThread.quitSafely();
        }
      }), new android.os.Handler(handlerThread.getLooper()));

    });
  }
}
