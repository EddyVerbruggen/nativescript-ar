package org.nativescript.tns.arlib;


import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.Nullable;
import android.support.v4.view.GestureDetectorCompat;
import android.util.Log;
import android.view.GestureDetector;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.ar.sceneform.HitTestResult;
import com.google.ar.sceneform.Node;
import com.google.ar.sceneform.math.Quaternion;
import com.google.ar.sceneform.math.Vector3;
import com.google.ar.sceneform.rendering.ViewRenderable;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.BiFunction;
import java.util.function.Consumer;

public class TNSNode extends Node {


    private float crowdDistance=-1;

    private CompletableFuture<ViewRenderable> activePopover;
    private ViewRenderable activeViewRenderable;
    private Node popoverNode;
    private Context context;


    //private ArrayList<TNSEventListener> onTouchCallbackListeners=new ArrayList<TNSEventListener>();
    private ArrayList<TNSEventListener> onTapCallbackListeners=new ArrayList<TNSEventListener>();
    private ArrayList<TNSEventListener> onLongTouchCallbackListeners=new ArrayList<TNSEventListener>();

    LinearLayout labelLayout;
    private TextView label;


    public TNSNode(Context context){
        this.context=context;



        final TNSNode node=this;

        final GestureDetectorCompat detector=new GestureDetectorCompat(context, new GestureDetector.SimpleOnGestureListener(){
            @Override
            public boolean onSingleTapUp(MotionEvent e) {



                onTapCallbackListeners.forEach(new Consumer<TNSEventListener>() {
                    @Override
                    public void accept(TNSEventListener tnsEventListener) {
                        tnsEventListener.callback(node);
                    }

                });

                return true;

            }

            @Override
            public void onLongPress(MotionEvent e) {


                onLongTouchCallbackListeners.forEach(new Consumer<TNSEventListener>() {
                    @Override
                    public void accept(TNSEventListener tnsEventListener) {
                        tnsEventListener.callback(node);
                    }
                });
            }


            @Override
            public boolean onDown(MotionEvent event) {
                return true;
            }
        });

        setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(HitTestResult hitTestResult, MotionEvent motionEvent) {

                if(hitTestResult.getNode() instanceof TNSNode) {
                    detector.onTouchEvent(motionEvent);
                }
                return true;
            }
        });
    }



//    public void addOnTouchListener( TNSEventListener onTouchListener) {
//        onTouchCallbackListeners.add(onTouchListener);
//    }
    public void addOnTapListener( TNSEventListener onTouchListener) {
        onTapCallbackListeners.add(onTouchListener);
    }
    public void addOnLongPressListener( TNSEventListener onTouchListener) {
        onLongTouchCallbackListeners.add(onTouchListener);
    }



    public void setLocalPosition(float[] pos) {
        super.setLocalPosition(new Vector3(pos[0], pos[1], pos[2]));
    }

    public void setLocalScale(float scale) {
        super.setLocalScale(new Vector3(scale, scale,scale));
    }

    public void setVisible(boolean visible){
        super.setEnabled(visible);
    }


    /**
     * places the node between its real position and the camera at a max distance from the camera
     */
    public void setCrowdCamera(float d){
        crowdDistance=d;
    }
    public void clearCrowd(float d){
        crowdDistance=-1;
    }


    /**
     * point this node at the camera
     */
    public void lookAtCamera() {

        Vector3 cameraPosition = getScene().getCamera().getWorldPosition();
        Vector3 nodePosition = getWorldPosition();
        Vector3 direction = Vector3.subtract(cameraPosition, nodePosition);

        Quaternion lookRotation = Quaternion.lookRotation(direction, Vector3.up());
        setWorldRotation(lookRotation);

        if(crowdDistance>0){
           setWorldPosition(Vector3.lerp(cameraPosition, nodePosition, crowdDistance/Vector3.subtract(cameraPosition, nodePosition).length()));
        }


    }



    public float distance(){

        Vector3 cameraPosition = getScene().getCamera().getWorldPosition();
        Vector3 nodePosition = getWorldPosition();
        return Vector3.subtract(cameraPosition, nodePosition).length();

    }


    public Node getLabelNode(){
        Node node=findByName("Label");
        return node;
    }
    public ViewGroup getLabelContainer(){

        if(labelLayout==null){
            labelLayout=new LinearLayout(context);
            labelLayout.setOrientation(LinearLayout.VERTICAL);
        }

        return labelLayout;
    }

    public void setLabel(String text){
        label.setText(text);
    }


    private void makePopover(){

        Log.d("JS", "MakePopover");


        ViewGroup container=getLabelContainer();

        label=new TextView(context);
        label.setText(getName());
        label.setShadowLayer(4,  0,  0, android.graphics.Color.WHITE);
        label.setTextColor(android.graphics.Color.BLACK);
        container.addView(label);

        activePopover =
                ViewRenderable.builder().setView(this.context, container).build();
        CompletableFuture.allOf(activePopover)
                .handle(
                        new BiFunction<Void, Throwable, Object>() {
                            @Override
                            public Object apply(Void notUsed, Throwable throwable) {
                                // When you build a Renderable, Sceneform loads its resources in the background while
                                // returning a CompletableFuture. Call handle(), thenAccept(), or check isDone()
                                // before calling get().

                                if (throwable != null) {
                                    displayError(context, "Unable to load renderable", throwable);
                                    return null;
                                }

                                try {

                                    activeViewRenderable=activePopover.get();
                                    appendPopover();


                                } catch (InterruptedException | ExecutionException ex) {
                                    displayError(context, "Unable to load renderable", ex);
                                }

                                return null;
                            }
                        });

    }

    private void appendPopover(){





        popoverNode = new Node();
        popoverNode.setName("Label");
        popoverNode.setParent(this);
        popoverNode.setRenderable(activeViewRenderable);
        popoverNode.setLocalPosition(new Vector3(0.0f, 0.5f, 0.0f));



    }

    public void showPopover(){

        if(popoverNode==null){
            makePopover();
            return;
        }

        popoverNode.setEnabled(true);
    }

    public  void hidePopover(){
        if(popoverNode!=null){
            popoverNode.setEnabled(false);
        }
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

}
