package org.nativescript.tns.arlib;

import android.content.Context;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import org.nativescript.tns.arlib.rendering.BackgroundRenderer;
import org.nativescript.tns.arlib.rendering.PlaneRenderer;
import org.nativescript.tns.arlib.rendering.PointCloudRenderer;

import com.google.ar.core.Frame;
import com.google.ar.core.Session;

import java.io.IOException;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class TNSSurfaceRenderer implements GLSurfaceView.Renderer {

    // use "JS" so it ends up in the {N} debug output
    private static final String TAG = "JS";

    private static TNSSurfaceRendererListener onSurfaceEventCallbackListener;
    private Session mSession;
    private Context context;

    private BackgroundRenderer mBackgroundRenderer = new BackgroundRenderer();
    private PointCloudRenderer mPointCloud = new PointCloudRenderer();
    private PlaneRenderer mPlaneRenderer = new PlaneRenderer();

    public static void setSurfaceEventCallbackListener(final TNSSurfaceRendererListener listener) {
        Log.d(TAG, "TNSSurfaceRenderer.setSurfaceEventCallbackListener");
        onSurfaceEventCallbackListener = listener;
    }

    public void setSession(final Session session) {
        Log.d(TAG, "TNSSurfaceRenderer.setSession");
        this.mSession = session;
    }

    public void setContext(final Context context) {
        Log.d(TAG, "TNSSurfaceRenderer.setContext");
        this.context = context;
    }

    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        Log.d(TAG, "TNSSurfaceRenderer.onSurfaceCreated :))");

        GLES20.glClearColor(0.1f, 0.1f, 0.1f, 1.0f);

        // Create the texture and pass it to ARCore session to be filled during update().
        mBackgroundRenderer.createOnGlThread(this.context);
        mSession.setCameraTextureName(mBackgroundRenderer.getTextureId());

        try {
            mPlaneRenderer.createOnGlThread(this.context, "trigrid.png");
        } catch (IOException e) {
            Log.e(TAG, ">>>>>>>>> Failed to read plane texture");
        }

        mPointCloud.createOnGlThread(this.context);

        Handler mainHandler = new Handler(Looper.getMainLooper());

        Runnable myRunnable = new Runnable() {
            @Override
            public void run() {
                onSurfaceEventCallbackListener.callback("blaaaaaaat");
            } // This is your code
        };
        mainHandler.post(myRunnable);

//        try {
//            onSurfaceEventCallbackListener.callback(new JSONObject().put("foo", "bar"));
//            onSurfaceEventCallbackListener.callback("blaaaaaaat");
//        } catch (JSONException e) {
//            Log.e(LOG_TAG, e.getMessage());
//            e.printStackTrace();
//        }
    }

    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        Log.d(TAG, "TNSSurfaceRenderer.onSurfaceChanged: " + width + " x " + height);
        GLES20.glViewport(0, 0, width, height);
        mSession.setDisplayGeometry(width, height);
    }

    @Override
    public void onDrawFrame(GL10 gl) {
        Log.d(TAG, "TNSSurfaceRenderer.onDrawFrame");
        // Clear screen to notify driver it should not load any pixels from previous frame.
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

        try {
            // Obtain the current frame from ARSession. When the configuration is set to
            // UpdateMode.BLOCKING (it is by default), this will throttle the rendering to the
            // camera framerate.
            Frame frame = mSession.update();

            // Draw background.
            mBackgroundRenderer.draw(frame);

            // If not tracking, don't draw 3d objects.
            if (frame.getTrackingState() == Frame.TrackingState.NOT_TRACKING) {
                return;
            }

            // Get projection matrix.
            float[] projmtx = new float[16];
            mSession.getProjectionMatrix(projmtx, 0, 0.1f, 100.0f);

            // Get camera matrix and draw.
            float[] viewmtx = new float[16];
            frame.getViewMatrix(viewmtx, 0);

            // Compute lighting from average intensity of the image.
            final float lightIntensity = frame.getLightEstimate().getPixelIntensity();

            // Visualize tracked points.
            mPointCloud.update(frame.getPointCloud());
            mPointCloud.draw(frame.getPointCloudPose(), viewmtx, projmtx);

            // Check if we detected at least one plane. If so, hide the loading message.
//            if (mLoadingMessageSnackbar != null) {
//                for (Plane plane : mSession.getAllPlanes()) {
//                    if (plane.getType() == com.google.ar.core.Plane.Type.HORIZONTAL_UPWARD_FACING &&
//                            plane.getTrackingState() == Plane.TrackingState.TRACKING) {
//                        hideLoadingMessage();
//                        break;
//                    }
//                }
//            }

            // Visualize planes.
            mPlaneRenderer.drawPlanes(mSession.getAllPlanes(), frame.getPose(), projmtx);

            // Visualize anchors created by touch.
            /*
            float scaleFactor = 1.0f;
            for (PlaneAttachment planeAttachment : mTouches) {
                if (!planeAttachment.isTracking()) {
                    continue;
                }
                // Get the current combined pose of an Anchor and Plane in world space. The Anchor
                // and Plane poses are updated during calls to session.update() as ARCore refines
                // its estimate of the world.
                planeAttachment.getPose().toMatrix(mAnchorMatrix, 0);

                // Update and draw the model and its shadow.
                mVirtualObject.updateModelMatrix(mAnchorMatrix, scaleFactor);
                mVirtualObjectShadow.updateModelMatrix(mAnchorMatrix, scaleFactor);
                mVirtualObject.draw(viewmtx, projmtx, lightIntensity);
                mVirtualObjectShadow.draw(viewmtx, projmtx, lightIntensity);
            }
            */

        } catch (Throwable t) {
            // Avoid crashing the application due to unhandled exceptions.
            Log.e(TAG, "Exception on the OpenGL thread", t);
        }
    }
}
