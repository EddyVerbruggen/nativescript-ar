/// <reference path="android-declarations.d.ts" />
declare module com {
    module google {
        module ar {
            module sceneform {
                class AnchorNode extends com.google.ar.sceneform.Node {
                    static class: java.lang.Class<com.google.ar.sceneform.AnchorNode>;
                    isTracking(): boolean;
                    onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                    getAnchor(): com.google.ar.core.Anchor;
                    setWorldPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                    setAnchor(param0: com.google.ar.core.Anchor): void;
                    constructor();
                    setLocalRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    constructor(param0: com.google.ar.core.Anchor);
                    isSmoothed(): boolean;
                    setWorldRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    setSmoothed(param0: boolean): void;
                    setLocalPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class ArSceneView extends com.google.ar.sceneform.SceneView {
                    static class: java.lang.Class<com.google.ar.sceneform.ArSceneView>;
                    getPlaneRenderer(): com.google.ar.sceneform.rendering.PlaneRenderer;
                    getArFrame(): com.google.ar.core.Frame;
                    isLightDirectionUpdateEnabled(): boolean;
                    isEnvironmentalHdrLightingAvailable(): boolean;
                    getCameraStreamRenderPriority(): number;
                    setLightDirectionUpdateEnabled(param0: boolean): void;
                    resumeAsync(param0: java.util.concurrent.Executor): java.util.concurrent.CompletableFuture<java.lang.Void>;
                    pauseAsync(param0: java.util.concurrent.Executor): java.util.concurrent.CompletableFuture<java.lang.Void>;
                    constructor(param0: globalAndroid.content.Context);
                    constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
                    setLightEstimationEnabled(param0: boolean): void;
                    pause(): void;
                    getSession(): com.google.ar.core.Session;
                    resume(): void;
                    isLightEstimationEnabled(): boolean;
                    onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
                    setCameraStreamRenderPriority(param0: number): void;
                    setupSession(param0: com.google.ar.core.Session): void;
                    onBeginFrame(param0: number): boolean;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class Camera extends com.google.ar.sceneform.Node {
                    static class: java.lang.Class<com.google.ar.sceneform.Camera>;
                    getFarClipPlane(): number;
                    setWorldPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                    updateTrackedPose(param0: com.google.ar.core.Camera): void;
                    screenPointToRay(param0: number, param1: number): com.google.ar.sceneform.collision.Ray;
                    setLocalRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    setFarClipPlane(param0: number): void;
                    getProjectionMatrix(): com.google.ar.sceneform.math.Matrix;
                    getNearClipPlane(): number;
                    setLocalPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                    setParent(param0: com.google.ar.sceneform.NodeParent): void;
                    getViewMatrix(): com.google.ar.sceneform.math.Matrix;
                    setProjectionMatrix(param0: com.google.ar.sceneform.math.Matrix): void;
                    worldToScreenPoint(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.math.Vector3;
                    setWorldRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    setNearClipPlane(param0: number): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class FrameTime {
                    static class: java.lang.Class<com.google.ar.sceneform.FrameTime>;
                    getStartSeconds(): number;
                    getStartTime(param0: java.util.concurrent.TimeUnit): number;
                    getDeltaSeconds(): number;
                    getDeltaTime(param0: java.util.concurrent.TimeUnit): number;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class HitTestResult {
                    static class: java.lang.Class<com.google.ar.sceneform.HitTestResult>;
                    reset(): void;
                    constructor();
                    set(param0: com.google.ar.sceneform.HitTestResult): void;
                    getNode(): com.google.ar.sceneform.Node;
                    setNode(param0: com.google.ar.sceneform.Node): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class Node extends com.google.ar.sceneform.NodeParent {
                    static class: java.lang.Class<com.google.ar.sceneform.Node>;
                    onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                    setCollisionShape(param0: com.google.ar.sceneform.collision.CollisionShape): void;
                    setWorldPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                    getDown(): com.google.ar.sceneform.math.Vector3;
                    getLight(): com.google.ar.sceneform.rendering.Light;
                    getWorldModelMatrix(): com.google.ar.sceneform.math.Matrix;
                    setLocalRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    localToWorldDirection(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.math.Vector3;
                    callOnHierarchy(param0: any): void;
                    setParent(param0: com.google.ar.sceneform.NodeParent): void;
                    worldToLocalPoint(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.math.Vector3;
                    addLifecycleListener(param0: com.google.ar.sceneform.Node.LifecycleListener): void;
                    constructor();
                    getLeft(): com.google.ar.sceneform.math.Vector3;
                    onRemoveChild(param0: com.google.ar.sceneform.Node): void;
                    isEnabled(): boolean;
                    getRight(): com.google.ar.sceneform.math.Vector3;
                    setEnabled(param0: boolean): void;
                    setLookDirection(param0: com.google.ar.sceneform.math.Vector3): void;
                    getWorldRotation(): com.google.ar.sceneform.math.Quaternion;
                    getForward(): com.google.ar.sceneform.math.Vector3;
                    onTouchEvent(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                    setName(param0: string): void;
                    isActive(): boolean;
                    setOnTouchListener(param0: com.google.ar.sceneform.Node.OnTouchListener): void;
                    getUp(): com.google.ar.sceneform.math.Vector3;
                    setLookDirection(param0: com.google.ar.sceneform.math.Vector3, param1: com.google.ar.sceneform.math.Vector3): void;
                    setLight(param0: com.google.ar.sceneform.rendering.Light): void;
                    setLocalScale(param0: com.google.ar.sceneform.math.Vector3): void;
                    isTopLevel(): boolean;
                    getWorldPosition(): com.google.ar.sceneform.math.Vector3;
                    getRenderable(): com.google.ar.sceneform.rendering.Renderable;
                    isDescendantOf(param0: com.google.ar.sceneform.NodeParent): boolean;
                    setWorldScale(param0: com.google.ar.sceneform.math.Vector3): void;
                    worldToLocalDirection(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.math.Vector3;
                    setRenderable(param0: com.google.ar.sceneform.rendering.Renderable): void;
                    setLocalPosition(param0: com.google.ar.sceneform.math.Vector3): void;
                    onDeactivate(): void;
                    toString(): string;
                    addTransformChangedListener(param0: com.google.ar.sceneform.Node.TransformChangedListener): void;
                    getWorldScale(): com.google.ar.sceneform.math.Vector3;
                    getScene(): com.google.ar.sceneform.Scene;
                    setWorldRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
                    localToWorldPoint(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.math.Vector3;
                    getParent(): com.google.ar.sceneform.Node;
                    findInHierarchy(param0: any): com.google.ar.sceneform.Node;
                    getLocalRotation(): com.google.ar.sceneform.math.Quaternion;
                    getLocalScale(): com.google.ar.sceneform.math.Vector3;
                    getCollisionShape(): com.google.ar.sceneform.collision.CollisionShape;
                    onTransformChange(param0: com.google.ar.sceneform.Node): void;
                    onActivate(): void;
                    removeLifecycleListener(param0: com.google.ar.sceneform.Node.LifecycleListener): void;
                    canAddChild(param0: com.google.ar.sceneform.Node, param1: java.lang.StringBuilder): boolean;
                    getName(): string;
                    setOnTapListener(param0: com.google.ar.sceneform.Node.OnTapListener): void;
                    onAddChild(param0: com.google.ar.sceneform.Node): void;
                    getBack(): com.google.ar.sceneform.math.Vector3;
                    removeTransformChangedListener(param0: com.google.ar.sceneform.Node.TransformChangedListener): void;
                    getLocalPosition(): com.google.ar.sceneform.math.Vector3;
                }
                module Node {
                    class LifecycleListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Node.LifecycleListener>;
                        constructor(implementation: {
                            onActivated(param0: com.google.ar.sceneform.Node): void;
                            onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                            onDeactivated(param0: com.google.ar.sceneform.Node): void;
                        });
                        constructor();
                        onUpdated(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.FrameTime): void;
                        onDeactivated(param0: com.google.ar.sceneform.Node): void;
                        onActivated(param0: com.google.ar.sceneform.Node): void;
                    }
                    class OnTapListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Node.OnTapListener>;
                        constructor(implementation: {
                            onTap(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        });
                        constructor();
                        onTap(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    }
                    class OnTouchListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Node.OnTouchListener>;
                        constructor(implementation: {
                            onTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        });
                        constructor();
                        onTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                    }
                    class TapTrackingData {
                        static class: java.lang.Class<com.google.ar.sceneform.Node.TapTrackingData>;
                    }
                    class TransformChangedListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Node.TransformChangedListener>;
                        constructor(implementation: {
                            onTransformChanged(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.Node): void;
                        });
                        constructor();
                        onTransformChanged(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.Node): void;
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
                class NodeParent {
                    static class: java.lang.Class<com.google.ar.sceneform.NodeParent>;
                    findInHierarchy(param0: any): com.google.ar.sceneform.Node;
                    canAddChild(param0: com.google.ar.sceneform.Node, param1: java.lang.StringBuilder): boolean;
                    constructor();
                    findByName(param0: string): com.google.ar.sceneform.Node;
                    removeChild(param0: com.google.ar.sceneform.Node): void;
                    onAddChild(param0: com.google.ar.sceneform.Node): void;
                    onRemoveChild(param0: com.google.ar.sceneform.Node): void;
                    getChildren(): java.util.List<com.google.ar.sceneform.Node>;
                    callOnHierarchy(param0: any): void;
                    addChild(param0: com.google.ar.sceneform.Node): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class Scene extends com.google.ar.sceneform.NodeParent {
                    static class: java.lang.Class<com.google.ar.sceneform.Scene>;
                    getView(): com.google.ar.sceneform.SceneView;
                    hitTestAll(param0: com.google.ar.sceneform.collision.Ray): java.util.ArrayList<com.google.ar.sceneform.HitTestResult>;
                    addOnUpdateListener(param0: com.google.ar.sceneform.Scene.OnUpdateListener): void;
                    hitTest(param0: globalAndroid.view.MotionEvent): com.google.ar.sceneform.HitTestResult;
                    setOnTouchListener(param0: com.google.ar.sceneform.Scene.OnTouchListener): void;
                    getLightProbe(): com.google.ar.sceneform.rendering.LightProbe;
                    overlapTest(param0: com.google.ar.sceneform.Node): com.google.ar.sceneform.Node;
                    hitTest(param0: com.google.ar.sceneform.collision.Ray): com.google.ar.sceneform.HitTestResult;
                    constructor(param0: com.google.ar.sceneform.SceneView);
                    addOnPeekTouchListener(param0: com.google.ar.sceneform.Scene.OnPeekTouchListener): void;
                    setLightProbe(param0: com.google.ar.sceneform.rendering.LightProbe): void;
                    getSunlight(): com.google.ar.sceneform.Node;
                    overlapTestAll(param0: com.google.ar.sceneform.Node): java.util.ArrayList<com.google.ar.sceneform.Node>;
                    removeOnUpdateListener(param0: com.google.ar.sceneform.Scene.OnUpdateListener): void;
                    constructor();
                    setLightEstimate(param0: com.google.ar.sceneform.rendering.Color, param1: number): void;
                    onAddChild(param0: com.google.ar.sceneform.Node): void;
                    onRemoveChild(param0: com.google.ar.sceneform.Node): void;
                    hitTestAll(param0: globalAndroid.view.MotionEvent): java.util.ArrayList<com.google.ar.sceneform.HitTestResult>;
                    getCamera(): com.google.ar.sceneform.Camera;
                    removeOnPeekTouchListener(param0: com.google.ar.sceneform.Scene.OnPeekTouchListener): void;
                }
                module Scene {
                    class OnPeekTouchListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Scene.OnPeekTouchListener>;
                        constructor(implementation: {
                            onPeekTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                        });
                        constructor();
                        onPeekTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    }
                    class OnTouchListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Scene.OnTouchListener>;
                        constructor(implementation: {
                            onSceneTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                        });
                        constructor();
                        onSceneTouch(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): boolean;
                    }
                    class OnUpdateListener {
                        static class: java.lang.Class<com.google.ar.sceneform.Scene.OnUpdateListener>;
                        constructor(implementation: {
                            onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                        });
                        constructor();
                        onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
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
                class SceneView {
                    static class: java.lang.Class<com.google.ar.sceneform.SceneView>;
                    static reclaimReleasedResources(): number;
                    isDebugEnabled(): boolean;
                    doFrame(param0: number): void;
                    getRenderer(): com.google.ar.sceneform.rendering.Renderer;
                    stopMirroringToSurface(param0: globalAndroid.view.Surface): void;
                    constructor(param0: globalAndroid.content.Context);
                    constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
                    static destroyAllResources(): void;
                    destroy(): void;
                    pause(): void;
                    resume(): void;
                    setBackground(param0: globalAndroid.graphics.drawable.Drawable): void;
                    onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
                    onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
                    getScene(): com.google.ar.sceneform.Scene;
                    startMirroringToSurface(param0: globalAndroid.view.Surface, param1: number, param2: number, param3: number, param4: number): void;
                    enableDebug(param0: boolean): void;
                    onBeginFrame(param0: number): boolean;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class SequentialTask {
                    static class: java.lang.Class<com.google.ar.sceneform.SequentialTask>;
                    a(param0: java.lang.Runnable, param1: java.util.concurrent.Executor): java.util.concurrent.CompletableFuture<java.lang.Void>;
                    a(): boolean;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class SkeletonNode extends com.google.ar.sceneform.Node {
                    static class: java.lang.Class<com.google.ar.sceneform.SkeletonNode>;
                    onUpdate(param0: com.google.ar.sceneform.FrameTime): void;
                    constructor();
                    getBoneAttachment(param0: string): com.google.ar.sceneform.Node;
                    setBoneAttachment(param0: string, param1: com.google.ar.sceneform.Node): void;
                    setRenderable(param0: com.google.ar.sceneform.rendering.Renderable): void;
                }
                module SkeletonNode {
                    class NodeBinding extends com.google.ar.sceneform.Node.TransformChangedListener {
                        static class: java.lang.Class<com.google.ar.sceneform.SkeletonNode.NodeBinding>;
                        onTransformChanged(param0: com.google.ar.sceneform.Node, param1: com.google.ar.sceneform.Node): void;
                    }
                    class SkeletonSkinningModifier {
                        static class: java.lang.Class<com.google.ar.sceneform.SkeletonNode.SkeletonSkinningModifier>;
                        modifyMaterialBoneTransformsBuffer(param0: java.nio.FloatBuffer): java.nio.FloatBuffer;
                        isModifiedSinceLastRender(): boolean;
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
                class Sun extends com.google.ar.sceneform.Node {
                    static class: java.lang.Class<com.google.ar.sceneform.Sun>;
                    setParent(param0: com.google.ar.sceneform.NodeParent): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class TouchEventSystem {
                    static class: java.lang.Class<com.google.ar.sceneform.TouchEventSystem>;
                    addOnPeekTouchListener(param0: com.google.ar.sceneform.Scene.OnPeekTouchListener): void;
                    getOnTouchListener(): com.google.ar.sceneform.Scene.OnTouchListener;
                    constructor();
                    onTouchEvent(param0: com.google.ar.sceneform.HitTestResult, param1: globalAndroid.view.MotionEvent): void;
                    setOnTouchListener(param0: com.google.ar.sceneform.Scene.OnTouchListener): void;
                    removeOnPeekTouchListener(param0: com.google.ar.sceneform.Scene.OnPeekTouchListener): void;
                }
                module TouchEventSystem {
                    class TouchTarget {
                        static class: java.lang.Class<com.google.ar.sceneform.TouchEventSystem.TouchTarget>;
                        a: com.google.ar.sceneform.Node;
                        b: number;
                        c: com.google.ar.sceneform.TouchEventSystem.TouchTarget;
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
                class a {
                    static class: java.lang.Class<com.google.ar.sceneform.a>;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class b {
                    static class: java.lang.Class<com.google.ar.sceneform.b>;
                    run(): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class c {
                    static class: java.lang.Class<com.google.ar.sceneform.c>;
                    run(): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class d {
                    static class: java.lang.Class<com.google.ar.sceneform.d>;
                    run(): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class e {
                    static class: java.lang.Class<com.google.ar.sceneform.e>;
                    run(): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class f {
                    static class: java.lang.Class<com.google.ar.sceneform.f>;
                    accept(param0: any): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class g {
                    static class: java.lang.Class<com.google.ar.sceneform.g>;
                    onLayoutChange(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class h {
                    static class: java.lang.Class<com.google.ar.sceneform.h>;
                    test(param0: any): boolean;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class i {
                    static class: java.lang.Class<com.google.ar.sceneform.i>;
                    accept(param0: any, param1: any): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class j {
                    static class: java.lang.Class<com.google.ar.sceneform.j>;
                    accept(param0: any): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class k {
                    static class: java.lang.Class<com.google.ar.sceneform.k>;
                    get(): any;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class l {
                    static class: java.lang.Class<com.google.ar.sceneform.l>;
                    accept(param0: any): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class m {
                    static class: java.lang.Class<com.google.ar.sceneform.m>;
                    accept(param0: any): void;
                }
            }
        }
    }
}
declare module com {
    module google {
        module ar {
            module sceneform {
                class n {
                    static class: java.lang.Class<com.google.ar.sceneform.n>;
                    apply(param0: any): any;
                }
            }
        }
    }
}
