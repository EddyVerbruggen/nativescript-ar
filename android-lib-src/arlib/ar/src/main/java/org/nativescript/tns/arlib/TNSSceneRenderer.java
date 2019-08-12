package org.nativescript.tns.arlib;

import android.Manifest;
import android.app.Activity;
import android.content.Context;

import com.google.ar.core.Anchor;
import com.google.ar.core.ArCoreApk;
import com.google.ar.core.Camera;
import com.google.ar.core.Config;
import com.google.ar.core.Pose;
import com.google.ar.core.Session;
import com.google.ar.core.exceptions.CameraNotAvailableException;
import com.google.ar.core.exceptions.UnavailableApkTooOldException;
import com.google.ar.core.exceptions.UnavailableArcoreNotInstalledException;
import com.google.ar.core.exceptions.UnavailableDeviceNotCompatibleException;
import com.google.ar.core.exceptions.UnavailableException;
import com.google.ar.core.exceptions.UnavailableSdkTooOldException;
import com.google.ar.sceneform.AnchorNode;
import com.google.ar.sceneform.ArSceneView;


import android.content.pm.PackageManager;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.GestureDetector;
import android.view.Gravity;
import android.view.MotionEvent;
import android.widget.Toast;

import com.google.ar.sceneform.FrameTime;
import com.google.ar.sceneform.HitTestResult;
import com.google.ar.core.Plane;
import com.google.ar.core.Frame;
import com.google.ar.core.TrackingState;
import com.google.ar.sceneform.Scene;
import com.google.ar.sceneform.Node;
import com.google.ar.sceneform.math.Vector3;
import com.google.ar.sceneform.rendering.Color;
import com.google.ar.sceneform.rendering.Material;
import com.google.ar.sceneform.rendering.MaterialFactory;
import com.google.ar.sceneform.rendering.Renderable;
import com.google.ar.sceneform.rendering.ShapeFactory;


import java.util.function.Consumer;
import java.util.function.Function;


import android.os.Handler;
import android.os.Looper;

public class TNSSceneRenderer {



    private ArSceneView arSceneView;
    private Activity activity;
    private Context context;

    private GestureDetector gestureDetector;

    private Node originNode;

    private  Material defaultMaterial;
    private  Material defaultMaterialActive;





    private TNSEventListener surfaceEventCallbackListener;
    private TNSEventListener onSceneTappedListener;
    private TNSEventListener onPlaneTappedListener;
    private TNSEventListener onObjectTappedListener;


    public TNSSceneRenderer() {



    }


    public void setSurfaceEventCallbackListener(TNSEventListener listener){
        surfaceEventCallbackListener=listener;
    }

    public void setOnSceneTappedListener(TNSEventListener listener){
        onSceneTappedListener=listener;
    }

    public void setOnPlaneTappedListener(TNSEventListener listener){
        onPlaneTappedListener=listener;
    }
    public void setOnObjectTappedListener(TNSEventListener listener){
        onObjectTappedListener=listener;
    }

    public ArSceneView getArSceneView() {
        return arSceneView;
    }


    public boolean isReady(){
        return arSceneView.getArFrame()!=null&&arSceneView.getArFrame().getCamera()!=null&&arSceneView.getArFrame().getCamera().getTrackingState()==TrackingState.TRACKING&&arSceneView.getArFrame().getCamera().getPose()!=null;
    }

    public double getCameraHeading(){
       float[] rot=arSceneView.getArFrame().getCamera().getPose().getZAxis();
       return (Math.toDegrees((float) Math.atan2(rot[2],rot[0]))-90+360)%360;
    }

    public Camera getCamera(){
        return arSceneView.getArFrame().getCamera();
    }

    public float[] getCameraPosition(){
        float[] pos=new float[3];
        arSceneView.getArFrame().getCamera().getPose().getTranslation(pos, 0);
        return pos;
    }



