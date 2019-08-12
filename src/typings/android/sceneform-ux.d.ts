/// <reference path="android-declarations.d.ts" />
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class ArFragment extends com.google.ar.sceneform.ux.BaseArFragment {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.ArFragment>;
                        constructor();
                        handleSessionException(param0: com.google.ar.core.exceptions.UnavailableException): void;
                        getSessionFeatures(): java.util.Set<com.google.ar.core.Session.Feature>;
                        getSessionConfiguration(param0: com.google.ar.core.Session): com.google.ar.core.Config;
                        isArRequired(): boolean;
                        getAdditionalPermissions(): native.Array<string>;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class AugmentedFaceNode {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.AugmentedFaceNode>;
                        onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                        getAugmentedFace(): com.google.ar.core.AugmentedFace;
                        constructor();
                        setAugmentedFace(param0: com.google.ar.core.AugmentedFace): void;
                        setFaceRegionsRenderable(param0: com.google.ar.sceneform.rendering.ModelRenderable): void;
                        onActivate(): void;
                        constructor(param0: com.google.ar.core.AugmentedFace);
                        getFaceMeshTexture(): com.google.ar.sceneform.rendering.Texture;
                        setFaceMeshTexture(param0: com.google.ar.sceneform.rendering.Texture): void;
                        getFaceMeshMaterialOverride(): com.google.ar.sceneform.rendering.Material;
                        setFaceMeshMaterialOverride(param0: com.google.ar.sceneform.rendering.Material): void;
                        getFaceRegionsRenderable(): com.google.ar.sceneform.rendering.ModelRenderable;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    abstract class BaseArFragment {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.BaseArFragment>;
                        onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                        makeTransformationSystem(): com.google.ar.sceneform.ux.TransformationSystem;
                        requestInstall(): boolean;
                        onRequestPermissionsResult(param0: number, param1: native.Array<string>, param2: native.Array<number>): void;
                        setCanRequestDangerousPermissions(param0: java.lang.Boolean): void;
                        setOnTapArPlaneListener(param0: com.google.ar.sceneform.ux.BaseArFragment.OnTapArPlaneListener): void;
                        onPause(): void;
                        onDestroyView(): void;
                        onDestroy(): void;
                        onPeekTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        getTransformationSystem(): com.google.ar.sceneform.ux.TransformationSystem;
                        isArRequired(): boolean;
                        onCreateView(param0: globalAndroid.view.LayoutInflater, param1: globalAndroid.view.ViewGroup, param2: globalAndroid.os.Bundle): globalAndroid.view.View;
                        constructor();
                        handleSessionException(param0: com.google.ar.core.exceptions.UnavailableException): void;
                        initializeSession(): void;
                        onResume(): void;
                        getPlaneDiscoveryController(): com.google.ar.sceneform.ux.PlaneDiscoveryController;
                        getCanRequestDangerousPermissions(): java.lang.Boolean;
                        getArSceneView(): com.google.ar.sceneform.ArSceneView;
                        getSessionFeatures(): java.util.Set<com.google.ar.core.Session.Feature>;
                        setupSelectionRenderable(param0: com.google.ar.sceneform.ux.FootprintSelectionVisualizer): void;
                        requestDangerousPermissions(): void;
                        getSessionConfiguration(param0: com.google.ar.core.Session): com.google.ar.core.Config;
                        onWindowFocusChanged(param0: boolean): void;
                        getAdditionalPermissions(): native.Array<string>;
                    }
                    module BaseArFragment {
                        class OnTapArPlaneListener {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.BaseArFragment.OnTapArPlaneListener>;
                            constructor(implementation: {
                                onTapPlane(param0: com.google.ar.core.HitResult, param1: com.google.ar.core.Plane, param2: globalAndroid.view.MotionEvent): void;
                            });
                            constructor();
                            onTapPlane(param0: com.google.ar.core.HitResult, param1: com.google.ar.core.Plane, param2: globalAndroid.view.MotionEvent): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    abstract class BaseGesture<T> extends java.lang.Object {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.BaseGesture<any>>;
                        gesturePointersUtility: com.google.ar.sceneform.ux.GesturePointersUtility;
                        targetNode: com.google.ar.sceneform.Node;
                        inchesToPixels(param0: number): number;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        complete(): void;
                        hasStarted(): boolean;
                        onStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        cancel(): void;
                        onCancel(): void;
                        onTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        onFinish(): void;
                        canStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        justStarted(): boolean;
                        pixelsToInches(param0: number): number;
                        hasFinished(): boolean;
                        updateGesture(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        getTargetNode(): com.google.ar.sceneform.Node;
                        setGestureEventListener(param0: com.google.ar.sceneform.ux.BaseGesture.OnGestureEventListener<T>): void;
                        wasCancelled(): boolean;
                        getSelf(): T;
                    }
                    module BaseGesture {
                        class OnGestureEventListener<T> extends java.lang.Object {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.BaseGesture.OnGestureEventListener<any>>;
                            constructor(implementation: {
                                onUpdated(param0: T): void;
                                onFinished(param0: T): void;
                            });
                            constructor();
                            onFinished(param0: T): void;
                            onUpdated(param0: T): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    abstract class BaseGestureRecognizer<T> extends java.lang.Object {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.BaseGestureRecognizer<any>>;
                        gesturePointersUtility: com.google.ar.sceneform.ux.GesturePointersUtility;
                        gestures: java.util.ArrayList<T>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        removeOnGestureStartedListener(param0: com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<T>): void;
                        tryCreateGestures(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        onTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        addOnGestureStartedListener(param0: com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<T>): void;
                    }
                    module BaseGestureRecognizer {
                        class OnGestureStartedListener<T> extends java.lang.Object {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<any>>;
                            constructor(implementation: {
                                onGestureStarted(param0: T): void;
                            });
                            constructor();
                            onGestureStarted(param0: T): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    abstract class BaseTransformableNode extends com.google.ar.sceneform.Node {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.BaseTransformableNode>;
                        isTransforming(): boolean;
                        onTap(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        removeTransformationController(param0: com.google.ar.sceneform.ux.BaseTransformationController<any>): void;
                        constructor(param0: com.google.ar.sceneform.ux.TransformationSystem);
                        isSelected(): boolean;
                        getTransformationSystem(): com.google.ar.sceneform.ux.TransformationSystem;
                        addTransformationController(param0: com.google.ar.sceneform.ux.BaseTransformationController<any>): void;
                        select(): boolean;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    abstract class BaseTransformationController<T> extends java.lang.Object {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.BaseTransformationController<any>>;
                        onEndTransformation(param0: T): void;
                        onContinueTransformation(param0: T): void;
                        onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                        canStartTransformation(param0: T): boolean;
                        onGestureStarted(param0: T): void;
                        isEnabled(): boolean;
                        setEnabled(param0: boolean): void;
                        onFinished(param0: T): void;
                        onActivated(param0: com.google.ar.sceneform.Node): void;
                        isTransforming(): boolean;
                        getActiveGesture(): T;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.BaseGestureRecognizer<T>);
                        onUpdated(param0: T): void;
                        onDeactivated(param0: com.google.ar.sceneform.Node): void;
                        getTransformableNode(): com.google.ar.sceneform.ux.BaseTransformableNode;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class DragGesture extends com.google.ar.sceneform.ux.BaseGesture<com.google.ar.sceneform.ux.DragGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.DragGesture>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        getSelf(): com.google.ar.sceneform.ux.DragGesture;
                        onStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        updateGesture(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        onCancel(): void;
                        getSelf(): any;
                        onFinish(): void;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility, param1: com.google.ar.sceneform.HitTestResult, param2: globalAndroid.view.MotionEvent);
                        canStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        getDelta(): com.google.ar.sceneform.math.Vector3;
                        getPosition(): com.google.ar.sceneform.math.Vector3;
                    }
                    module DragGesture {
                        class OnGestureEventListener extends com.google.ar.sceneform.ux.BaseGesture.OnGestureEventListener<com.google.ar.sceneform.ux.DragGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.DragGesture.OnGestureEventListener>;
                            constructor(implementation: {
                                onUpdated(param0: any): void;
                                onFinished(param0: any): void;
                            });
                            constructor();
                            onUpdated(param0: any): void;
                            onFinished(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class DragGestureRecognizer extends com.google.ar.sceneform.ux.BaseGestureRecognizer<com.google.ar.sceneform.ux.DragGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.DragGestureRecognizer>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        tryCreateGestures(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    }
                    module DragGestureRecognizer {
                        class OnGestureStartedListener extends com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<com.google.ar.sceneform.ux.DragGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.DragGestureRecognizer.OnGestureStartedListener>;
                            constructor(implementation: {
                                onGestureStarted(param0: any): void;
                            });
                            constructor();
                            onGestureStarted(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class FootprintSelectionVisualizer extends com.google.ar.sceneform.ux.SelectionVisualizer {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.FootprintSelectionVisualizer>;
                        applySelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                        constructor();
                        removeSelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                        setFootprintRenderable(param0: com.google.ar.sceneform.rendering.ModelRenderable): void;
                        getFootprintRenderable(): com.google.ar.sceneform.rendering.ModelRenderable;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class GesturePointersUtility {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.GesturePointersUtility>;
                        constructor(param0: globalAndroid.util.DisplayMetrics);
                        releasePointerId(param0: number): void;
                        inchesToPixels(param0: number): number;
                        pixelsToInches(param0: number): number;
                        static motionEventToPosition(param0: globalAndroid.view.MotionEvent, param1: number): com.google.ar.sceneform.math.Vector3;
                        isPointerIdRetained(param0: number): boolean;
                        retainPointerId(param0: number): void;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class HandMotionAnimation {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.HandMotionAnimation>;
                        applyTransformation(param0: number, param1: globalAndroid.view.animation.Transformation): void;
                        constructor(param0: globalAndroid.view.View, param1: globalAndroid.view.View);
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class HandMotionView {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.HandMotionView>;
                        constructor(param0: globalAndroid.content.Context);
                        onAttachedToWindow(): void;
                        constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class PinchGesture extends com.google.ar.sceneform.ux.BaseGesture<com.google.ar.sceneform.ux.PinchGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.PinchGesture>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        gapDeltaInches(): number;
                        cancel(): void;
                        onStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        onCancel(): void;
                        getSelf(): any;
                        getGapDelta(): number;
                        onFinish(): void;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility, param1: globalAndroid.view.MotionEvent, param2: number);
                        canStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        getGap(): number;
                        gapInches(): number;
                        updateGesture(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        getSelf(): com.google.ar.sceneform.ux.PinchGesture;
                    }
                    module PinchGesture {
                        class OnGestureEventListener extends com.google.ar.sceneform.ux.BaseGesture.OnGestureEventListener<com.google.ar.sceneform.ux.PinchGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.PinchGesture.OnGestureEventListener>;
                            constructor(implementation: {
                                onUpdated(param0: any): void;
                                onFinished(param0: any): void;
                            });
                            constructor();
                            onUpdated(param0: any): void;
                            onFinished(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class PinchGestureRecognizer extends com.google.ar.sceneform.ux.BaseGestureRecognizer<com.google.ar.sceneform.ux.PinchGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.PinchGestureRecognizer>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        tryCreateGestures(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    }
                    module PinchGestureRecognizer {
                        class OnGestureStartedListener extends com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<com.google.ar.sceneform.ux.PinchGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.PinchGestureRecognizer.OnGestureStartedListener>;
                            constructor(implementation: {
                                onGestureStarted(param0: any): void;
                            });
                            constructor();
                            onGestureStarted(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class PlaneDiscoveryController {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.PlaneDiscoveryController>;
                        setInstructionView(param0: globalAndroid.view.View): void;
                        show(): void;
                        constructor(param0: globalAndroid.view.View);
                        hide(): void;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class RotationController extends com.google.ar.sceneform.ux.BaseTransformationController<com.google.ar.sceneform.ux.TwistGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.RotationController>;
                        canStartTransformation(param0: com.google.ar.sceneform.ux.TwistGesture): boolean;
                        onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                        onGestureStarted(param0: any): void;
                        onFinished(param0: any): void;
                        onEndTransformation(param0: any): void;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.TwistGestureRecognizer);
                        onEndTransformation(param0: com.google.ar.sceneform.ux.TwistGesture): void;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.BaseGestureRecognizer<any>);
                        onContinueTransformation(param0: any): void;
                        getRotationRateDegrees(): number;
                        setRotationRateDegrees(param0: number): void;
                        onContinueTransformation(param0: com.google.ar.sceneform.ux.TwistGesture): void;
                        onUpdated(param0: any): void;
                        canStartTransformation(param0: any): boolean;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class ScaleController extends com.google.ar.sceneform.ux.BaseTransformationController<com.google.ar.sceneform.ux.PinchGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.ScaleController>;
                        static DEFAULT_MIN_SCALE: number;
                        static DEFAULT_MAX_SCALE: number;
                        static DEFAULT_SENSITIVITY: number;
                        static DEFAULT_ELASTICITY: number;
                        setMinScale(param0: number): void;
                        setSensitivity(param0: number): void;
                        onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                        setMaxScale(param0: number): void;
                        onGestureStarted(param0: any): void;
                        onFinished(param0: any): void;
                        canStartTransformation(param0: com.google.ar.sceneform.ux.PinchGesture): boolean;
                        getMaxScale(): number;
                        getMinScale(): number;
                        getElasticity(): number;
                        onEndTransformation(param0: any): void;
                        onActivated(param0: com.google.ar.sceneform.Node): void;
                        onContinueTransformation(param0: com.google.ar.sceneform.ux.PinchGesture): void;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.BaseGestureRecognizer<any>);
                        onContinueTransformation(param0: any): void;
                        onEndTransformation(param0: com.google.ar.sceneform.ux.PinchGesture): void;
                        getSensitivity(): number;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.PinchGestureRecognizer);
                        setElasticity(param0: number): void;
                        onUpdated(param0: any): void;
                        canStartTransformation(param0: any): boolean;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class SelectionVisualizer {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.SelectionVisualizer>;
                        constructor(implementation: {
                            applySelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                            removeSelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                        });
                        constructor();
                        applySelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                        removeSelectionVisual(param0: com.google.ar.sceneform.ux.BaseTransformableNode): void;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class TransformableNode extends com.google.ar.sceneform.ux.BaseTransformableNode {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.TransformableNode>;
                        getTranslationController(): com.google.ar.sceneform.ux.TranslationController;
                        constructor(param0: com.google.ar.sceneform.ux.TransformationSystem);
                        getScaleController(): com.google.ar.sceneform.ux.ScaleController;
                        getRotationController(): com.google.ar.sceneform.ux.RotationController;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class TransformationSystem {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.TransformationSystem>;
                        getSelectionVisualizer(): com.google.ar.sceneform.ux.SelectionVisualizer;
                        getTwistRecognizer(): com.google.ar.sceneform.ux.TwistGestureRecognizer;
                        setSelectionVisualizer(param0: com.google.ar.sceneform.ux.SelectionVisualizer): void;
                        getSelectedNode(): com.google.ar.sceneform.ux.BaseTransformableNode;
                        getDragRecognizer(): com.google.ar.sceneform.ux.DragGestureRecognizer;
                        onTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        addGestureRecognizer(param0: com.google.ar.sceneform.ux.BaseGestureRecognizer<any>): void;
                        selectNode(param0: com.google.ar.sceneform.ux.BaseTransformableNode): boolean;
                        getGesturePointersUtility(): com.google.ar.sceneform.ux.GesturePointersUtility;
                        constructor(param0: globalAndroid.util.DisplayMetrics, param1: com.google.ar.sceneform.ux.SelectionVisualizer);
                        getPinchRecognizer(): com.google.ar.sceneform.ux.PinchGestureRecognizer;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class TranslationController extends com.google.ar.sceneform.ux.BaseTransformationController<com.google.ar.sceneform.ux.DragGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.TranslationController>;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.DragGestureRecognizer);
                        setAllowedPlaneTypes(param0: java.util.EnumSet<com.google.ar.core.Plane.Type>): void;
                        onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                        onGestureStarted(param0: any): void;
                        onEndTransformation(param0: com.google.ar.sceneform.ux.DragGesture): void;
                        onFinished(param0: any): void;
                        canStartTransformation(param0: com.google.ar.sceneform.ux.DragGesture): boolean;
                        onEndTransformation(param0: any): void;
                        onContinueTransformation(param0: com.google.ar.sceneform.ux.DragGesture): void;
                        isTransforming(): boolean;
                        getAllowedPlaneTypes(): java.util.EnumSet<com.google.ar.core.Plane.Type>;
                        constructor(param0: com.google.ar.sceneform.ux.BaseTransformableNode, param1: com.google.ar.sceneform.ux.BaseGestureRecognizer<any>);
                        onContinueTransformation(param0: any): void;
                        onUpdated(param0: any): void;
                        canStartTransformation(param0: any): boolean;
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class TwistGesture extends com.google.ar.sceneform.ux.BaseGesture<com.google.ar.sceneform.ux.TwistGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.TwistGesture>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        getSelf(): com.google.ar.sceneform.ux.TwistGesture;
                        getDeltaRotationDegrees(): number;
                        onStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        updateGesture(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        onCancel(): void;
                        getSelf(): any;
                        onFinish(): void;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility, param1: globalAndroid.view.MotionEvent, param2: number);
                        canStart(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                    }
                    module TwistGesture {
                        class OnGestureEventListener extends com.google.ar.sceneform.ux.BaseGesture.OnGestureEventListener<com.google.ar.sceneform.ux.TwistGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.TwistGesture.OnGestureEventListener>;
                            constructor(implementation: {
                                onUpdated(param0: any): void;
                                onFinished(param0: any): void;
                            });
                            constructor();
                            onUpdated(param0: any): void;
                            onFinished(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                module ux {
                    class TwistGestureRecognizer extends com.google.ar.sceneform.ux.BaseGestureRecognizer<com.google.ar.sceneform.ux.TwistGesture> {
                        static class: java.lang.Class<com.google.ar.sceneform.ux.TwistGestureRecognizer>;
                        constructor(param0: com.google.ar.sceneform.ux.GesturePointersUtility);
                        tryCreateGestures(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    }
                    module TwistGestureRecognizer {
                        class OnGestureStartedListener extends com.google.ar.sceneform.ux.BaseGestureRecognizer.OnGestureStartedListener<com.google.ar.sceneform.ux.TwistGesture> {
                            static class: java.lang.Class<com.google.ar.sceneform.ux.TwistGestureRecognizer.OnGestureStartedListener>;
                            constructor(implementation: {
                                onGestureStarted(param0: any): void;
                            });
                            constructor();
                            onGestureStarted(param0: any): void;
                        }
                    }
                }
            }
        }
    }
}
