package org.nativescript.tns.arlib;

import android.content.Context;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;

import org.nativescript.tns.arlib.helpers.TapHelper;
import org.nativescript.tns.arlib.rendering.BackgroundRenderer;
import org.nativescript.tns.arlib.rendering.ObjectRenderer;
import org.nativescript.tns.arlib.rendering.PlaneRenderer;
import org.nativescript.tns.arlib.rendering.PointCloudRenderer;

import com.google.ar.core.Anchor;
import com.google.ar.core.Camera;
import com.google.ar.core.Frame;
import com.google.ar.core.HitResult;
import com.google.ar.core.Plane;
import com.google.ar.core.Point;
import com.google.ar.core.PointCloud;
import com.google.ar.core.Session;
import com.google.ar.core.Trackable;
import com.google.ar.core.TrackingState;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ArrayBlockingQueue;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class TNSSurfaceRenderer implements GLSurfaceView.Renderer {

    // use "JS" so it ends up in the {N} debug output
    private static final String TAG = "JS";

    private static TNSSurfaceRendererListener onSurfaceEventCallbackListener;
    private Session mSession;
    private Context context;
    private GestureDetector gestureDetector;

    private BackgroundRenderer mBackgroundRenderer = new BackgroundRenderer();
    private final PointCloudRenderer pointCloudRenderer = new PointCloudRenderer();
    private PlaneRenderer mPlaneRenderer = new PlaneRenderer();
    private TapHelper tapHelper;

    // Temporary matrix allocated here to reduce number of allocations for each frame.
    private final float[] anchorMatrix = new float[16];

    private final ObjectRenderer virtualObject = new ObjectRenderer();
    private final ObjectRenderer virtualObjectShadow = new ObjectRenderer();

//    private final ObjectRenderer virtualObject = new ObjectRenderer();
//    private final ObjectRenderer virtualObjectShadow = new ObjectRenderer();

    // Tap handling and UI.
    private final ArrayBlockingQueue<MotionEvent> queuedSingleTaps = new ArrayBlockingQueue<>(16);
    private final ArrayList<Anchor> anchors = new ArrayList<>();

    private GLSurfaceView surfaceView;

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

    public void setSurfaceView(final GLSurfaceView surfaceView) {
        Log.d(TAG, "TNSSurfaceRenderer.setSurfaceView");
        this.surfaceView = surfaceView;

        // Set up tap listener.
        tapHelper = new TapHelper(this.context);
        this.surfaceView.setOnTouchListener(tapHelper);
    }

    private void onSingleTap(MotionEvent e) {
        // Queue tap if there is space. Tap is lost if queue is full.
        queuedSingleTaps.offer(e);
    }

    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        Log.d(TAG, "TNSSurfaceRenderer.onSurfaceCreated");

        GLES20.glClearColor(0.1f, 0.1f, 0.1f, 1.0f);

        // Prepare the other rendering objects.
        /*
        try {
            virtualObject.createOnGlThread(this.context, "andy.obj", "andy.png");
            virtualObject.setMaterialProperties(0.0f, 3.5f, 1.0f, 6.0f);

            virtualObjectShadow.createOnGlThread(this.context, "andy_shadow.obj", "andy_shadow.png");
            virtualObjectShadow.setBlendMode(BlendMode.Shadow);
            virtualObjectShadow.setMaterialProperties(1.0f, 0.0f, 0.0f, 1.0f);
        } catch (IOException e) {
            Log.e(TAG, "Failed to read obj file");
        }
        */

        try {
            // Create the texture and pass it to ARCore session to be filled during update().
            mBackgroundRenderer.createOnGlThread(this.context);
            mPlaneRenderer.createOnGlThread(this.context, "models/trigrid.png");
            pointCloudRenderer.createOnGlThread(this.context);


            // these are a bit more app-specific, but it's useful for this PoC
            virtualObject.createOnGlThread(/*context=*/ this.context, "models/andy.obj", "models/andy.png");
            virtualObject.setMaterialProperties(0.0f, 2.0f, 0.5f, 6.0f);
            virtualObjectShadow.createOnGlThread(this.context, "models/andy_shadow.obj", "models/andy_shadow.png");
            virtualObjectShadow.setBlendMode(ObjectRenderer.BlendMode.Shadow);
            virtualObjectShadow.setMaterialProperties(1.0f, 0.0f, 0.0f, 1.0f);
        } catch (IOException e) {
            Log.e(TAG, ">>>>>>>>> Failed to read shader!", e);
        }


        Handler mainHandler = new Handler(Looper.getMainLooper());

        Runnable myRunnable = new Runnable() {
            @Override
            public void run() {
                onSurfaceEventCallbackListener.callback("blaaaaaaat");
            } // This is your code
        };
        mainHandler.post(myRunnable);

        onSurfaceEventCallbackListener.callback("blaaaaaaat2");

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
        Display display = context.getSystemService(WindowManager.class).getDefaultDisplay();
        if (display != null) {
            int displayRotation = display.getRotation();
            Log.d(TAG, "TNSSurfaceRenderer.onSurfaceChanged (displayRotation): " + displayRotation);
            mSession.setDisplayGeometry(displayRotation, width, height);
        }
    }

    @Override
    public void onDrawFrame(GL10 gl) {
//        Log.d(TAG, "TNSSurfaceRenderer.onDrawFrame"); // too noisy
        // Clear screen to notify driver it should not load any pixels from previous frame.
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

        // TODO see displayRotationHelper.updateSessionIfNeeded in Google's hello_ar sample app

        try {
            mSession.setCameraTextureName(mBackgroundRenderer.getTextureId());

            // Obtain the current frame from ARSession. When the configuration is set to
            // UpdateMode.BLOCKING (it is by default), this will throttle the rendering to the
            // camera framerate.
            Frame frame = mSession.update();
            Camera camera = frame.getCamera();

            // Handle taps. Handling only one tap per frame, as taps are usually low frequency compared to frame rate.
            MotionEvent tap = tapHelper.poll();
            if (tap != null && camera.getTrackingState() == TrackingState.TRACKING) {
                onSurfaceEventCallbackListener.callback("onDrawFrame, tap");
                for (HitResult hit : frame.hitTest(tap)) {
                    // Check if any plane was hit, and if it was hit inside the plane polygon
                    Trackable trackable = hit.getTrackable();
                    // Creates an anchor if a plane or an oriented point was hit.
                    onSurfaceEventCallbackListener.callback("onDrawFrame, tap > plane? " + (trackable instanceof Plane));
                    if ((trackable instanceof Plane && ((Plane) trackable).isPoseInPolygon(hit.getHitPose())) ||
                            (trackable instanceof Point && ((Point) trackable).getOrientationMode() == Point.OrientationMode.ESTIMATED_SURFACE_NORMAL)) {
                        // Hits are sorted by depth. Consider only closest hit on a plane or oriented point.
                        // Cap the number of objects created. This avoids overloading both the
                        // rendering system and ARCore.
                        if (anchors.size() >= 20) {
                            anchors.get(0).detach();
                            anchors.remove(0);
                        }
                        // Adding an Anchor tells ARCore that it should track this position in
                        // space. This anchor is created on the Plane to place the 3D model
                        // in the correct position relative both to the world and to the plane.
                        anchors.add(hit.createAnchor());
                        onSurfaceEventCallbackListener.callback("onDrawFrame, tap > anchor created");
                        break;
                    }
                }
            }

            // Draw background.
            mBackgroundRenderer.draw(frame);

            // If not tracking, don't draw 3d objects.
            if (camera.getTrackingState() == TrackingState.PAUSED) {
                return;
            }

            // Get projection matrix.
            float[] projmtx = new float[16];
            camera.getProjectionMatrix(projmtx, 0, 0.1f, 100.0f);

            // Get camera matrix and draw.
            float[] viewmtx = new float[16];
            camera.getViewMatrix(viewmtx, 0);

            // Compute lighting from average intensity of the image.
            // The first three components are color scaling factors.
            // The last one is the average pixel intensity in gamma space.
            final float[] colorCorrectionRgba = new float[4];
            frame.getLightEstimate().getColorCorrection(colorCorrectionRgba, 0);

            // Visualize tracked points.
            PointCloud pointCloud = frame.acquirePointCloud();
            pointCloudRenderer.update(pointCloud);
            pointCloudRenderer.draw(viewmtx, projmtx);

            // Application is responsible for releasing the point cloud resources after using it.
            pointCloud.release();

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
            mPlaneRenderer.drawPlanes(
                    mSession.getAllTrackables(Plane.class), camera.getDisplayOrientedPose(), projmtx);

            // Visualize anchors created by touch.
            float scaleFactor = 1.0f;
            for (Anchor anchor : anchors) {
                if (anchor.getTrackingState() != TrackingState.TRACKING) {
                    continue;
                }
                // Get the current pose of an Anchor in world space. The Anchor pose is updated
                // during calls to session.update() as ARCore refines its estimate of the world.
                anchor.getPose().toMatrix(anchorMatrix, 0);

                // Update and draw the model and its shadow.
                virtualObject.updateModelMatrix(anchorMatrix, scaleFactor);
                virtualObjectShadow.updateModelMatrix(anchorMatrix, scaleFactor);
                virtualObject.draw(viewmtx, projmtx, colorCorrectionRgba);
                virtualObjectShadow.draw(viewmtx, projmtx, colorCorrectionRgba);
            }

        } catch (Throwable t) {
            // Avoid crashing the application due to unhandled exceptions.
            Log.e(TAG, "Exception on the OpenGL thread", t);
        }
    }
}