    public void setArSceneView(ArSceneView arSceneView) {
        this.arSceneView = arSceneView;

        gestureDetector =
                new GestureDetector( new GestureDetector.SimpleOnGestureListener() {
                            @Override
                            public boolean onSingleTapUp(MotionEvent e) {
                                Log.d("JS", "Touch Scene");
                                onSingleTap(e);
                                return true;
                            }

                            @Override
                            public boolean onDown(MotionEvent e) {
                                return true;
                            }
                        });

        // Set a touch listener on the Scene to listen for taps.
        arSceneView
                .getScene()
                .setOnTouchListener(
                        new Scene.OnTouchListener() {
                            @Override
                            public boolean onSceneTouch(HitTestResult hitTestResult, MotionEvent event) {
                                // If the solar system hasn't been placed yet, detect a tap and then check to see if
                                // the tap occurred on an ARCore plane to place the solar system.
                                //if (!hasPlacedSolarSystem) {
                                  return gestureDetector.onTouchEvent(event);
                                // }

                                // Otherwise return false so that the touch event can propagate to the scene.
                                //return false;
                            }
                        });

        // Set an update listener on the Scene that will hide the loading message once a Plane is
        // detected.
        arSceneView
                .getScene()
                .addOnUpdateListener(
                        new Scene.OnUpdateListener() {
                            @Override
                            public void onUpdate(FrameTime frameTime) {
                                handleOnUpdate(frameTime);
                            }
                        });




        init();




    }

    private void init(){

        if(this.context==null){
            return;
        }
        if(this.arSceneView==null){
            return;
        }

        requestCameraPermission(activity);

        if(defaultMaterial==null){
            MaterialFactory.makeOpaqueWithColor(this.context, new Color(android.graphics.Color.MAGENTA))
                    .thenAccept(new Consumer<Material> () {

                        @Override
                        public void accept(Material material) {
                            defaultMaterial=material;
                        }

                    });


        }

        arSceneView.getScene().getCamera().setFarClipPlane(1000);


    }


    private void handleOnUpdate(FrameTime frameTime) {
//                            if (loadingMessageSnackbar == null) {
//                                return;
//                            }

        Frame frame = arSceneView.getArFrame();
        if (frame == null) {
            return;
        }

        if (frame.getCamera().getTrackingState() != TrackingState.TRACKING) {
            return;
        }

        for (Plane plane : frame.getUpdatedTrackables(Plane.class)) {
            if (plane.getTrackingState() == TrackingState.TRACKING) {
                //hideLoadingMessage();
            }
        }
    }


