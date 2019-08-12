/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export abstract class AnimationData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.AnimationData>;
						public static createInstance(param0: native.Array<number>, param1: string): com.google.ar.sceneform.rendering.AnimationData;
						public getDurationMs(): number;
						public constructor();
						public static setFactory(param0: com.google.ar.sceneform.rendering.AnimationData.Factory): void;
						public static makeDefaultFactory(): com.google.ar.sceneform.rendering.AnimationData.Factory;
						public getName(): string;
					}
					export module AnimationData {
						export abstract class Factory {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.AnimationData.Factory>;
							public constructor();
							public create(param0: native.Array<number>, param1: string): com.google.ar.sceneform.rendering.AnimationData;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class AnimatorImpl {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.AnimatorImpl>;
						public static createInstance(param0: com.google.ar.sceneform.rendering.AnimationData, param1: com.google.ar.sceneform.rendering.ModelRenderable): com.google.ar.sceneform.rendering.AnimatorImpl;
						public pause(): void;
						public getStartDelayMs(): number;
						public setDurationMs(param0: number): void;
						public isRunning(): boolean;
						public getName(): string;
						public static setFactory(param0: com.google.ar.sceneform.rendering.AnimatorImpl.Factory): void;
						public getTarget(): com.google.ar.sceneform.rendering.ModelRenderable;
						public getDurationMs(): number;
						public resume(): void;
						public getTargetSkeletonRig(): com.google.ar.sceneform.rendering.SkeletonRig;
						public getAnimationData(): com.google.ar.sceneform.rendering.AnimationData;
						public getTotalDurationMs(): number;
						public setTarget(param0: com.google.ar.sceneform.rendering.ModelRenderable): void;
						public static makeDefaultFactory(): com.google.ar.sceneform.rendering.AnimatorImpl.Factory;
						public constructor();
						public cancel(): void;
						public setInterpolator(param0: globalAndroid.animation.TimeInterpolator): void;
						public end(): void;
						public setStartDelayMs(param0: number): void;
						public setRepeatCount(param0: number): void;
						public getRepeatCount(): number;
						public start(): void;
						public static createInstance(param0: com.google.ar.sceneform.rendering.AnimatorImpl): com.google.ar.sceneform.rendering.AnimatorImpl;
						public isStarted(): boolean;
					}
					export module AnimatorImpl {
						export abstract class Factory {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.AnimatorImpl.Factory>;
							public constructor();
							public create(param0: com.google.ar.sceneform.rendering.AnimationData, param1: com.google.ar.sceneform.rendering.ModelRenderable): com.google.ar.sceneform.rendering.AnimatorImpl;
							public create(param0: com.google.ar.sceneform.rendering.AnimatorImpl): com.google.ar.sceneform.rendering.AnimatorImpl;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class CameraProvider {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.CameraProvider>;
						/**
						 * Constructs a new instance of the com.google.ar.sceneform.rendering.CameraProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							isActive(): boolean;
							getNearClipPlane(): number;
							getFarClipPlane(): number;
							getViewMatrix(): com.google.ar.sceneform.math.Matrix;
							getProjectionMatrix(): com.google.ar.sceneform.math.Matrix;
							updateTrackedPose(param0: com.google.ar.core.Camera): void;
						});
						public constructor();
						public getNearClipPlane(): number;
						public getViewMatrix(): com.google.ar.sceneform.math.Matrix;
						public getProjectionMatrix(): com.google.ar.sceneform.math.Matrix;
						public isActive(): boolean;
						public getFarClipPlane(): number;
						public updateTrackedPose(param0: com.google.ar.core.Camera): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class CameraStream {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.CameraStream>;
						public setCameraMaterialToDefault(): void;
						public setRenderPriority(param0: number): void;
						public recalculateCameraUvs(param0: com.google.ar.core.Frame): void;
						public isTextureInitialized(): boolean;
						public constructor(param0: number, param1: com.google.ar.sceneform.rendering.Renderer);
						public setCameraMaterial(param0: com.google.ar.sceneform.rendering.Material): void;
						public initializeTexture(param0: com.google.ar.core.Frame): void;
						public getRenderPriority(): number;
					}
					export module CameraStream {
						export class CleanupCallback {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.CameraStream.CleanupCallback>;
							public run(): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class CleanupItem<T>  extends java.lang.ref.PhantomReference<any> {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.CleanupItem<any>>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class CleanupRegistry<T>  extends com.google.ar.sceneform.resources.ResourceHolder {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.CleanupRegistry<any>>;
						public constructor();
						public reclaimReleasedResources(): number;
						public constructor(param0: java.util.HashSet<com.google.ar.sceneform.rendering.CleanupItem<any>>, param1: java.lang.ref.ReferenceQueue<any>);
						public register(param0: any, param1: java.lang.Runnable): void;
						public destroyAllResources(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Color {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Color>;
						public r: number;
						public g: number;
						public b: number;
						public a: number;
						public set(param0: number, param1: number, param2: number): void;
						public constructor();
						public set(param0: com.google.ar.sceneform.rendering.Color): void;
						public set(param0: number, param1: number, param2: number, param3: number): void;
						public constructor(param0: number);
						public set(param0: number): void;
						public constructor(param0: com.google.ar.sceneform.rendering.Color);
						public inverseTonemap(): com.google.ar.sceneform.rendering.Color;
						public constructor(param0: number, param1: number, param2: number);
						public constructor(param0: number, param1: number, param2: number, param3: number);
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class DpToMetersViewSizer extends com.google.ar.sceneform.rendering.ViewSizer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.DpToMetersViewSizer>;
						public getDpPerMeters(): number;
						public getSize(param0: globalAndroid.view.View): com.google.ar.sceneform.math.Vector3;
						public constructor(param0: number);
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class EngineInstance {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.EngineInstance>;
						public static disableHeadlessEngine(): void;
						public constructor();
						public static enableHeadlessEngine(): void;
						public static isHeadlessMode(): boolean;
						public static getEngine(): com.google.ar.sceneform.rendering.IEngine;
						public static getGlContext(): globalAndroid.opengl.EGLContext;
						public static destroyEngine(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ExternalTexture {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ExternalTexture>;
						public constructor();
						public getSurfaceTexture(): globalAndroid.graphics.SurfaceTexture;
						public getSurface(): globalAndroid.view.Surface;
					}
					export module ExternalTexture {
						export class CleanupCallback {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.ExternalTexture.CleanupCallback>;
							public run(): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class FilamentEngineWrapper extends com.google.ar.sceneform.rendering.IEngine {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.FilamentEngineWrapper>;
						public destroyTexture(param0: com.google.android.filament.Texture): void;
						public destroyMaterialInstance(param0: com.google.android.filament.MaterialInstance): void;
						public destroy(): void;
						public destroySkybox(param0: com.google.android.filament.Skybox): void;
						public destroySwapChain(param0: com.google.android.filament.SwapChain): void;
						public flushAndWait(): void;
						public destroyView(param0: com.google.android.filament.View): void;
						public createSwapChain(param0: any): com.google.android.filament.SwapChain;
						public destroyMaterial(param0: com.google.android.filament.Material): void;
						public constructor(param0: com.google.android.filament.Engine);
						public destroyFence(param0: com.google.android.filament.Fence): void;
						public getLightManager(): com.google.android.filament.LightManager;
						public destroyStream(param0: com.google.android.filament.Stream): void;
						public getFilamentEngine(): com.google.android.filament.Engine;
						public destroyCamera(param0: com.google.android.filament.Camera): void;
						public createCamera(param0: number): com.google.android.filament.Camera;
						public createSwapChain(param0: any, param1: number): com.google.android.filament.SwapChain;
						public destroyRenderer(param0: com.google.android.filament.Renderer): void;
						public destroyEntity(param0: number): void;
						public createView(): com.google.android.filament.View;
						public createRenderer(): com.google.android.filament.Renderer;
						public isValid(): boolean;
						public destroyScene(param0: com.google.android.filament.Scene): void;
						public destroyIndirectLight(param0: com.google.android.filament.IndirectLight): void;
						public getRenderableManager(): com.google.android.filament.RenderableManager;
						public createScene(): com.google.android.filament.Scene;
						public destroyIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
						public destroyVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
						public createSwapChainFromNativeSurface(param0: com.google.android.filament.NativeSurface, param1: number): com.google.android.filament.SwapChain;
						public createCamera(): com.google.android.filament.Camera;
						public createFence(param0: com.google.android.filament.Fence.Type): com.google.android.filament.Fence;
						public getTransformManager(): com.google.android.filament.TransformManager;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class FixedHeightViewSizer extends com.google.ar.sceneform.rendering.ViewSizer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.FixedHeightViewSizer>;
						public getSize(param0: globalAndroid.view.View): com.google.ar.sceneform.math.Vector3;
						public constructor(param0: number);
						public getHeight(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class FixedWidthViewSizer extends com.google.ar.sceneform.rendering.ViewSizer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.FixedWidthViewSizer>;
						public getSize(param0: globalAndroid.view.View): com.google.ar.sceneform.math.Vector3;
						public getWidth(): number;
						public constructor(param0: number);
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class FutureHelper {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.FutureHelper>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class GLHelper {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.GLHelper>;
						public static destroyContext(param0: globalAndroid.opengl.EGLContext): void;
						public constructor();
						public static makeContext(param0: globalAndroid.opengl.EGLContext): globalAndroid.opengl.EGLContext;
						public static makeContext(): globalAndroid.opengl.EGLContext;
						public static createCameraTexture(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class HeadlessEngineWrapper extends com.google.ar.sceneform.rendering.IEngine {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.HeadlessEngineWrapper>;
						public destroyTexture(param0: com.google.android.filament.Texture): void;
						public destroyMaterialInstance(param0: com.google.android.filament.MaterialInstance): void;
						public static createEngine(): com.google.android.filament.Engine;
						public destroy(): void;
						public destroySkybox(param0: com.google.android.filament.Skybox): void;
						public destroySwapChain(param0: com.google.android.filament.SwapChain): void;
						public flushAndWait(): void;
						public destroyView(param0: com.google.android.filament.View): void;
						public createSwapChain(param0: any): com.google.android.filament.SwapChain;
						public destroyMaterial(param0: com.google.android.filament.Material): void;
						public destroyFence(param0: com.google.android.filament.Fence): void;
						public getLightManager(): com.google.android.filament.LightManager;
						public destroyStream(param0: com.google.android.filament.Stream): void;
						public getFilamentEngine(): com.google.android.filament.Engine;
						public destroyCamera(param0: com.google.android.filament.Camera): void;
						public createCamera(param0: number): com.google.android.filament.Camera;
						public createSwapChain(param0: any, param1: number): com.google.android.filament.SwapChain;
						public destroyRenderer(param0: com.google.android.filament.Renderer): void;
						public constructor();
						public destroyEntity(param0: number): void;
						public createView(): com.google.android.filament.View;
						public createRenderer(): com.google.android.filament.Renderer;
						public isValid(): boolean;
						public destroyScene(param0: com.google.android.filament.Scene): void;
						public destroyIndirectLight(param0: com.google.android.filament.IndirectLight): void;
						public getRenderableManager(): com.google.android.filament.RenderableManager;
						public createScene(): com.google.android.filament.Scene;
						public destroyIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
						public destroyVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
						public createSwapChainFromNativeSurface(param0: com.google.android.filament.NativeSurface, param1: number): com.google.android.filament.SwapChain;
						public createCamera(): com.google.android.filament.Camera;
						public createFence(param0: com.google.android.filament.Fence.Type): com.google.android.filament.Fence;
						public getTransformManager(): com.google.android.filament.TransformManager;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class IEngine {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.IEngine>;
						/**
						 * Constructs a new instance of the com.google.ar.sceneform.rendering.IEngine interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getFilamentEngine(): com.google.android.filament.Engine;
							isValid(): boolean;
							destroy(): void;
							createSwapChain(param0: any): com.google.android.filament.SwapChain;
							createSwapChain(param0: any, param1: number): com.google.android.filament.SwapChain;
							createSwapChainFromNativeSurface(param0: com.google.android.filament.NativeSurface, param1: number): com.google.android.filament.SwapChain;
							destroySwapChain(param0: com.google.android.filament.SwapChain): void;
							createView(): com.google.android.filament.View;
							destroyView(param0: com.google.android.filament.View): void;
							createRenderer(): com.google.android.filament.Renderer;
							destroyRenderer(param0: com.google.android.filament.Renderer): void;
							createCamera(): com.google.android.filament.Camera;
							createCamera(param0: number): com.google.android.filament.Camera;
							destroyCamera(param0: com.google.android.filament.Camera): void;
							createScene(): com.google.android.filament.Scene;
							destroyScene(param0: com.google.android.filament.Scene): void;
							destroyStream(param0: com.google.android.filament.Stream): void;
							createFence(param0: com.google.android.filament.Fence.Type): com.google.android.filament.Fence;
							destroyFence(param0: com.google.android.filament.Fence): void;
							destroyIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
							destroyVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
							destroyIndirectLight(param0: com.google.android.filament.IndirectLight): void;
							destroyMaterial(param0: com.google.android.filament.Material): void;
							destroyMaterialInstance(param0: com.google.android.filament.MaterialInstance): void;
							destroySkybox(param0: com.google.android.filament.Skybox): void;
							destroyTexture(param0: com.google.android.filament.Texture): void;
							destroyEntity(param0: number): void;
							getTransformManager(): com.google.android.filament.TransformManager;
							getLightManager(): com.google.android.filament.LightManager;
							getRenderableManager(): com.google.android.filament.RenderableManager;
							flushAndWait(): void;
						});
						public constructor();
						public destroyTexture(param0: com.google.android.filament.Texture): void;
						public destroyMaterialInstance(param0: com.google.android.filament.MaterialInstance): void;
						public destroy(): void;
						public destroySkybox(param0: com.google.android.filament.Skybox): void;
						public destroySwapChain(param0: com.google.android.filament.SwapChain): void;
						public flushAndWait(): void;
						public destroyView(param0: com.google.android.filament.View): void;
						public createSwapChain(param0: any): com.google.android.filament.SwapChain;
						public destroyMaterial(param0: com.google.android.filament.Material): void;
						public destroyFence(param0: com.google.android.filament.Fence): void;
						public getLightManager(): com.google.android.filament.LightManager;
						public destroyStream(param0: com.google.android.filament.Stream): void;
						public getFilamentEngine(): com.google.android.filament.Engine;
						public destroyCamera(param0: com.google.android.filament.Camera): void;
						public createCamera(param0: number): com.google.android.filament.Camera;
						public createSwapChain(param0: any, param1: number): com.google.android.filament.SwapChain;
						public destroyRenderer(param0: com.google.android.filament.Renderer): void;
						public destroyEntity(param0: number): void;
						public createView(): com.google.android.filament.View;
						public createRenderer(): com.google.android.filament.Renderer;
						public isValid(): boolean;
						public destroyScene(param0: com.google.android.filament.Scene): void;
						public destroyIndirectLight(param0: com.google.android.filament.IndirectLight): void;
						public getRenderableManager(): com.google.android.filament.RenderableManager;
						public createScene(): com.google.android.filament.Scene;
						public destroyIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
						public destroyVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
						public createSwapChainFromNativeSurface(param0: com.google.android.filament.NativeSurface, param1: number): com.google.android.filament.SwapChain;
						public createCamera(): com.google.android.filament.Camera;
						public createFence(param0: com.google.android.filament.Fence.Type): com.google.android.filament.Fence;
						public getTransformManager(): com.google.android.filament.TransformManager;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class IRenderableInternalData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.IRenderableInternalData>;
						/**
						 * Constructs a new instance of the com.google.ar.sceneform.rendering.IRenderableInternalData interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							setCenterAabb(param0: com.google.ar.sceneform.math.Vector3): void;
							getCenterAabb(): com.google.ar.sceneform.math.Vector3;
							setExtentsAabb(param0: com.google.ar.sceneform.math.Vector3): void;
							getExtentsAabb(): com.google.ar.sceneform.math.Vector3;
							getSizeAabb(): com.google.ar.sceneform.math.Vector3;
							setTransformScale(param0: number): void;
							getTransformScale(): number;
							setTransformOffset(param0: com.google.ar.sceneform.math.Vector3): void;
							getTransformOffset(): com.google.ar.sceneform.math.Vector3;
							getMeshes(): java.util.ArrayList<com.google.ar.sceneform.rendering.RenderableInternalData.MeshData>;
							setIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
							getIndexBuffer(): com.google.android.filament.IndexBuffer;
							setVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
							getVertexBuffer(): com.google.android.filament.VertexBuffer;
							setRawIndexBuffer(param0: java.nio.IntBuffer): void;
							getRawIndexBuffer(): java.nio.IntBuffer;
							setRawPositionBuffer(param0: java.nio.FloatBuffer): void;
							getRawPositionBuffer(): java.nio.FloatBuffer;
							setRawTangentsBuffer(param0: java.nio.FloatBuffer): void;
							getRawTangentsBuffer(): java.nio.FloatBuffer;
							setRawUvBuffer(param0: java.nio.FloatBuffer): void;
							getRawUvBuffer(): java.nio.FloatBuffer;
							setRawColorBuffer(param0: java.nio.FloatBuffer): void;
							getRawColorBuffer(): java.nio.FloatBuffer;
							buildInstanceData(param0: com.google.ar.sceneform.rendering.Renderable, param1: com.google.ar.sceneform.rendering.SkeletonRig, param2: number): void;
							dispose(): void;
						});
						public constructor();
						public setTransformOffset(param0: com.google.ar.sceneform.math.Vector3): void;
						public setVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
						public setRawUvBuffer(param0: java.nio.FloatBuffer): void;
						public getMeshes(): java.util.ArrayList<com.google.ar.sceneform.rendering.RenderableInternalData.MeshData>;
						public setIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
						public getIndexBuffer(): com.google.android.filament.IndexBuffer;
						public setRawTangentsBuffer(param0: java.nio.FloatBuffer): void;
						public getRawUvBuffer(): java.nio.FloatBuffer;
						public getRawColorBuffer(): java.nio.FloatBuffer;
						public getExtentsAabb(): com.google.ar.sceneform.math.Vector3;
						public setCenterAabb(param0: com.google.ar.sceneform.math.Vector3): void;
						public setRawColorBuffer(param0: java.nio.FloatBuffer): void;
						public setRawPositionBuffer(param0: java.nio.FloatBuffer): void;
						public getSizeAabb(): com.google.ar.sceneform.math.Vector3;
						public getCenterAabb(): com.google.ar.sceneform.math.Vector3;
						public buildInstanceData(param0: com.google.ar.sceneform.rendering.Renderable, param1: com.google.ar.sceneform.rendering.SkeletonRig, param2: number): void;
						public setRawIndexBuffer(param0: java.nio.IntBuffer): void;
						public setTransformScale(param0: number): void;
						public setExtentsAabb(param0: com.google.ar.sceneform.math.Vector3): void;
						public getRawIndexBuffer(): java.nio.IntBuffer;
						public getRawPositionBuffer(): java.nio.FloatBuffer;
						public dispose(): void;
						public getRawTangentsBuffer(): java.nio.FloatBuffer;
						public getTransformOffset(): com.google.ar.sceneform.math.Vector3;
						public getVertexBuffer(): com.google.android.filament.VertexBuffer;
						public getTransformScale(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Light {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Light>;
						public getLocalDirection(): com.google.ar.sceneform.math.Vector3;
						public setColor(param0: com.google.ar.sceneform.rendering.Color): void;
						public static builder(param0: com.google.ar.sceneform.rendering.Light.Type): com.google.ar.sceneform.rendering.Light.Builder;
						public getInnerConeAngle(): number;
						public setOuterConeAngle(param0: number): void;
						public getColor(): com.google.ar.sceneform.rendering.Color;
						public getType(): com.google.ar.sceneform.rendering.Light.Type;
						public getFalloffRadius(): number;
						public setInnerConeAngle(param0: number): void;
						public getLocalPosition(): com.google.ar.sceneform.math.Vector3;
						public setIntensity(param0: number): void;
						public getOuterConeAngle(): number;
						public setColorTemperature(param0: number): void;
						public setFalloffRadius(param0: number): void;
						public getIntensity(): number;
						public createInstance(param0: com.google.ar.sceneform.common.TransformProvider): com.google.ar.sceneform.rendering.LightInstance;
						public isShadowCastingEnabled(): boolean;
					}
					export module Light {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Light.Builder>;
							public setIntensity(param0: number): com.google.ar.sceneform.rendering.Light.Builder;
							public setFalloffRadius(param0: number): com.google.ar.sceneform.rendering.Light.Builder;
							public setColorTemperature(param0: number): com.google.ar.sceneform.rendering.Light.Builder;
							public setInnerConeAngle(param0: number): com.google.ar.sceneform.rendering.Light.Builder;
							public build(): com.google.ar.sceneform.rendering.Light;
							public setShadowCastingEnabled(param0: boolean): com.google.ar.sceneform.rendering.Light.Builder;
							public setOuterConeAngle(param0: number): com.google.ar.sceneform.rendering.Light.Builder;
							public setColor(param0: com.google.ar.sceneform.rendering.Color): com.google.ar.sceneform.rendering.Light.Builder;
						}
						export class LightChangedListener {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Light.LightChangedListener>;
							/**
							 * Constructs a new instance of the com.google.ar.sceneform.rendering.Light$LightChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onChange(): void;
							});
							public constructor();
							public onChange(): void;
						}
						export class Type {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Light.Type>;
							public static POINT: com.google.ar.sceneform.rendering.Light.Type;
							public static DIRECTIONAL: com.google.ar.sceneform.rendering.Light.Type;
							public static SPOTLIGHT: com.google.ar.sceneform.rendering.Light.Type;
							public static FOCUSED_SPOTLIGHT: com.google.ar.sceneform.rendering.Light.Type;
							public static values(): native.Array<com.google.ar.sceneform.rendering.Light.Type>;
							public static valueOf(param0: string): com.google.ar.sceneform.rendering.Light.Type;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class LightInstance {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.LightInstance>;
						public detachFromRenderer(): void;
						public attachToRenderer(param0: com.google.ar.sceneform.rendering.Renderer): void;
						public updateTransform(): void;
						public getLight(): com.google.ar.sceneform.rendering.Light;
						public dispose(): void;
						public finalize(): void;
					}
					export module LightInstance {
						export class LightInstanceChangeListener extends com.google.ar.sceneform.rendering.Light.LightChangedListener {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.LightInstance.LightInstanceChangeListener>;
							public onChange(): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class LightProbe {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.LightProbe>;
						public getRotation(): com.google.ar.sceneform.math.Quaternion;
						public setIntensity(param0: number): void;
						public setLightEstimate(param0: com.google.ar.sceneform.rendering.Color, param1: number): void;
						public isReady(): boolean;
						public getIntensity(): number;
						public setRotation(param0: com.google.ar.sceneform.math.Quaternion): void;
						public static builder(): com.google.ar.sceneform.rendering.LightProbe.Builder;
						public finalize(): void;
						public dispose(): void;
					}
					export module LightProbe {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.LightProbe.Builder>;
							public setSource(param0: java.util.concurrent.Callable<java.io.InputStream>): com.google.ar.sceneform.rendering.LightProbe.Builder;
							public setRotation(param0: com.google.ar.sceneform.math.Quaternion): com.google.ar.sceneform.rendering.LightProbe.Builder;
							public setIntensity(param0: number): com.google.ar.sceneform.rendering.LightProbe.Builder;
							public setSource(param0: globalAndroid.content.Context, param1: number): com.google.ar.sceneform.rendering.LightProbe.Builder;
							public setAssetName(param0: string): com.google.ar.sceneform.rendering.LightProbe.Builder;
							public build(): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.LightProbe>;
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri): com.google.ar.sceneform.rendering.LightProbe.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class LoadGltfListener {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.LoadGltfListener>;
						/**
						 * Constructs a new instance of the com.google.ar.sceneform.rendering.LoadGltfListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onFinishedReadingFiles(param0: number): void;
							onReadingFilesFailed(param0: java.lang.Exception): void;
							onFinishedLoadingModel(param0: number): void;
						});
						public constructor();
						public onFinishedLoadingModel(param0: number): void;
						public onFinishedReadingFiles(param0: number): void;
						public onReadingFilesFailed(param0: java.lang.Exception): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class LoadRenderableFromSfbTask<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.LoadRenderableFromSfbTask<any>>;
						public downloadAndProcessRenderable(param0: java.util.concurrent.Callable<java.io.InputStream>): java.util.concurrent.CompletableFuture<T>;
					}
					export module LoadRenderableFromSfbTask {
						export class ModelTexture {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.LoadRenderableFromSfbTask.ModelTexture>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class LullModel {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.LullModel>;
						public static fromLullWrapMode: native.Array<com.google.android.filament.TextureSampler.WrapMode>;
						public static isLullModel(param0: java.nio.ByteBuffer): boolean;
						public constructor();
						public static fromLullToMagFilter(param0: com.google.ar.schemas.lull.TextureDef): com.google.android.filament.TextureSampler.MagFilter;
						public static fromLullToMinFilter(param0: com.google.ar.schemas.lull.TextureDef): com.google.android.filament.TextureSampler.MinFilter;
						public static getByteCountPerVertex(param0: com.google.ar.schemas.lull.ModelInstanceDef): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Material {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Material>;
						public setInt3(param0: string, param1: number, param2: number, param3: number): void;
						public setTexture(param0: string, param1: com.google.ar.sceneform.rendering.Texture): void;
						public setFloat3(param0: string, param1: com.google.ar.sceneform.math.Vector3): void;
						public setFloat4(param0: string, param1: com.google.ar.sceneform.rendering.Color): void;
						public setFloat4(param0: string, param1: number, param2: number, param3: number, param4: number): void;
						public getExternalTexture(param0: string): com.google.ar.sceneform.rendering.ExternalTexture;
						public makeCopy(): com.google.ar.sceneform.rendering.Material;
						public setBoolean2(param0: string, param1: boolean, param2: boolean): void;
						public setBoolean4(param0: string, param1: boolean, param2: boolean, param3: boolean, param4: boolean): void;
						public setExternalTexture(param0: string, param1: com.google.ar.sceneform.rendering.ExternalTexture): void;
						public static builder(): com.google.ar.sceneform.rendering.Material.Builder;
						public setBoolean3(param0: string, param1: boolean, param2: boolean, param3: boolean): void;
						public setBoolean(param0: string, param1: boolean): void;
						public setInt2(param0: string, param1: number, param2: number): void;
						public setFloat(param0: string, param1: number): void;
						public setInt(param0: string, param1: number): void;
						public setFloat3(param0: string, param1: com.google.ar.sceneform.rendering.Color): void;
						public setFloat2(param0: string, param1: number, param2: number): void;
						public setFloat3(param0: string, param1: number, param2: number, param3: number): void;
						public setInt4(param0: string, param1: number, param2: number, param3: number, param4: number): void;
					}
					export module Material {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Material.Builder>;
							public setSource(param0: globalAndroid.content.Context, param1: number): com.google.ar.sceneform.rendering.Material.Builder;
							public setRegistryId(param0: any): com.google.ar.sceneform.rendering.Material.Builder;
							public setSource(param0: java.nio.ByteBuffer): com.google.ar.sceneform.rendering.Material.Builder;
							public build(): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri): com.google.ar.sceneform.rendering.Material.Builder;
							public setSource(param0: java.util.concurrent.Callable<java.io.InputStream>): com.google.ar.sceneform.rendering.Material.Builder;
						}
						export class CleanupCallback {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Material.CleanupCallback>;
							public run(): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class MaterialFactory {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialFactory>;
						public static MATERIAL_COLOR: string;
						public static MATERIAL_TEXTURE: string;
						public static MATERIAL_METALLIC: string;
						public static MATERIAL_ROUGHNESS: string;
						public static MATERIAL_REFLECTANCE: string;
						public static makeOpaqueWithColor(param0: globalAndroid.content.Context, param1: com.google.ar.sceneform.rendering.Color): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
						public constructor();
						public static makeOpaqueWithTexture(param0: globalAndroid.content.Context, param1: com.google.ar.sceneform.rendering.Texture): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
						public static makeTransparentWithColor(param0: globalAndroid.content.Context, param1: com.google.ar.sceneform.rendering.Color): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
						public static makeTransparentWithTexture(param0: globalAndroid.content.Context, param1: com.google.ar.sceneform.rendering.Texture): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class MaterialInternalData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialInternalData>;
						public onDispose(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class MaterialParameters {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters>;
					}
					export module MaterialParameters {
						export class Boolean2Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Boolean2Parameter>;
						}
						export class Boolean3Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Boolean3Parameter>;
						}
						export class Boolean4Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Boolean4Parameter>;
						}
						export class BooleanParameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.BooleanParameter>;
						}
						export class ExternalTextureParameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.ExternalTextureParameter>;
							public clone(): com.google.ar.sceneform.rendering.MaterialParameters.Parameter;
						}
						export class Float2Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Float2Parameter>;
						}
						export class Float3Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Float3Parameter>;
						}
						export class Float4Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Float4Parameter>;
						}
						export class FloatParameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.FloatParameter>;
						}
						export class Int2Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Int2Parameter>;
						}
						export class Int3Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Int3Parameter>;
						}
						export class Int4Parameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Int4Parameter>;
						}
						export class IntParameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.IntParameter>;
						}
						export abstract class Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.Parameter>;
							public clone(): com.google.ar.sceneform.rendering.MaterialParameters.Parameter;
						}
						export class TextureParameter extends com.google.ar.sceneform.rendering.MaterialParameters.Parameter {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.MaterialParameters.TextureParameter>;
							public clone(): com.google.ar.sceneform.rendering.MaterialParameters.Parameter;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ModelRenderable extends com.google.ar.sceneform.rendering.Renderable {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ModelRenderable>;
						public static builder(): com.google.ar.sceneform.rendering.ModelRenderable.Builder;
						public getBoneCount(): number;
						public getBoneParentIndex(param0: number): number;
						public onAnimationEngineUpdated(): void;
						public getBoneName(param0: number): string;
						public getAnimationData(param0: number): com.google.ar.sceneform.rendering.AnimationData;
						public getAnimationData(param0: string): com.google.ar.sceneform.rendering.AnimationData;
						public makeCopy(): com.google.ar.sceneform.rendering.ModelRenderable;
						public getAnimationDataCount(): number;
						public makeCopy(): com.google.ar.sceneform.rendering.Renderable;
					}
					export module ModelRenderable {
						export class Builder extends com.google.ar.sceneform.rendering.Renderable.Builder<com.google.ar.sceneform.rendering.ModelRenderable,com.google.ar.sceneform.rendering.ModelRenderable.Builder> {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.ModelRenderable.Builder>;
							public constructor();
							public getRenderableClass(): java.lang.Class<com.google.ar.sceneform.rendering.ModelRenderable>;
							public getSelf(): any;
							public getRenderableClass(): java.lang.Class<any>;
							public getRenderableRegistry(): com.google.ar.sceneform.resources.ResourceRegistry<any>;
							public makeRenderable(): com.google.ar.sceneform.rendering.ModelRenderable;
							public getSelf(): com.google.ar.sceneform.rendering.ModelRenderable.Builder;
							public makeRenderable(): any;
							public getRenderableRegistry(): com.google.ar.sceneform.resources.ResourceRegistry<com.google.ar.sceneform.rendering.ModelRenderable>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class PlaneRenderer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.PlaneRenderer>;
						public static MATERIAL_TEXTURE: string;
						public static MATERIAL_UV_SCALE: string;
						public static MATERIAL_COLOR: string;
						public static MATERIAL_SPOTLIGHT_RADIUS: string;
						public getMaterial(): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Material>;
						public constructor(param0: com.google.ar.sceneform.rendering.Renderer);
						public isVisible(): boolean;
						public update(param0: com.google.ar.core.Frame, param1: number, param2: number): void;
						public setShadowReceiver(param0: boolean): void;
						public isShadowReceiver(): boolean;
						public isEnabled(): boolean;
						public setVisible(param0: boolean): void;
						public setEnabled(param0: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class PlaneVisualizer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.PlaneVisualizer>;
						public setShadowReceiver(param0: boolean): void;
						public setVisible(param0: boolean): void;
						public setEnabled(param0: boolean): void;
						public getWorldModelMatrix(): com.google.ar.sceneform.math.Matrix;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class RenderViewToExternalTexture {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderViewToExternalTexture>;
						public onSizeChanged(param0: number, param1: number, param2: number, param3: number): void;
						public onAttachedToWindow(): void;
						public dispatchDraw(param0: globalAndroid.graphics.Canvas): void;
						public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					}
					export module RenderViewToExternalTexture {
						export class OnViewSizeChangedListener {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderViewToExternalTexture.OnViewSizeChangedListener>;
							/**
							 * Constructs a new instance of the com.google.ar.sceneform.rendering.RenderViewToExternalTexture$OnViewSizeChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onViewSizeChanged(param0: number, param1: number): void;
							});
							public constructor();
							public onViewSizeChanged(param0: number, param1: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export abstract class Renderable {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Renderable>;
						public collisionShape: com.google.ar.sceneform.collision.CollisionShape;
						public static RENDER_PRIORITY_DEFAULT: number;
						public static RENDER_PRIORITY_FIRST: number;
						public static RENDER_PRIORITY_LAST: number;
						public getId(): com.google.ar.sceneform.utilities.ChangeId;
						public getSubmeshCount(): number;
						public setMaterial(param0: number, param1: com.google.ar.sceneform.rendering.Material): void;
						public getSubmeshName(param0: number): string;
						public setShadowReceiver(param0: boolean): void;
						public isShadowReceiver(): boolean;
						public updateFromDefinition(param0: com.google.ar.sceneform.rendering.RenderableDefinition): void;
						public constructor(param0: com.google.ar.sceneform.rendering.Renderable.Builder<any,any>);
						public constructor(param0: com.google.ar.sceneform.rendering.Renderable);
						public setShadowCaster(param0: boolean): void;
						public createInstance(param0: com.google.ar.sceneform.common.TransformProvider): com.google.ar.sceneform.rendering.RenderableInstance;
						public makeCopy(): com.google.ar.sceneform.rendering.Renderable;
						public setCollisionShape(param0: com.google.ar.sceneform.collision.CollisionShape): void;
						public isShadowCaster(): boolean;
						public setRenderPriority(param0: number): void;
						public getMaterial(): com.google.ar.sceneform.rendering.Material;
						public getCollisionShape(): com.google.ar.sceneform.collision.CollisionShape;
						public getFinalModelMatrix(param0: com.google.ar.sceneform.math.Matrix): com.google.ar.sceneform.math.Matrix;
						public getMaterial(param0: number): com.google.ar.sceneform.rendering.Material;
						public setMaterial(param0: com.google.ar.sceneform.rendering.Material): void;
						public getRenderPriority(): number;
					}
					export module Renderable {
						export abstract class Builder<T, B>  extends java.lang.Object {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Renderable.Builder<any,any>>;
							public registryId: any;
							public context: globalAndroid.content.Context;
							public constructor();
							public build(): java.util.concurrent.CompletableFuture<T>;
							public getRenderableClass(): java.lang.Class<T>;
							public getSelf(): B;
							public getRenderableRegistry(): com.google.ar.sceneform.resources.ResourceRegistry<T>;
							public setSource(param0: globalAndroid.content.Context, param1: number): B;
							public setSource(param0: globalAndroid.content.Context, param1: java.util.concurrent.Callable<java.io.InputStream>): B;
							public setRegistryId(param0: any): B;
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri): B;
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri, param2: boolean): B;
							public makeRenderable(): T;
							public hasSource(): java.lang.Boolean;
							public checkPreconditions(): void;
							public setSource(param0: com.google.ar.sceneform.rendering.RenderableDefinition): B;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class RenderableDefinition {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableDefinition>;
						public setVertices(param0: java.util.List<com.google.ar.sceneform.rendering.Vertex>): void;
						public static builder(): com.google.ar.sceneform.rendering.RenderableDefinition.Builder;
						public setSubmeshes(param0: java.util.List<com.google.ar.sceneform.rendering.RenderableDefinition.Submesh>): void;
					}
					export module RenderableDefinition {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableDefinition.Builder>;
							public constructor();
							public build(): com.google.ar.sceneform.rendering.RenderableDefinition;
							public setVertices(param0: java.util.List<com.google.ar.sceneform.rendering.Vertex>): com.google.ar.sceneform.rendering.RenderableDefinition.Builder;
							public setSubmeshes(param0: java.util.List<com.google.ar.sceneform.rendering.RenderableDefinition.Submesh>): com.google.ar.sceneform.rendering.RenderableDefinition.Builder;
						}
						export class Submesh {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableDefinition.Submesh>;
							public getTriangleIndices(): java.util.List<java.lang.Integer>;
							public getMaterial(): com.google.ar.sceneform.rendering.Material;
							public setTriangleIndices(param0: java.util.List<java.lang.Integer>): void;
							public getName(): string;
							public setName(param0: string): void;
							public setMaterial(param0: com.google.ar.sceneform.rendering.Material): void;
							public static builder(): com.google.ar.sceneform.rendering.RenderableDefinition.Submesh.Builder;
						}
						export module Submesh {
							export class Builder {
								public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableDefinition.Submesh.Builder>;
								public setTriangleIndices(param0: java.util.List<java.lang.Integer>): com.google.ar.sceneform.rendering.RenderableDefinition.Submesh.Builder;
								public setName(param0: string): com.google.ar.sceneform.rendering.RenderableDefinition.Submesh.Builder;
								public build(): com.google.ar.sceneform.rendering.RenderableDefinition.Submesh;
								public constructor();
								public setMaterial(param0: com.google.ar.sceneform.rendering.Material): com.google.ar.sceneform.rendering.RenderableDefinition.Submesh.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class RenderableInstance {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableInstance>;
						public getRenderable(): com.google.ar.sceneform.rendering.Renderable;
						public detachFromRenderer(): void;
						public getSkeletonRig(): com.google.ar.sceneform.rendering.SkeletonRig;
						public constructor(param0: com.google.ar.sceneform.common.TransformProvider, param1: com.google.ar.sceneform.rendering.Renderable);
						public setSkinningModifier(param0: com.google.ar.sceneform.rendering.RenderableInstance.SkinningModifier): void;
						public getRenderedEntity(): number;
						public attachToRenderer(param0: com.google.ar.sceneform.rendering.Renderer): void;
						public getRelativeTransform(): com.google.ar.sceneform.math.Matrix;
						public getEntity(): number;
						public getWorldModelMatrix(): com.google.ar.sceneform.math.Matrix;
						public prepareForDraw(): void;
						public getRelativeTransformInverse(): com.google.ar.sceneform.math.Matrix;
					}
					export module RenderableInstance {
						export class CleanupCallback {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableInstance.CleanupCallback>;
							public run(): void;
						}
						export class SkinningModifier {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableInstance.SkinningModifier>;
							/**
							 * Constructs a new instance of the com.google.ar.sceneform.rendering.RenderableInstance$SkinningModifier interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								modifyMaterialBoneTransformsBuffer(param0: java.nio.FloatBuffer): java.nio.FloatBuffer;
								isModifiedSinceLastRender(): boolean;
							});
							public constructor();
							public modifyMaterialBoneTransformsBuffer(param0: java.nio.FloatBuffer): java.nio.FloatBuffer;
							public isModifiedSinceLastRender(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class RenderableInternalData extends com.google.ar.sceneform.rendering.IRenderableInternalData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableInternalData>;
						public setTransformOffset(param0: com.google.ar.sceneform.math.Vector3): void;
						public setVertexBuffer(param0: com.google.android.filament.VertexBuffer): void;
						public setRawUvBuffer(param0: java.nio.FloatBuffer): void;
						public getMeshes(): java.util.ArrayList<com.google.ar.sceneform.rendering.RenderableInternalData.MeshData>;
						public setIndexBuffer(param0: com.google.android.filament.IndexBuffer): void;
						public getIndexBuffer(): com.google.android.filament.IndexBuffer;
						public setRawTangentsBuffer(param0: java.nio.FloatBuffer): void;
						public getRawUvBuffer(): java.nio.FloatBuffer;
						public getRawColorBuffer(): java.nio.FloatBuffer;
						public getExtentsAabb(): com.google.ar.sceneform.math.Vector3;
						public setCenterAabb(param0: com.google.ar.sceneform.math.Vector3): void;
						public finalize(): void;
						public setRawColorBuffer(param0: java.nio.FloatBuffer): void;
						public setRawPositionBuffer(param0: java.nio.FloatBuffer): void;
						public getSizeAabb(): com.google.ar.sceneform.math.Vector3;
						public getCenterAabb(): com.google.ar.sceneform.math.Vector3;
						public buildInstanceData(param0: com.google.ar.sceneform.rendering.Renderable, param1: com.google.ar.sceneform.rendering.SkeletonRig, param2: number): void;
						public setRawIndexBuffer(param0: java.nio.IntBuffer): void;
						public setTransformScale(param0: number): void;
						public setExtentsAabb(param0: com.google.ar.sceneform.math.Vector3): void;
						public getRawIndexBuffer(): java.nio.IntBuffer;
						public getRawPositionBuffer(): java.nio.FloatBuffer;
						public dispose(): void;
						public getRawTangentsBuffer(): java.nio.FloatBuffer;
						public getTransformOffset(): com.google.ar.sceneform.math.Vector3;
						public getVertexBuffer(): com.google.android.filament.VertexBuffer;
						public getTransformScale(): number;
					}
					export module RenderableInternalData {
						export class MeshData {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.RenderableInternalData.MeshData>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Renderer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Renderer>;
						public setDynamicResolutionEnabled(param0: boolean): void;
						public setLightProbe(param0: com.google.ar.sceneform.rendering.LightProbe): void;
						public stopMirroring(param0: globalAndroid.view.Surface): void;
						public static destroyAllResources(): void;
						public isFrontFaceWindingInverted(): boolean;
						public onPause(): void;
						public setAntiAliasing(param0: com.google.android.filament.View.AntiAliasing): void;
						public onResized(param0: number, param1: number): void;
						public startMirroring(param0: globalAndroid.view.Surface, param1: number, param2: number, param3: number, param4: number): void;
						public onNativeWindowChanged(param0: globalAndroid.view.Surface): void;
						public getDesiredWidth(): number;
						public getDesiredHeight(): number;
						public setDesiredSize(param0: number, param1: number): void;
						public constructor(param0: globalAndroid.view.SurfaceView);
						public getSurfaceView(): globalAndroid.view.SurfaceView;
						public setDefaultClearColor(): void;
						public render(param0: boolean): void;
						public getContext(): globalAndroid.content.Context;
						public onResume(): void;
						public setDithering(param0: com.google.android.filament.View.Dithering): void;
						public dispose(): void;
						public static reclaimReleasedResources(): number;
						public setClearColor(param0: com.google.ar.sceneform.rendering.Color): void;
						public setCameraProvider(param0: com.google.ar.sceneform.rendering.CameraProvider): void;
						public setFrontFaceWindingInverted(param0: java.lang.Boolean): void;
						public onDetachedFromSurface(): void;
					}
					export module Renderer {
						export class Mirror {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Renderer.Mirror>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ResourceHelper {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ResourceHelper>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ResourceManager {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ResourceManager>;
						public addResourceHolder(param0: com.google.ar.sceneform.resources.ResourceHolder): void;
						public reclaimReleasedResources(): number;
						public static getInstance(): com.google.ar.sceneform.rendering.ResourceManager;
						public destroyAllResources(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class SceneformBundle {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.SceneformBundle>;
						public static RCB_MAJOR_VERSION: number;
						public static RCB_MINOR_VERSION: number;
						public constructor();
						public static readCollisionGeometry(param0: com.google.ar.schemas.sceneform.SceneformBundleDef): com.google.ar.sceneform.collision.CollisionShape;
						public static tryLoadSceneformBundle(param0: java.nio.ByteBuffer): com.google.ar.schemas.sceneform.SceneformBundleDef;
						public static isSceneformBundle(param0: java.nio.ByteBuffer): boolean;
					}
					export module SceneformBundle {
						export class VersionException {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.SceneformBundle.VersionException>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ShapeFactory {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ShapeFactory>;
						public constructor();
						public static makeCylinder(param0: number, param1: number, param2: com.google.ar.sceneform.math.Vector3, param3: com.google.ar.sceneform.rendering.Material): com.google.ar.sceneform.rendering.ModelRenderable;
						public static makeCube(param0: com.google.ar.sceneform.math.Vector3, param1: com.google.ar.sceneform.math.Vector3, param2: com.google.ar.sceneform.rendering.Material): com.google.ar.sceneform.rendering.ModelRenderable;
						public static makeSphere(param0: number, param1: com.google.ar.sceneform.math.Vector3, param2: com.google.ar.sceneform.rendering.Material): com.google.ar.sceneform.rendering.ModelRenderable;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class SkeletonRig {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.SkeletonRig>;
						public static FLOATS_PER_BONE: number;
						public static makeDefaultFactory(): com.google.ar.sceneform.rendering.SkeletonRig.Factory;
						public getMaterialBoneIndex(param0: number): number;
						public static initializeMatrix(param0: native.Array<number>, param1: com.google.ar.schemas.lull.Mat4x3): void;
						public getMaterialBoneCount(): number;
						public getMaterialBoneTransformsBuffer(): java.nio.FloatBuffer;
						public static initializeRow(param0: native.Array<number>, param1: number, param2: com.google.ar.schemas.lull.Vec4): void;
						public getMatrixForBone(param0: number, param1: com.google.ar.sceneform.math.Matrix): void;
						public getBoneName(param0: number): string;
						public constructor(param0: com.google.ar.schemas.lull.SkeletonDef, param1: com.google.ar.schemas.lull.ModelInstanceDef);
						public static makeBufferForBones(param0: number): java.nio.FloatBuffer;
						public constructor(param0: com.google.ar.sceneform.rendering.SkeletonRig);
						public getInverseBindPoseForBone(param0: number, param1: com.google.ar.sceneform.math.Matrix): void;
						public getBoneCount(): number;
						public static createInstance(param0: com.google.ar.schemas.lull.SkeletonDef, param1: com.google.ar.schemas.lull.ModelInstanceDef): com.google.ar.sceneform.rendering.SkeletonRig;
						public getBoneParentIndex(param0: number): number;
						public isAnimating(param0: com.google.ar.sceneform.rendering.ModelRenderable): boolean;
						public makeCopy(): com.google.ar.sceneform.rendering.SkeletonRig;
						public updateBoneTransforms(): void;
						public static setFactory(param0: com.google.ar.sceneform.rendering.SkeletonRig.Factory): void;
					}
					export module SkeletonRig {
						export abstract class Factory {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.SkeletonRig.Factory>;
							public constructor();
							public create(param0: com.google.ar.schemas.lull.SkeletonDef, param1: com.google.ar.schemas.lull.ModelInstanceDef): com.google.ar.sceneform.rendering.SkeletonRig;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Texture {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture>;
						public static builder(): com.google.ar.sceneform.rendering.Texture.Builder;
					}
					export module Texture {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Builder>;
							public setUsage(param0: com.google.ar.sceneform.rendering.Texture.Usage): com.google.ar.sceneform.rendering.Texture.Builder;
							public build(): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.Texture>;
							public setSource(param0: globalAndroid.graphics.Bitmap): com.google.ar.sceneform.rendering.Texture.Builder;
							public setRegistryId(param0: any): com.google.ar.sceneform.rendering.Texture.Builder;
							public setSource(param0: globalAndroid.content.Context, param1: number): com.google.ar.sceneform.rendering.Texture.Builder;
							public setSampler(param0: com.google.ar.sceneform.rendering.Texture.Sampler): com.google.ar.sceneform.rendering.Texture.Builder;
							public setSource(param0: java.util.concurrent.Callable<java.io.InputStream>): com.google.ar.sceneform.rendering.Texture.Builder;
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri): com.google.ar.sceneform.rendering.Texture.Builder;
						}
						export class CleanupCallback {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.CleanupCallback>;
							public run(): void;
						}
						export class Sampler {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Sampler>;
							public getMagFilter(): com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter;
							public getMinFilter(): com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
							public static builder(): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
							public getWrapModeR(): com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
							public getWrapModeT(): com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
							public getWrapModeS(): com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
						}
						export module Sampler {
							export class Builder {
								public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Sampler.Builder>;
								public build(): com.google.ar.sceneform.rendering.Texture.Sampler;
								public setMagFilter(param0: com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
								public constructor();
								public setMinFilter(param0: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
								public setWrapMode(param0: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
								public setWrapModeS(param0: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
								public setWrapModeT(param0: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
								public setWrapModeR(param0: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode): com.google.ar.sceneform.rendering.Texture.Sampler.Builder;
							}
							export class MagFilter {
								public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter>;
								public static NEAREST: com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter;
								public static LINEAR: com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter;
								public static valueOf(param0: string): com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter;
								public static values(): native.Array<com.google.ar.sceneform.rendering.Texture.Sampler.MagFilter>;
							}
							export class MinFilter {
								public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter>;
								public static NEAREST: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static LINEAR: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static NEAREST_MIPMAP_NEAREST: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static LINEAR_MIPMAP_NEAREST: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static NEAREST_MIPMAP_LINEAR: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static LINEAR_MIPMAP_LINEAR: com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static valueOf(param0: string): com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter;
								public static values(): native.Array<com.google.ar.sceneform.rendering.Texture.Sampler.MinFilter>;
							}
							export class WrapMode {
								public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode>;
								public static CLAMP_TO_EDGE: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
								public static REPEAT: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
								public static MIRRORED_REPEAT: com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
								public static values(): native.Array<com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode>;
								public static valueOf(param0: string): com.google.ar.sceneform.rendering.Texture.Sampler.WrapMode;
							}
						}
						export class Usage {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Texture.Usage>;
							public static COLOR: com.google.ar.sceneform.rendering.Texture.Usage;
							public static NORMAL: com.google.ar.sceneform.rendering.Texture.Usage;
							public static DATA: com.google.ar.sceneform.rendering.Texture.Usage;
							public static valueOf(param0: string): com.google.ar.sceneform.rendering.Texture.Usage;
							public static values(): native.Array<com.google.ar.sceneform.rendering.Texture.Usage>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class TextureInternalData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.TextureInternalData>;
						public constructor(param0: com.google.android.filament.Texture, param1: com.google.ar.sceneform.rendering.Texture.Sampler);
						public onDispose(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ThreadPools {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ThreadPools>;
						public static setThreadPoolExecutor(param0: java.util.concurrent.Executor): void;
						public static setMainExecutor(param0: java.util.concurrent.Executor): void;
						public static getMainExecutor(): java.util.concurrent.Executor;
						public static getThreadPoolExecutor(): java.util.concurrent.Executor;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class Vertex {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.Vertex>;
						public getUvCoordinate(): com.google.ar.sceneform.rendering.Vertex.UvCoordinate;
						public setColor(param0: com.google.ar.sceneform.rendering.Color): void;
						public setUvCoordinate(param0: com.google.ar.sceneform.rendering.Vertex.UvCoordinate): void;
						public setPosition(param0: com.google.ar.sceneform.math.Vector3): void;
						public static builder(): com.google.ar.sceneform.rendering.Vertex.Builder;
						public getColor(): com.google.ar.sceneform.rendering.Color;
						public setNormal(param0: com.google.ar.sceneform.math.Vector3): void;
						public getNormal(): com.google.ar.sceneform.math.Vector3;
						public getPosition(): com.google.ar.sceneform.math.Vector3;
					}
					export module Vertex {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Vertex.Builder>;
							public constructor();
							public setPosition(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.rendering.Vertex.Builder;
							public setColor(param0: com.google.ar.sceneform.rendering.Color): com.google.ar.sceneform.rendering.Vertex.Builder;
							public setNormal(param0: com.google.ar.sceneform.math.Vector3): com.google.ar.sceneform.rendering.Vertex.Builder;
							public build(): com.google.ar.sceneform.rendering.Vertex;
							public setUvCoordinate(param0: com.google.ar.sceneform.rendering.Vertex.UvCoordinate): com.google.ar.sceneform.rendering.Vertex.Builder;
						}
						export class UvCoordinate {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.Vertex.UvCoordinate>;
							public x: number;
							public y: number;
							public constructor(param0: number, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ViewAttachmentManager {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewAttachmentManager>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ViewRenderable extends com.google.ar.sceneform.rendering.Renderable {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderable>;
						public setSizer(param0: com.google.ar.sceneform.rendering.ViewSizer): void;
						public setHorizontalAlignment(param0: com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment): void;
						public getHorizontalAlignment(): com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment;
						public getVerticalAlignment(): com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment;
						public getView(): globalAndroid.view.View;
						public setVerticalAlignment(param0: com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment): void;
						public makeCopy(): com.google.ar.sceneform.rendering.ViewRenderable;
						public getFinalModelMatrix(param0: com.google.ar.sceneform.math.Matrix): com.google.ar.sceneform.math.Matrix;
						public getSizer(): com.google.ar.sceneform.rendering.ViewSizer;
						public static builder(): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
						public makeCopy(): com.google.ar.sceneform.rendering.Renderable;
						public finalize(): void;
					}
					export module ViewRenderable {
						export class Builder extends com.google.ar.sceneform.rendering.Renderable.Builder<com.google.ar.sceneform.rendering.ViewRenderable,com.google.ar.sceneform.rendering.ViewRenderable.Builder> {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderable.Builder>;
							public makeRenderable(): com.google.ar.sceneform.rendering.ViewRenderable;
							public getRenderableRegistry(): com.google.ar.sceneform.resources.ResourceRegistry<any>;
							public setSizer(param0: com.google.ar.sceneform.rendering.ViewSizer): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public getRenderableRegistry(): com.google.ar.sceneform.resources.ResourceRegistry<com.google.ar.sceneform.rendering.ViewRenderable>;
							public getSelf(): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public build(): java.util.concurrent.CompletableFuture<com.google.ar.sceneform.rendering.ViewRenderable>;
							public setHorizontalAlignment(param0: com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public build(): java.util.concurrent.CompletableFuture<any>;
							public setView(param0: globalAndroid.content.Context, param1: number): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public getSelf(): any;
							public getRenderableClass(): java.lang.Class<any>;
							public setVerticalAlignment(param0: com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public checkPreconditions(): void;
							public setView(param0: globalAndroid.content.Context, param1: globalAndroid.view.View): com.google.ar.sceneform.rendering.ViewRenderable.Builder;
							public getRenderableClass(): java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderable>;
							public makeRenderable(): any;
						}
						export class HorizontalAlignment {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment>;
							public static LEFT: com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment;
							public static CENTER: com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment;
							public static RIGHT: com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment;
							public static valueOf(param0: string): com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment;
							public static values(): native.Array<com.google.ar.sceneform.rendering.ViewRenderable.HorizontalAlignment>;
						}
						export class VerticalAlignment {
							public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment>;
							public static BOTTOM: com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment;
							public static CENTER: com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment;
							public static TOP: com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment;
							public static valueOf(param0: string): com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment;
							public static values(): native.Array<com.google.ar.sceneform.rendering.ViewRenderable.VerticalAlignment>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ViewRenderableHelpers {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderableHelpers>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ViewRenderableInternalData {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewRenderableInternalData>;
						public onDispose(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module rendering {
					export class ViewSizer {
						public static class: java.lang.Class<com.google.ar.sceneform.rendering.ViewSizer>;
						/**
						 * Constructs a new instance of the com.google.ar.sceneform.rendering.ViewSizer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getSize(param0: globalAndroid.view.View): com.google.ar.sceneform.math.Vector3;
						});
						public constructor();
						public getSize(param0: globalAndroid.view.View): com.google.ar.sceneform.math.Vector3;
					}
				}
			}
		}
	}
}

//Generics information:
//com.google.ar.sceneform.rendering.CleanupItem:1
//com.google.ar.sceneform.rendering.CleanupRegistry:1
//com.google.ar.sceneform.rendering.LoadRenderableFromSfbTask:1
//com.google.ar.sceneform.rendering.Renderable.Builder:2