    private void onSingleTap(MotionEvent tap) {

    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }


    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
        init();
    }




    public void setupScene(){


        if (arSceneView == null) {
            return;
        }

        boolean installRequested=false;

        if (arSceneView.getSession() == null) {
            // If the session wasn't created yet, don't resume rendering.
            // This can happen if ARCore needs to be updated or permissions are not granted yet.
            try {
                Session session = createArSession(activity, installRequested);
                if (session == null) {
                    installRequested = hasCameraPermission(activity);
                    return;
                } else {
                    arSceneView.setupSession(session);
                }
            } catch (UnavailableException e) {
                handleSessionException(activity, e);
            }
        }

        try {
            arSceneView.resume();
        } catch (CameraNotAvailableException ex) {
            displayError(context, "Unable to get camera", ex);

            return;
        }

        if (arSceneView.getSession() != null) {
            //activity.finish();
        }

    }


    protected void handleSessionException(
            Activity activity, UnavailableException sessionException) {

        String message;
        if (sessionException instanceof UnavailableArcoreNotInstalledException) {
            message = "Please install ARCore";
        } else if (sessionException instanceof UnavailableApkTooOldException) {
            message = "Please update ARCore";
        } else if (sessionException instanceof UnavailableSdkTooOldException) {
            message = "Please update this app";
        } else if (sessionException instanceof UnavailableDeviceNotCompatibleException) {
            message = "This device does not support AR";
        } else {
            message = "Failed to create AR session";
            Log.e("JS", "Exception: " + sessionException);
        }
        Toast.makeText(activity, message, Toast.LENGTH_LONG).show();
    }


    protected  void displayError(
            final Context context, final String errorMsg, @Nullable final Throwable problem) {
        final String tag = context.getClass().getSimpleName();
        final String toastText;
        if (problem != null && problem.getMessage() != null) {
            Log.e(tag, errorMsg, problem);
            toastText = errorMsg + ": " + problem.getMessage();
        } else if (problem != null) {
            Log.e(tag, errorMsg, problem);
            toastText = errorMsg;
        } else {
            Log.e(tag, errorMsg);
            toastText = errorMsg;
        }

        new Handler(Looper.getMainLooper())
                .post(
                        new Runnable() {
                            @Override
                            public void run() {
                                Toast toast = Toast.makeText(context, toastText, Toast.LENGTH_LONG);
                                toast.setGravity(Gravity.CENTER, 0, 0);
                                toast.show();
                            }
                        });
    }

    protected Session createArSession(Activity activity, boolean installRequested)
            throws UnavailableException {
        Session session = null;
        // if we have the camera permission, create the session
        if (hasCameraPermission(activity)) {
            switch (ArCoreApk.getInstance().requestInstall(activity, !installRequested)) {
                case INSTALL_REQUESTED:
                    return null;
                case INSTALLED:
                    break;
            }
            session = new Session(activity);
            // IMPORTANT!!!  ArSceneView requires the `LATEST_CAMERA_IMAGE` non-blocking update mode.
            Config config = new Config(session);
            config.setUpdateMode(Config.UpdateMode.LATEST_CAMERA_IMAGE);
            session.configure(config);
        }
        return session;
    }

    protected static void requestCameraPermission(Activity activity) {
        int requestCode = 0x123;
        ActivityCompat.requestPermissions(
                activity, new String[] {Manifest.permission.CAMERA}, requestCode);
    }

    /** Check to see we have the necessary permissions for this app. */
    protected static boolean hasCameraPermission(Activity activity) {
        return ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED;
    }


    public Node getOriginNode(){


        if(originNode==null) {
            float[] pos = {0, 0, 0};
            float[] rotation = {0,0,0,1};
            Anchor anchor =  arSceneView.getSession().createAnchor(new Pose(pos, rotation));


            AnchorNode anchorNode = new AnchorNode(anchor);
            anchorNode.setParent(arSceneView.getScene());
            originNode = new Node();
            originNode.setName("Origin Node");
            anchorNode.addChild(originNode);

        }

        return originNode;

    }



    protected Node addSphere(){
        return addSphere(getOriginNode(), 0.5f);
    }

    protected Node addSphere(float radius){
        return addSphere(getOriginNode(), radius);
    }

    protected Node addSphere(Node parentNode, float radius){





        Node node=createRenderableNode(parentNode);
        node.setRenderable(ShapeFactory.makeSphere(radius, new Vector3(0.0f, 0.0f, 0.0f), defaultMaterial));


        Log.d("JS", "Make Sphere");


        setMaterial(node, android.graphics.Color.RED);

        node.setLocalPosition(new Vector3(0,0,0));

        return node;

    }

    public void setMaterial(Node node, int color){
        setMaterial(node, new Color(color));
    }
    public void setMaterial(Node node, Color color){

        MaterialFactory.makeOpaqueWithColor(this.context,  color)
                .thenAccept(new NodeMaterialConsumer(node))
                .exceptionally(new Function<Throwable, Void>() {
                    @Override
                    public Void apply(Throwable e) {
                        Log.d("JS", "Failed To Set Material: "+e.getCause());
                        //System.out.println(e.getCause()); // returns a throwable back
                        return null;
                    }
                });


    }


    protected Node addCube(){
        return addCube(getOriginNode(), new Vector3(0.5f,0.5f,0.5f));
    }

    protected Node addCube(Vector3 dimensions){
        return addCube(getOriginNode(),  dimensions);
    }

    protected TNSNode createRenderableNode(Node parentNode){
        TNSNode node = new TNSNode(context);
        node.setParent(parentNode);


        return node;
    }

    protected Node addCube(Node parentNode, Vector3 dimensions){



        Node node=createRenderableNode(parentNode);
        node.setRenderable(ShapeFactory.makeCube(dimensions, new Vector3(0.0f, 0.0f, 0.0f), defaultMaterial));


        Log.d("JS", "Make Cube");

        setMaterial(node, android.graphics.Color.RED);


        node.setLocalPosition(new Vector3(0,0,0));

        return node;

    }






    public class NodeMaterialConsumer implements Consumer<Material> {

        protected Renderable modelRenderable;
        protected Node node;

        public NodeMaterialConsumer(Node node){
            this.node=node;
        }

        @Override
        public void accept(Material material) {


            Renderable current = node.getRenderable();
            if (current != null) {
                Log.d("JS", "Make Sphere: use material");
                current.setMaterial(material);
                return;
            }


            Log.d("JS", "Error Making Object");

        }

    }


}



