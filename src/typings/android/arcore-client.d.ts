/// <reference path="./_helpers.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class Anchor {
					public getId(): string;
					public getPose(): com.google.ar.core.Pose;
					public getTrackingState(): com.google.ar.core.Anchor.TrackingState;
				}
				export module Anchor {
					export class TrackingState {
						public static TRACKING: com.google.ar.core.Anchor.TrackingState;
						public static NOT_CURRENTLY_TRACKING: com.google.ar.core.Anchor.TrackingState;
						public static STOPPED_TRACKING: com.google.ar.core.Anchor.TrackingState;
						public static valueOf(param0: string): com.google.ar.core.Anchor.TrackingState;
						public static values(): native.Array<com.google.ar.core.Anchor.TrackingState>;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class AnchorManager {
					public constructor();
				}
				export module AnchorManager {
					export class PlanesEnabledState {
						public static DISABLED: com.google.ar.core.AnchorManager.PlanesEnabledState;
						public static DISABLED_PENDING_UPDATE: com.google.ar.core.AnchorManager.PlanesEnabledState;
						public static ENABLED: com.google.ar.core.AnchorManager.PlanesEnabledState;
						public static values(): native.Array<com.google.ar.core.AnchorManager.PlanesEnabledState>;
						public static valueOf(param0: string): com.google.ar.core.AnchorManager.PlanesEnabledState;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export class BuildConfig {
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.ITango.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./com.google.ar.core.StatefulPose.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class CameraStateProvider {
					public getGlColorCameraTGlDisplayCamera(param0: number): com.google.ar.core.Pose;
					public getGlColorCameraPoseAtTime(param0: number): com.google.ar.core.StatefulPose;
					public getGlDisplayCameraPoseAtTime(param0: number, param1: number): com.google.ar.core.StatefulPose;
					public getRotatedColorCameraIntrinsics(param0: number): com.google.atap.tangoservice.TangoCameraIntrinsics;
					public getMotionCameraPoseAtTime(param0: number): com.google.ar.core.StatefulPose;
					public constructor(param0: com.google.ar.core.ITango);
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class Config {
					public setUpdateMode(param0: com.google.ar.core.Config.UpdateMode): void;
					public getUpdateMode(): com.google.ar.core.Config.UpdateMode;
					public constructor();
					public getLightingMode(): com.google.ar.core.Config.LightingMode;
					public setLightingMode(param0: com.google.ar.core.Config.LightingMode): void;
					public getPlaneFindingMode(): com.google.ar.core.Config.PlaneFindingMode;
					public setPlaneFindingMode(param0: com.google.ar.core.Config.PlaneFindingMode): void;
					public static createDefaultConfig(): com.google.ar.core.Config;
				}
				export module Config {
					export class LightingMode {
						public static DISABLED: com.google.ar.core.Config.LightingMode;
						public static AMBIENT_INTENSITY: com.google.ar.core.Config.LightingMode;
						public static valueOf(param0: string): com.google.ar.core.Config.LightingMode;
						public static values(): native.Array<com.google.ar.core.Config.LightingMode>;
					}
					export class PlaneFindingMode {
						public static DISABLED: com.google.ar.core.Config.PlaneFindingMode;
						public static HORIZONTAL: com.google.ar.core.Config.PlaneFindingMode;
						public static valueOf(param0: string): com.google.ar.core.Config.PlaneFindingMode;
						public static values(): native.Array<com.google.ar.core.Config.PlaneFindingMode>;
					}
					export class UpdateMode {
						public static BLOCKING: com.google.ar.core.Config.UpdateMode;
						public static LATEST_CAMERA_IMAGE: com.google.ar.core.Config.UpdateMode;
						public static values(): native.Array<com.google.ar.core.Config.UpdateMode>;
						public static valueOf(param0: string): com.google.ar.core.Config.UpdateMode;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export class DummySessionValues {
				}
			}
		}
	}
}

import javanioFloatBuffer = java.nio.FloatBuffer;
import javautilList = java.util.List;
import androidviewMotionEvent = android.view.MotionEvent;
import javautilCollection = java.util.Collection;
/// <reference path="./android.view.MotionEvent.d.ts" />
/// <reference path="./com.google.ar.core.LightEstimate.d.ts" />
/// <reference path="./com.google.ar.core.PointCloud.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.nio.FloatBuffer.d.ts" />
/// <reference path="./java.util.Collection.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class Frame {
					public getUpdatedAnchors(): javautilCollection;
					public getUpdatedPlanes(): javautilCollection;
					public getTrackingState(): com.google.ar.core.Frame.TrackingState;
					public isDisplayRotationChanged(): boolean;
					public getViewMatrix(param0: native.Array<number>, param1: number): void;
					public hitTest(param0: androidviewMotionEvent): javautilList;
					public getPose(): com.google.ar.core.Pose;
					public hitTest(param0: number, param1: number): javautilList;
					public getPointCloudPose(): com.google.ar.core.Pose;
					public getTimestampNs(): number;
					public transformDisplayUvCoords(param0: javanioFloatBuffer, param1: javanioFloatBuffer): void;
					public getPointCloud(): com.google.ar.core.PointCloud;
					public getLightEstimate(): com.google.ar.core.LightEstimate;
				}
				export module Frame {
					export class TrackingState {
						public static TRACKING: com.google.ar.core.Frame.TrackingState;
						public static NOT_TRACKING: com.google.ar.core.Frame.TrackingState;
						public static valueOf(param0: string): com.google.ar.core.Frame.TrackingState;
						public static values(): native.Array<com.google.ar.core.Frame.TrackingState>;
					}
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.Pose.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export abstract class HitResult {
					public getHitPose(): com.google.ar.core.Pose;
					public getDistance(): number;
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.HitResult.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class HitTest {
				}
				export module HitTest {
					export class SortHitResultByDistance {
						public compare(param0: com.google.ar.core.HitResult, param1: com.google.ar.core.HitResult): number;
					}
				}
			}
		}
	}
}

import androidcontentContext = android.content.Context;
import javalangRunnable = java.lang.Runnable;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoConfig.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCoordinateFramePair.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class ITango {
					/**
					 * Constructs a new instance of the com.google.ar.core.ITango interface with the provided implementation.
					 */
					public constructor(implementation: {
						createInstance(param0: androidcontentContext, param1: javalangRunnable): void;
						destroyInstance(): void;
						hasInstance(): boolean;
						connectListener(param0: javautilList, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback): void;
						connectOnImageAvailable(param0: number): void;
						connectOnTextureAvailable(param0: number): void;
						updateTextureExternalOes(param0: number, param1: number): number;
						disconnectCamera(param0: number): void;
						disconnect(): void;
						getConfig(param0: number): com.google.atap.tangoservice.TangoConfig;
						connect(param0: com.google.atap.tangoservice.TangoConfig): void;
						getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair): com.google.atap.tangoservice.TangoPoseData;
						getPlanes(): javautilList;
						getCameraIntrinsics(param0: number): com.google.atap.tangoservice.TangoCameraIntrinsics;
						setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): void;
					});
					public disconnectCamera(param0: number): void;
					public getPlanes(): javautilList;
					public updateTextureExternalOes(param0: number, param1: number): number;
					public destroyInstance(): void;
					public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair): com.google.atap.tangoservice.TangoPoseData;
					public connectOnTextureAvailable(param0: number): void;
					public hasInstance(): boolean;
					public getConfig(param0: number): com.google.atap.tangoservice.TangoConfig;
					public getCameraIntrinsics(param0: number): com.google.atap.tangoservice.TangoCameraIntrinsics;
					public connectOnImageAvailable(param0: number): void;
					public disconnect(): void;
					public createInstance(param0: androidcontentContext, param1: javalangRunnable): void;
					public connectListener(param0: javautilList, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback): void;
					public connect(param0: com.google.atap.tangoservice.TangoConfig): void;
					public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export class LightEstimate {
					public getPixelIntensity(): number;
					public isValid(): boolean;
				}
			}
		}
	}
}

import javanioByteBuffer = java.nio.ByteBuffer;
/// <reference path="./java.nio.ByteBuffer.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class LightingEstimation {
					public static getLuminance(param0: number, param1: number, param2: number): number;
					public static getPixelIntensity(param0: native.Array<number>, param1: number, param2: number, param3: number): number;
					public constructor();
					public static getPixelIntensity(param0: javanioByteBuffer, param1: number, param2: number, param3: number): number;
				}
				export module LightingEstimation {
					export class ByteSamplerCallback {
						/**
						 * Constructs a new instance of the com.google.ar.core.LightingEstimation$ByteSamplerCallback interface with the provided implementation.
						 */
						public constructor(implementation: {
							get(param0: number): number;
						});
						public get(param0: number): number;
					}
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.nio.FloatBuffer.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class Plane {
					public getTrackingState(): com.google.ar.core.Plane.TrackingState;
					public getCenterPose(): com.google.ar.core.Pose;
					public getPlanePolygon(): javanioFloatBuffer;
					public getSubsumedBy(): com.google.ar.core.Plane;
					public getExtentX(): number;
					public getExtentZ(): number;
					public getType(): com.google.ar.core.Plane.Type;
				}
				export module Plane {
					export class TrackingState {
						public static TRACKING: com.google.ar.core.Plane.TrackingState;
						public static NOT_CURRENTLY_TRACKING: com.google.ar.core.Plane.TrackingState;
						public static STOPPED_TRACKING: com.google.ar.core.Plane.TrackingState;
						public static valueOf(param0: string): com.google.ar.core.Plane.TrackingState;
						public static values(): native.Array<com.google.ar.core.Plane.TrackingState>;
					}
					export class Type {
						public static HORIZONTAL_UPWARD_FACING: com.google.ar.core.Plane.Type;
						public static HORIZONTAL_DOWNWARD_FACING: com.google.ar.core.Plane.Type;
						public static NON_HORIZONTAL: com.google.ar.core.Plane.Type;
						public static valueOf(param0: string): com.google.ar.core.Plane.Type;
						public static values(): native.Array<com.google.ar.core.Plane.Type>;
					}
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.Plane.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class PlaneHitResult extends com.google.ar.core.HitResult {
					public getPlane(): com.google.ar.core.Plane;
					public isHitOnFrontFace(): boolean;
					public isHitInPolygon(): boolean;
					public isHitInExtents(): boolean;
				}
			}
		}
	}
}

/// <reference path="./java.nio.FloatBuffer.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class PointCloud {
					public getPoints(): javanioFloatBuffer;
					public getTimestampNs(): number;
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.PointCloud.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class PointCloudHitResult extends com.google.ar.core.HitResult {
					public getNearestPointIndex(): number;
					public getNearestPoint(param0: native.Array<number>, param1: number): void;
					public getPointCloudPose(): com.google.ar.core.Pose;
					public getPointCloud(): com.google.ar.core.PointCloud;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export class Pose {
					public static IDENTITY: com.google.ar.core.Pose;
					public qz(): number;
					public getXAxis(): native.Array<number>;
					public constructor(param0: native.Array<number>, param1: native.Array<number>);
					public inverse(): com.google.ar.core.Pose;
					public qw(): number;
					public tz(): number;
					public toString(): string;
					public static makeRotation(param0: number, param1: number, param2: number, param3: number): com.google.ar.core.Pose;
					public ty(): number;
					public getYAxis(): native.Array<number>;
					public static makeRotation(param0: native.Array<number>): com.google.ar.core.Pose;
					public transformPoint(param0: native.Array<number>, param1: number, param2: native.Array<number>, param3: number): void;
					public getTransformedAxis(param0: number, param1: number, param2: native.Array<number>, param3: number): void;
					public getZAxis(): native.Array<number>;
					public getTransformedAxis(param0: number, param1: number): native.Array<number>;
					public getRotationQuaternion(param0: native.Array<number>, param1: number): void;
					public qy(): number;
					public static makeTranslation(param0: number, param1: number, param2: number): com.google.ar.core.Pose;
					public transformPoint(param0: native.Array<number>): native.Array<number>;
					public static makeInterpolated(param0: com.google.ar.core.Pose, param1: com.google.ar.core.Pose, param2: number): com.google.ar.core.Pose;
					public extractRotation(): com.google.ar.core.Pose;
					public tx(): number;
					public rotateVector(param0: native.Array<number>, param1: number, param2: native.Array<number>, param3: number): void;
					public extractTranslation(): com.google.ar.core.Pose;
					public compose(param0: com.google.ar.core.Pose): com.google.ar.core.Pose;
					public toMatrix(param0: native.Array<number>, param1: number): void;
					public static makeTranslation(param0: native.Array<number>): com.google.ar.core.Pose;
					public qx(): number;
					public getTranslation(param0: native.Array<number>, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export class Quaternion {
					public static IDENTITY: com.google.ar.core.Quaternion;
					public getTransformedAxis(param0: number, param1: number, param2: native.Array<number>, param3: number): void;
					public static makeInterpolated(param0: com.google.ar.core.Quaternion, param1: com.google.ar.core.Quaternion, param2: number): com.google.ar.core.Quaternion;
					public xAxis(): native.Array<number>;
					public compose(param0: com.google.ar.core.Quaternion): com.google.ar.core.Quaternion;
					public toMatrix(param0: native.Array<number>, param1: number, param2: number): void;
					public static rotateVector(param0: com.google.ar.core.Quaternion, param1: native.Array<number>, param2: number, param3: native.Array<number>, param4: number): void;
					public x(): number;
					public zAxis(): native.Array<number>;
					public constructor(param0: number, param1: number, param2: number, param3: number);
					public z(): number;
					public transformedAxis(param0: number, param1: number): native.Array<number>;
					public toString(): string;
					public constructor(param0: native.Array<number>);
					public setValues(param0: number, param1: number, param2: number, param3: number): void;
					public setValues(param0: native.Array<number>): void;
					public constructor();
					public constructor(param0: com.google.ar.core.Quaternion);
					public inverse(): com.google.ar.core.Quaternion;
					public w(): number;
					public yAxis(): native.Array<number>;
					public y(): number;
					public getValues(param0: native.Array<number>, param1: number): void;
					public static fromMatrix(param0: native.Array<number>, param1: number, param2: number): com.google.ar.core.Quaternion;
				}
			}
		}
	}
}

import androidappActivity = android.app.Activity;
/// <reference path="./android.app.Activity.d.ts" />
/// <reference path="./com.google.ar.core.Anchor.d.ts" />
/// <reference path="./com.google.ar.core.Config.d.ts" />
/// <reference path="./com.google.ar.core.Frame.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./java.util.Collection.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class Session {
					public constructor(param0: androidappActivity);
					public getAllAnchors(): javautilCollection;
					public isSupported(param0: com.google.ar.core.Config): boolean;
					public pause(): void;
					public resume(param0: com.google.ar.core.Config): void;
					public getProjectionMatrix(param0: native.Array<number>, param1: number, param2: number, param3: number): void;
					public update(): com.google.ar.core.Frame;
					public removeAnchors(param0: javautilCollection): void;
					public getAllPlanes(): javautilCollection;
					public setCameraTextureName(param0: number): void;
					public addAnchor(param0: com.google.ar.core.Pose): com.google.ar.core.Anchor;
					public setDisplayGeometry(param0: number, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class SessionState {
					public static Paused: com.google.ar.core.SessionState;
					public static Binding: com.google.ar.core.SessionState;
					public static BinderConnected: com.google.ar.core.SessionState;
					public static TextureConnected: com.google.ar.core.SessionState;
					public static CameraStreamsButNotTracking: com.google.ar.core.SessionState;
					public static Tracking: com.google.ar.core.SessionState;
					public static values(): native.Array<com.google.ar.core.SessionState>;
					public static valueOf(param0: string): com.google.ar.core.SessionState;
				}
			}
		}
	}
}

/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class StatefulPose {
					public pose: com.google.ar.core.Pose;
					public state: com.google.ar.core.StatefulPose.State;
				}
				export module StatefulPose {
					export abstract class State {
						public static UNKNOWN: com.google.ar.core.StatefulPose.State;
						public static INVALID: com.google.ar.core.StatefulPose.State;
						public static INITIALIZING: com.google.ar.core.StatefulPose.State;
						public static VALID: com.google.ar.core.StatefulPose.State;
						public static valueOf(param0: string): com.google.ar.core.StatefulPose.State;
						public static values(): native.Array<com.google.ar.core.StatefulPose.State>;
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoConfig.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCoordinateFramePair.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export class TangoWrapper {
					public disconnectCamera(param0: number): void;
					public getPlanes(): javautilList;
					public updateTextureExternalOes(param0: number, param1: number): number;
					public destroyInstance(): void;
					public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair): com.google.atap.tangoservice.TangoPoseData;
					public connectOnTextureAvailable(param0: number): void;
					public hasInstance(): boolean;
					public getConfig(param0: number): com.google.atap.tangoservice.TangoConfig;
					public getCameraIntrinsics(param0: number): com.google.atap.tangoservice.TangoCameraIntrinsics;
					public connectOnImageAvailable(param0: number): void;
					public disconnect(): void;
					public createInstance(param0: androidcontentContext, param1: javalangRunnable): void;
					public connectListener(param0: javautilList, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback): void;
					public connect(param0: com.google.atap.tangoservice.TangoConfig): void;
					public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class CameraException {
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

import javalangThrowable = java.lang.Throwable;
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.lang.Throwable.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class InternalException {
						public constructor();
						public constructor(param0: javalangThrowable);
						public constructor(param0: string, param1: javalangThrowable);
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class MissingGlContext {
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class NotTrackingException {
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class SessionPausedException {
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class TextureNotSet {
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module exceptions {
					export class UnsupportedConfigurationException {
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module ar {
			export module core {
				export module lighting_estimation {
					export class BuildConfig {
						public static DEBUG: boolean;
						public static APPLICATION_ID: string;
						public static BUILD_TYPE: string;
						public static FLAVOR: string;
						public static VERSION_CODE: number;
						public static VERSION_NAME: string;
						public constructor();
					}
				}
			}
		}
	}
}

import javaxvecmathVector3f = javax.vecmath.Vector3f;
import javaxvecmathVector2f = javax.vecmath.Vector2f;
/// <reference path="./javax.vecmath.Vector2f.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
declare module com {
	export module google {
		export module ar {
			export module core {
				export module math {
					export class Ray {
						public origin: javaxvecmathVector3f;
						public direction: javaxvecmathVector3f;
						public static screenPointToRay(param0: javaxvecmathVector2f, param1: javaxvecmathVector2f, param2: native.Array<number>): com.google.ar.core.math.Ray;
						public constructor(param0: javaxvecmathVector3f, param1: javaxvecmathVector3f);
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tango {
				export class TangoClientLibLoader {
					public static PURE_JAVA_PATH: boolean;
					public static ARCH_ERROR: number;
					public static ARCH_FALLBACK: number;
					public static ARCH_DEFAULT: number;
					public static ARCH_ARM64: number;
					public static ARCH_ARM32: number;
					public static ARCH_X86_64: number;
					public static ARCH_X86: number;
					public static getTangoClientApiArch(): number;
					public constructor();
					public static loadedSuccessfully(): boolean;
				}
			}
		}
	}
}

import androidosIBinder = android.os.IBinder;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoAreaDescriptionMetaData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoConfig.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoEvent.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPointCloudData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoTransformation.d.ts" />
/// <reference path="./com.google.atap.tangoservice.experimental.TangoImageBuffer.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tango {
				export class TangoJNINative {
					public static Initialize(param0: androidcontentContext): number;
					public static ConnectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback): number;
					public static DeleteFramesOfInterest(param0: native.Array<string>, param1: com.google.atap.tangoservice.Tango.FoiListener): number;
					public static SaveAreaDescriptionMetadata(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
					public static SaveAreaDescription(param0: native.Array<string>): number;
					public static SetRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): number;
					public static ConnectTextureId(param0: number, param1: number): number;
					public static SetBinder(param0: androidosIBinder): number;
					public static DisconnectCamera(param0: number): number;
					public constructor();
					public static GetAreaDescriptionMetadata(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
					public static GetCurrentDatasetUUID(param0: native.Array<string>): number;
					public static GetPoseAtTime2(param0: number, param1: string, param2: string, param3: com.google.atap.tangoservice.TangoPoseData): number;
					public static GetAreaDescriptionUUIDList(param0: native.Array<string>): number;
					public static Connect(param0: com.google.atap.tangoservice.TangoConfig): number;
					public static LoadFramesOfInterest(param0: native.Array<string>, param1: com.google.atap.tangoservice.Tango.FoiListener): number;
					public static Disconnect(): void;
					public static GetPoseAtTime(param0: number, param1: number, param2: number, param3: com.google.atap.tangoservice.TangoPoseData): number;
					public static UpdateTexture(param0: number, param1: native.Array<number>): number;
					public static CreateFrameOfInterest2(param0: number, param1: string, param2: com.google.atap.tangoservice.TangoTransformation, param3: com.google.atap.tangoservice.Tango.FoiListener): number;
					public static ResetMotionTracking(): void;
					public static ConnectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.Tango.OnFrameAvailableListener, param2: com.google.atap.tangoservice.experimental.TangoImageBuffer): number;
					public static GetCameraIntrinsics(param0: number, param1: com.google.atap.tangoservice.TangoCameraIntrinsics): number;
					public static GetBinder(): androidosIBinder;
					public static ConnectListener(param0: native.Array<number>, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback, param2: com.google.atap.tangoservice.TangoPoseData, param3: com.google.atap.tangoservice.TangoPointCloudData, param4: com.google.atap.tangoservice.TangoEvent): number;
					public static GetDatasets(param0: native.Array<string>): number;
					public static GetConfig(param0: number, param1: com.google.atap.tangoservice.TangoConfig): void;
					public static DeleteAreaDescription(param0: string): number;
					public static DeleteDataset(param0: string): number;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangohelperlib {
				export class BuildConfig {
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public static PURE_JAVA_PATH: boolean;
					public constructor();
				}
			}
		}
	}
}

import androidosParcel = android.os.Parcel;
/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnFrameAvailableListener.d.ts" />
/// <reference path="./com.google.tango.loader.IObjectWrapper.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class IOnFrameAvailableListener {
					/**
					 * Constructs a new instance of the com.google.atap.tangoservice.IOnFrameAvailableListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onFrameAvailable(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: com.google.tango.loader.IObjectWrapper, param7: number, param8: number): void;
					});
					public onFrameAvailable(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: com.google.tango.loader.IObjectWrapper, param7: number, param8: number): void;
				}
				export module IOnFrameAvailableListener {
					export abstract class Stub {
						public constructor();
						public static asInterface(param0: androidosIBinder): com.google.atap.tangoservice.IOnFrameAvailableListener;
						public onFrameAvailable(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: com.google.tango.loader.IObjectWrapper, param7: number, param8: number): void;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public asBinder(): androidosIBinder;
					}
					export module Stub {
						export class Proxy {
							public getInterfaceDescriptor(): string;
							public asBinder(): androidosIBinder;
							public onFrameAvailable(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: com.google.tango.loader.IObjectWrapper, param7: number, param8: number): void;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnImageAvailableListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraMetadata.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoImage.d.ts" />
/// <reference path="./com.google.tango.loader.IObjectWrapper.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class IOnImageAvailableListener {
					/**
					 * Constructs a new instance of the com.google.atap.tangoservice.IOnImageAvailableListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onImageAvailable(param0: number, param1: com.google.atap.tangoservice.TangoImage, param2: com.google.atap.tangoservice.TangoCameraMetadata, param3: com.google.tango.loader.IObjectWrapper, param4: com.google.tango.loader.IObjectWrapper, param5: com.google.tango.loader.IObjectWrapper, param6: com.google.tango.loader.IObjectWrapper): void;
					});
					public onImageAvailable(param0: number, param1: com.google.atap.tangoservice.TangoImage, param2: com.google.atap.tangoservice.TangoCameraMetadata, param3: com.google.tango.loader.IObjectWrapper, param4: com.google.tango.loader.IObjectWrapper, param5: com.google.tango.loader.IObjectWrapper, param6: com.google.tango.loader.IObjectWrapper): void;
				}
				export module IOnImageAvailableListener {
					export abstract class Stub {
						public constructor();
						public static asInterface(param0: androidosIBinder): com.google.atap.tangoservice.IOnImageAvailableListener;
						public onImageAvailable(param0: number, param1: com.google.atap.tangoservice.TangoImage, param2: com.google.atap.tangoservice.TangoCameraMetadata, param3: com.google.tango.loader.IObjectWrapper, param4: com.google.tango.loader.IObjectWrapper, param5: com.google.tango.loader.IObjectWrapper, param6: com.google.tango.loader.IObjectWrapper): void;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public asBinder(): androidosIBinder;
					}
					export module Stub {
						export class Proxy {
							public getInterfaceDescriptor(): string;
							public asBinder(): androidosIBinder;
							public onImageAvailable(param0: number, param1: com.google.atap.tangoservice.TangoImage, param2: com.google.atap.tangoservice.TangoCameraMetadata, param3: com.google.tango.loader.IObjectWrapper, param4: com.google.tango.loader.IObjectWrapper, param5: com.google.tango.loader.IObjectWrapper, param6: com.google.tango.loader.IObjectWrapper): void;
						}
					}
				}
			}
		}
	}
}

import androidviewSurface = android.view.Surface;
/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.view.Surface.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITango.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITangoListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoAreaDescriptionMetaData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoConfig.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCoordinateFramePair.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.experimental.TangoPlaneData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.fois.FoiRequest.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class ITango {
					/**
					 * Constructs a new instance of the com.google.atap.tangoservice.ITango interface with the provided implementation.
					 */
					public constructor(implementation: {
						connect(param0: com.google.atap.tangoservice.ITangoListener, param1: com.google.atap.tangoservice.TangoConfig): number;
						setPoseListenerFrames(param0: javautilList): number;
						disconnect(): number;
						getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair, param2: com.google.atap.tangoservice.TangoPoseData): number;
						getConfig(param0: number, param1: com.google.atap.tangoservice.TangoConfig): number;
						connectSurface(param0: number, param1: androidviewSurface): number;
						disconnectSurface(param0: number): number;
						resetMotionTracking(): number;
						saveAreaDescription(param0: javautilList): number;
						getAreaDescriptionUuidList(param0: javautilList): number;
						loadAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
						saveAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
						importAreaDescriptionFile(param0: javautilList, param1: string): number;
						exportAreaDescriptionFile(param0: string, param1: string): number;
						deleteAreaDescription(param0: string): number;
						getCameraIntrinsics(param0: number, param1: com.google.atap.tangoservice.TangoCameraIntrinsics): number;
						setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): number;
						reportApiUsage(param0: com.google.atap.tangoservice.TangoConfig): number;
						getDatasetUuids(param0: javautilList): number;
						deleteDataset(param0: string): number;
						getCurrentDatasetUuid(param0: javautilList): number;
						foiRequest(param0: com.google.atap.tangoservice.fois.FoiRequest): number;
						getPoseAtTime2(param0: number, param1: string, param2: string, param3: com.google.atap.tangoservice.TangoPoseData): number;
						getPlaneByUVCoord(param0: number, param1: com.google.atap.tangoservice.TangoPoseData, param2: native.Array<number>, param3: com.google.atap.tangoservice.experimental.TangoPlaneData): number;
						getPlanes(param0: javautilList): number;
						startOnlineCalibrationSolve(): number;
					});
					public disconnectSurface(param0: number): number;
					public startOnlineCalibrationSolve(): number;
					public getCameraIntrinsics(param0: number, param1: com.google.atap.tangoservice.TangoCameraIntrinsics): number;
					public loadAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
					public setPoseListenerFrames(param0: javautilList): number;
					public getCurrentDatasetUuid(param0: javautilList): number;
					public getAreaDescriptionUuidList(param0: javautilList): number;
					public deleteDataset(param0: string): number;
					public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): number;
					public deleteAreaDescription(param0: string): number;
					public getConfig(param0: number, param1: com.google.atap.tangoservice.TangoConfig): number;
					public saveAreaDescription(param0: javautilList): number;
					public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair, param2: com.google.atap.tangoservice.TangoPoseData): number;
					public reportApiUsage(param0: com.google.atap.tangoservice.TangoConfig): number;
					public importAreaDescriptionFile(param0: javautilList, param1: string): number;
					public getPlaneByUVCoord(param0: number, param1: com.google.atap.tangoservice.TangoPoseData, param2: native.Array<number>, param3: com.google.atap.tangoservice.experimental.TangoPlaneData): number;
					public disconnect(): number;
					public connectSurface(param0: number, param1: androidviewSurface): number;
					public resetMotionTracking(): number;
					public exportAreaDescriptionFile(param0: string, param1: string): number;
					public getPoseAtTime2(param0: number, param1: string, param2: string, param3: com.google.atap.tangoservice.TangoPoseData): number;
					public getPlanes(param0: javautilList): number;
					public saveAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
					public foiRequest(param0: com.google.atap.tangoservice.fois.FoiRequest): number;
					public connect(param0: com.google.atap.tangoservice.ITangoListener, param1: com.google.atap.tangoservice.TangoConfig): number;
					public getDatasetUuids(param0: javautilList): number;
				}
				export module ITango {
					export abstract class Stub {
						public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): number;
						public getDatasetUuids(param0: javautilList): number;
						public getConfig(param0: number, param1: com.google.atap.tangoservice.TangoConfig): number;
						public static asInterface(param0: androidosIBinder): com.google.atap.tangoservice.ITango;
						public deleteDataset(param0: string): number;
						public getAreaDescriptionUuidList(param0: javautilList): number;
						public getCameraIntrinsics(param0: number, param1: com.google.atap.tangoservice.TangoCameraIntrinsics): number;
						public saveAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
						public disconnect(): number;
						public asBinder(): androidosIBinder;
						public connect(param0: com.google.atap.tangoservice.ITangoListener, param1: com.google.atap.tangoservice.TangoConfig): number;
						public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair, param2: com.google.atap.tangoservice.TangoPoseData): number;
						public resetMotionTracking(): number;
						public getCurrentDatasetUuid(param0: javautilList): number;
						public getPlaneByUVCoord(param0: number, param1: com.google.atap.tangoservice.TangoPoseData, param2: native.Array<number>, param3: com.google.atap.tangoservice.experimental.TangoPlaneData): number;
						public getPlanes(param0: javautilList): number;
						public importAreaDescriptionFile(param0: javautilList, param1: string): number;
						public connectSurface(param0: number, param1: androidviewSurface): number;
						public loadAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
						public deleteAreaDescription(param0: string): number;
						public constructor();
						public setPoseListenerFrames(param0: javautilList): number;
						public getPoseAtTime2(param0: number, param1: string, param2: string, param3: com.google.atap.tangoservice.TangoPoseData): number;
						public startOnlineCalibrationSolve(): number;
						public foiRequest(param0: com.google.atap.tangoservice.fois.FoiRequest): number;
						public exportAreaDescriptionFile(param0: string, param1: string): number;
						public disconnectSurface(param0: number): number;
						public saveAreaDescription(param0: javautilList): number;
						public reportApiUsage(param0: com.google.atap.tangoservice.TangoConfig): number;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
					}
					export module Stub {
						export class Proxy {
							public saveAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
							public connect(param0: com.google.atap.tangoservice.ITangoListener, param1: com.google.atap.tangoservice.TangoConfig): number;
							public getCameraIntrinsics(param0: number, param1: com.google.atap.tangoservice.TangoCameraIntrinsics): number;
							public getAreaDescriptionUuidList(param0: javautilList): number;
							public disconnectSurface(param0: number): number;
							public exportAreaDescriptionFile(param0: string, param1: string): number;
							public getCurrentDatasetUuid(param0: javautilList): number;
							public getPlanes(param0: javautilList): number;
							public deleteAreaDescription(param0: string): number;
							public setPoseListenerFrames(param0: javautilList): number;
							public foiRequest(param0: com.google.atap.tangoservice.fois.FoiRequest): number;
							public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): number;
							public deleteDataset(param0: string): number;
							public getPoseAtTime2(param0: number, param1: string, param2: string, param3: com.google.atap.tangoservice.TangoPoseData): number;
							public asBinder(): androidosIBinder;
							public disconnect(): number;
							public importAreaDescriptionFile(param0: javautilList, param1: string): number;
							public getDatasetUuids(param0: javautilList): number;
							public getPlaneByUVCoord(param0: number, param1: com.google.atap.tangoservice.TangoPoseData, param2: native.Array<number>, param3: com.google.atap.tangoservice.experimental.TangoPlaneData): number;
							public saveAreaDescription(param0: javautilList): number;
							public loadAreaDescriptionMetaData(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): number;
							public connectSurface(param0: number, param1: androidviewSurface): number;
							public startOnlineCalibrationSolve(): number;
							public reportApiUsage(param0: com.google.atap.tangoservice.TangoConfig): number;
							public getInterfaceDescriptor(): string;
							public getConfig(param0: number, param1: com.google.atap.tangoservice.TangoConfig): number;
							public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair, param2: com.google.atap.tangoservice.TangoPoseData): number;
							public resetMotionTracking(): number;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITangoListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoEvent.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPointCloudData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.fois.FoiResponse.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class ITangoListener {
					/**
					 * Constructs a new instance of the com.google.atap.tangoservice.ITangoListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onPoseAvailable(param0: com.google.atap.tangoservice.TangoPoseData): void;
						onXyzIjAvailable(): void;
						onTangoEvent(param0: com.google.atap.tangoservice.TangoEvent): void;
						onGraphicBufferAvailable(param0: number): void;
						onPointCloudAvailable(param0: com.google.atap.tangoservice.TangoPointCloudData): void;
						onFoiResponse(param0: com.google.atap.tangoservice.fois.FoiResponse): void;
						onOnlineCalibrationStatus(param0: number): void;
					});
					public onXyzIjAvailable(): void;
					public onFoiResponse(param0: com.google.atap.tangoservice.fois.FoiResponse): void;
					public onOnlineCalibrationStatus(param0: number): void;
					public onTangoEvent(param0: com.google.atap.tangoservice.TangoEvent): void;
					public onPointCloudAvailable(param0: com.google.atap.tangoservice.TangoPointCloudData): void;
					public onGraphicBufferAvailable(param0: number): void;
					public onPoseAvailable(param0: com.google.atap.tangoservice.TangoPoseData): void;
				}
				export module ITangoListener {
					export abstract class Stub {
						public static asInterface(param0: androidosIBinder): com.google.atap.tangoservice.ITangoListener;
						public constructor();
						public onPointCloudAvailable(param0: com.google.atap.tangoservice.TangoPointCloudData): void;
						public onGraphicBufferAvailable(param0: number): void;
						public onPoseAvailable(param0: com.google.atap.tangoservice.TangoPoseData): void;
						public onXyzIjAvailable(): void;
						public onFoiResponse(param0: com.google.atap.tangoservice.fois.FoiResponse): void;
						public onTangoEvent(param0: com.google.atap.tangoservice.TangoEvent): void;
						public onOnlineCalibrationStatus(param0: number): void;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public asBinder(): androidosIBinder;
					}
					export module Stub {
						export class Proxy {
							public getInterfaceDescriptor(): string;
							public asBinder(): androidosIBinder;
							public onXyzIjAvailable(): void;
							public onOnlineCalibrationStatus(param0: number): void;
							public onPointCloudAvailable(param0: com.google.atap.tangoservice.TangoPointCloudData): void;
							public onGraphicBufferAvailable(param0: number): void;
							public onTangoEvent(param0: com.google.atap.tangoservice.TangoEvent): void;
							public onPoseAvailable(param0: com.google.atap.tangoservice.TangoPoseData): void;
							public onFoiResponse(param0: com.google.atap.tangoservice.fois.FoiResponse): void;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.view.Surface.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITangoVhs.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class ITangoVhs {
					/**
					 * Constructs a new instance of the com.google.atap.tangoservice.ITangoVhs interface with the provided implementation.
					 */
					public constructor(implementation: {
						getTrackingSurface(): androidviewSurface;
						onMetadata(param0: number, param1: number, param2: number, param3: number): void;
						setDatasetPathAndUUID(param0: string, param1: string): number;
					});
					public onMetadata(param0: number, param1: number, param2: number, param3: number): void;
					public setDatasetPathAndUUID(param0: string, param1: string): number;
					public getTrackingSurface(): androidviewSurface;
				}
				export module ITangoVhs {
					export abstract class Stub {
						public constructor();
						public onMetadata(param0: number, param1: number, param2: number, param3: number): void;
						public setDatasetPathAndUUID(param0: string, param1: string): number;
						public getTrackingSurface(): androidviewSurface;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public static asInterface(param0: androidosIBinder): com.google.atap.tangoservice.ITangoVhs;
						public asBinder(): androidosIBinder;
					}
					export module Stub {
						export class Proxy {
							public getInterfaceDescriptor(): string;
							public asBinder(): androidosIBinder;
							public onMetadata(param0: number, param1: number, param2: number, param3: number): void;
							public setDatasetPathAndUUID(param0: string, param1: string): number;
							public getTrackingSurface(): androidviewSurface;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class SupportedDevices {
					public constructor();
					public static isSupportedExynosDevice(): boolean;
					public static isSupported(param0: androidcontentContext): boolean;
				}
			}
		}
	}
}

import javautilArrayList = java.util.ArrayList;
import androidcontentIntent = android.content.Intent;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.Intent.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoAreaDescriptionMetaData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraIntrinsics.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCameraMetadata.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoConfig.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoCoordinateFramePair.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoEvent.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoFoiResult.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoImage.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPointCloudData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoTransformation.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoXyzIjData.d.ts" />
/// <reference path="./com.google.atap.tangoservice.experimental.TangoImageBuffer.d.ts" />
/// <reference path="./com.google.atap.tangoservice.experimental.TangoPlaneData.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class Tango {
					public static STATUS_SUCCESS: number;
					public static STATUS_ERROR: number;
					public static STATUS_INVALID: number;
					public static TANGO_INTENT_ACTIVITYCODE: number;
					public static EXTRA_KEY_DESTINATIONUUID: string;
					public static PERMISSIONTYPE_MOTION_TRACKING: string;
					public static PERMISSIONTYPE_ADF_LOAD_SAVE: string;
					public static PERMISSIONTYPE_DATASET: string;
					public static ANDROID_PERMISSION_DATASET: string;
					public static COORDINATE_FRAME_ID_NONE: string;
					public static COORDINATE_FRAME_ID_GLOBAL_WGS84: string;
					public static COORDINATE_FRAME_ID_AREA_DESCRIPTION: string;
					public static COORDINATE_FRAME_ID_START_OF_SERVICE: string;
					public static COORDINATE_FRAME_ID_PREVIOUS_DEVICE_POSE: string;
					public static COORDINATE_FRAME_ID_DEVICE: string;
					public static COORDINATE_FRAME_ID_IMU: string;
					public static COORDINATE_FRAME_ID_DISPLAY: string;
					public static COORDINATE_FRAME_ID_CAMERA_COLOR: string;
					public static COORDINATE_FRAME_CAMERA_DEPTH: string;
					public static COORDINATE_FRAME_CAMERA_FISHEYE: string;
					public importAreaDescriptionFile(param0: string): void;
					public updateTextureExternalOes(param0: number, param1: number): number;
					public createFrameOfInterest(param0: number, param1: string, param2: com.google.atap.tangoservice.TangoTransformation, param3: com.google.atap.tangoservice.Tango.FoiListener): void;
					public lockCameraBuffer(param0: number, param1: native.Array<number>): number;
					public experimentalDeleteDataset(param0: string): void;
					public connectOnTextureAvailable(param0: number): void;
					public static getRequestPermissionIntent(param0: string): androidcontentIntent;
					public getConfig(param0: number): com.google.atap.tangoservice.TangoConfig;
					public resetMotionTracking(): void;
					public static nativeOnFrameAvailable(param0: com.google.atap.tangoservice.experimental.TangoImageBuffer, param1: number): void;
					public static throwTangoExceptionIfNeeded(param0: number): void;
					public getCameraIntrinsics(param0: number): com.google.atap.tangoservice.TangoCameraIntrinsics;
					public disconnect(): void;
					public constructor(param0: androidcontentContext, param1: javalangRunnable);
					public connectListener(param0: javautilList, param1: com.google.atap.tangoservice.Tango.TangoUpdateCallback): void;
					public connect(param0: com.google.atap.tangoservice.TangoConfig): void;
					public loadAreaDescriptionMetaData(param0: string): com.google.atap.tangoservice.TangoAreaDescriptionMetaData;
					public disconnectCamera(param0: number): void;
					public updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): void;
					public getPoseAtTime(param0: number, param1: string, param2: string): com.google.atap.tangoservice.TangoPoseData;
					public experimentalGetCurrentDatasetUuid(): string;
					public deleteFramesOfInterest(param0: native.Array<string>, param1: com.google.atap.tangoservice.Tango.FoiListener): void;
					public experimentalGetPlanes(): javautilList;
					public exportAreaDescriptionFile(param0: string, param1: string): void;
					public getPoseAtTime(param0: number, param1: com.google.atap.tangoservice.TangoCoordinateFramePair): com.google.atap.tangoservice.TangoPoseData;
					public updateTexture(param0: number): number;
					public loadFramesOfInterest(param0: native.Array<string>, param1: com.google.atap.tangoservice.Tango.FoiListener): void;
					public saveAreaDescription(): string;
					public static hasPermission(param0: androidcontentContext, param1: string): boolean;
					public saveAreaDescriptionMetadata(param0: string, param1: com.google.atap.tangoservice.TangoAreaDescriptionMetaData): void;
					public connectTextureId(param0: number, param1: number): void;
					public deleteAreaDescription(param0: string): void;
					public listAreaDescriptions(): javautilArrayList;
					public experimentalListDatasets(): javautilList;
					public experimentalGetPlaneByUVCoord(param0: number, param1: com.google.atap.tangoservice.TangoPoseData, param2: native.Array<number>): com.google.atap.tangoservice.experimental.TangoPlaneData;
					public unlockCameraBuffer(param0: number, param1: number): void;
					public static getVersion(param0: androidcontentContext): number;
					public connectOnImageAvailable(param0: number): void;
					public connectNativeOnFrameAvailableListener(param0: number): void;
					public disconnectWithoutUnbind(): void;
					public experimentalConnectOnFrameListener(param0: number, param1: com.google.atap.tangoservice.Tango.OnFrameAvailableListener): void;
					public setRuntimeConfig(param0: com.google.atap.tangoservice.TangoConfig): void;
				}
				export module Tango {
					export class FoiListener {
						/**
						 * Constructs a new instance of the com.google.atap.tangoservice.Tango$FoiListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onFoiResult(param0: native.Array<com.google.atap.tangoservice.TangoFoiResult>): void;
						});
						public onFoiResult(param0: native.Array<com.google.atap.tangoservice.TangoFoiResult>): void;
					}
					export class OnFrameAvailableListener {
						/**
						 * Constructs a new instance of the com.google.atap.tangoservice.Tango$OnFrameAvailableListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onFrameAvailable(param0: com.google.atap.tangoservice.experimental.TangoImageBuffer, param1: number): void;
						});
						public onFrameAvailable(param0: com.google.atap.tangoservice.experimental.TangoImageBuffer, param1: number): void;
					}
					export abstract class OnTangoUpdateListener extends com.google.atap.tangoservice.Tango.TangoUpdateCallback {
						public constructor();
					}
					export abstract class TangoUpdateCallback {
						public constructor();
						public onPointCloudAvailable(param0: com.google.atap.tangoservice.TangoPointCloudData): void;
						public onPoseAvailable(param0: com.google.atap.tangoservice.TangoPoseData): void;
						public onXyzIjAvailable(param0: com.google.atap.tangoservice.TangoXyzIjData): void;
						public onImageAvailable(param0: com.google.atap.tangoservice.TangoImage, param1: com.google.atap.tangoservice.TangoCameraMetadata, param2: number): void;
						public onTangoEvent(param0: com.google.atap.tangoservice.TangoEvent): void;
						public onFrameAvailable(param0: number): void;
						public onOnlineCalibrationStatus(param0: number): void;
					}
				}
			}
		}
	}
}

import javautilSet = java.util.Set;
import androidosParcelableCreator = android.os.Parcelable.Creator;
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoAreaDescriptionMetaData {
					public static KEY_UUID: string;
					public static KEY_NAME: string;
					public static KEY_TRANSFORMATION: string;
					public static KEY_DATE_MS_SINCE_EPOCH: string;
					public static CREATOR: androidosParcelableCreator;
					public get(param0: string): native.Array<number>;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public set(param0: string, param1: native.Array<number>): void;
					public keySet(): javautilSet;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoCameraIntrinsics {
					public static TANGO_CAMERA_COLOR: number;
					public static TANGO_CAMERA_RGBIR: number;
					public static TANGO_CAMERA_FISHEYE: number;
					public static TANGO_CAMERA_DEPTH: number;
					public cameraId: number;
					public height: number;
					public width: number;
					public static TANGO_CALIBRATION_UNKNOWN: number;
					public static TANGO_CALIBRATION_EQUIDISTANT: number;
					public static TANGO_CALIBRATION_POLYNOMIAL_2_PARAMETERS: number;
					public static TANGO_CALIBRATION_POLYNOMIAL_3_PARAMETERS: number;
					public static TANGO_CALIBRATION_POLYNOMIAL_5_PARAMETERS: number;
					public calibrationType: number;
					public fx: number;
					public fy: number;
					public cx: number;
					public cy: number;
					public distortion: native.Array<number>;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoCameraMetadata {
					public static NUM_COLOR_CORRECTION_GAIN_VALUES: number;
					public static NUM_COLOR_CORRECTION_TRANSFORM_VALUES: number;
					public static NUM_SENSOR_NEUTRAL_COLOR_POINT_VALUES: number;
					public timestampNs: number;
					public frameNumber: number;
					public exposureDurationNs: number;
					public sensitivityISO: number;
					public lensAperture: number;
					public colorCorrectionMode: number;
					public colorCorrectionGains: native.Array<number>;
					public colorCorrectionTransform: native.Array<number>;
					public sensorNeutralColorPoint: native.Array<number>;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnFrameAvailableListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnImageAvailableListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITangoListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoCameraNativeLoader {
					public static connectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.IOnFrameAvailableListener, param2: boolean): number;
					public static updateTexture(param0: number, param1: native.Array<number>): number;
					public static connectOnTextureAvailable(param0: number, param1: boolean): number;
					public static initialize(param0: androidcontentContext, param1: com.google.atap.tangoservice.ITangoListener): number;
					public static disconnect(): void;
					public static lockCameraBuffer(param0: number, param1: native.Array<number>, param2: native.Array<number>): number;
					public static updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): number;
					public constructor();
					public static startCamerasIfNeeded(): number;
					public static disconnectCamera(param0: number): number;
					public static stopAllCameras(): number;
					public static unlockCameraBuffer(param0: number, param1: number): number;
					public static connectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.IOnImageAvailableListener, param2: boolean): number;
					public static setDatasetPathAndUUID(param0: string, param1: string): number;
					public static updateTextureExternalOes(param0: number, param1: number, param2: native.Array<number>): number;
					public static connectTextureId(param0: number, param1: number, param2: boolean): number;
				}
			}
		}
	}
}

import androidutilAttributeSet = android.util.AttributeSet;
import javaxmicroeditionkhronosopenglesGL10 = javax.microedition.khronos.opengles.GL10;
import javaxmicroeditionkhronoseglEGLConfig = javax.microedition.khronos.egl.EGLConfig;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./com.google.atap.tangoservice.Tango.d.ts" />
/// <reference path="./javax.microedition.khronos.egl.EGLConfig.d.ts" />
/// <reference path="./javax.microedition.khronos.opengles.GL10.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoCameraPreview {
					public connectToTangoCamera(param0: com.google.atap.tangoservice.Tango, param1: number): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public getTimestamp(): number;
					public disconnectFromTangoCamera(): void;
					public updateTexture(): void;
					public onFrameAvailable(): void;
					public constructor(param0: androidcontentContext);
				}
				export module TangoCameraPreview {
					export class MainRenderer {
						public close(): void;
						public onSurfaceChanged(param0: javaxmicroeditionkhronosopenglesGL10, param1: number, param2: number): void;
						public onDrawFrame(param0: javaxmicroeditionkhronosopenglesGL10): void;
						public getTextureId(): number;
						public onFrameAvailable(): void;
						public onSurfaceCreated(param0: javaxmicroeditionkhronosopenglesGL10, param1: javaxmicroeditionkhronoseglEGLConfig): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoConfig {
					public static CONFIG_TYPE_DEFAULT: number;
					public static CONFIG_TYPE_CURRENT: number;
					public static CONFIG_TYPE_MOTION_TRACKING: number;
					public static CONFIG_TYPE_AREA_DESCRIPTION: number;
					public static CONFIG_TYPE_RUNTIME: number;
					public static KEY_BOOLEAN_AUTORECOVERY: string;
					public static KEY_BOOLEAN_COLORCAMERA: string;
					public static KEY_BOOLEAN_DEPTH: string;
					public static KEY_INT_DEPTH_MODE: string;
					public static TANGO_DEPTH_MODE_XYZ_IJ: number;
					public static TANGO_DEPTH_MODE_POINT_CLOUD: number;
					public static KEY_BOOLEAN_LOWLATENCYIMUINTEGRATION: string;
					public static KEY_BOOLEAN_LEARNINGMODE: string;
					public static KEY_BOOLEAN_MOTIONTRACKING: string;
					public static KEY_BOOLEAN_DATASETRECORDING: string;
					public static KEY_BOOLEAN_DRIFT_CORRECTION: string;
					public static KEY_INT_DATASETRECORDING_MODE: string;
					public static TANGO_DATASETRECORDING_MODE_MOTION_TRACKING: number;
					public static TANGO_DATASETRECORDING_MODE_SCENE_RECONSTRUCTION: number;
					public static TANGO_DATASETRECORDING_MODE_MOTION_TRACKING_AND_FISHEYE: number;
					public static TANGO_DATASETRECORDING_MODE_ALL: number;
					public static KEY_STRING_DATASETS_PATH: string;
					public static KEY_BOOLEAN_EXPERIMENTAL_LOADDATASETUUID: string;
					public static KEY_STRING_LETANGO_LOADDATASETUUID: string;
					public static KEY_INT_EXPERIMENTAL_RUNTIME_RECORDING_CONTROL: string;
					public static TANGO_RUNTIME_RECORDING_NO_CHANGE: number;
					public static TANGO_RUNTIME_RECORDING_START: number;
					public static TANGO_RUNTIME_RECORDING_STOP: number;
					public static KEY_INT_EXPERIMENTAL_RUNTIME_PLANE_DETECTION_CONTROL: string;
					public static TANGO_RUNTIME_PLANE_DETECTION_NO_CHANGE: number;
					public static TANGO_RUNTIME_PLANE_DETECTION_START: number;
					public static TANGO_RUNTIME_PLANE_DETECTION_STOP: number;
					public static KEY_STRING_AREADESCRIPTION: string;
					public static KEY_INT_MAXPOINTCLOUDELEMENTS: string;
					public static KEY_DOUBLE_DEPTHPERIODINSECONDS: string;
					public static KEY_STRING_SERVICEVERSION: string;
					public static KEY_BOOLEAN_HIGH_RATE_POSE: string;
					public static KEY_BOOLEAN_SMOOTH_POSE: string;
					public static KEY_BOOLEAN_USE_3DOF_FALLBACK: string;
					public static KEY_INT_RUNTIME_DEPTH_FRAMERATE: string;
					public static KEY_BOOLEAN_EXPERIMENTAL_PLANE_DETECTION: string;
					public static KEY_BOOLEAN_EXPERIMENTAL_DEPTH_FROM_VIO: string;
					public static KEY_BOOLEAN_EXPERIMENTAL_ONLINE_CALIBRATION: string;
					public static CREATOR: androidosParcelableCreator;
					public putString(param0: string, param1: string): void;
					public getInt(param0: string): number;
					public describeContents(): number;
					public getString(param0: string): string;
					public putDouble(param0: string, param1: number): void;
					public putInt(param0: string, param1: number): void;
					public getBoolean(param0: string): boolean;
					public constructor();
					public readFromParcel(param0: androidosParcel): void;
					public getDouble(param0: string): number;
					public putBoolean(param0: string, param1: boolean): void;
					public putLong(param0: string, param1: number): void;
					public getLong(param0: string): number;
					public keySet(): javautilSet;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoCoordinateFramePair {
					public baseFrame: number;
					public targetFrame: number;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public constructor(param0: number, param1: number);
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoErrorException extends com.google.atap.tangoservice.TangoException {
					public constructor();
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoEvent {
					public static EVENT_UNKNOWN: number;
					public static EVENT_GENERAL: number;
					public static EVENT_FISHEYE_CAMERA: number;
					public static EVENT_COLOR_CAMERA: number;
					public static EVENT_IMU: number;
					public static EVENT_FEATURE_TRACKING: number;
					public static EVENT_AREA_LEARNING: number;
					public static EVENT_CLOUD_ADF: number;
					public static EVENT_SENSOR_FAILURE: number;
					public static KEY_AREA_DESCRIPTION_SAVE_PROGRESS: string;
					public static KEY_SERVICE_EXCEPTION: string;
					public static VALUE_SERVICE_FAULT: string;
					public static DESCRIPTION_FISHEYE_OVER_EXPOSED: string;
					public static DESCRIPTION_FISHEYE_UNDER_EXPOSED: string;
					public static DESCRIPTION_COLOR_OVER_EXPOSED: string;
					public static DESCRIPTION_COLOR_UNDER_EXPOSED: string;
					public static DESCRIPTION_TOO_FEW_FEATURES_TRACKED: string;
					public static KEY_SENSOR_IMU: string;
					public static KEY_SENSOR_FEATURES: string;
					public static DESCRIPTION_SENSOR_STARTUP_FAILURE: string;
					public static DESCRIPTION_SENSOR_CALLBACK_FAILURE: string;
					public timestamp: number;
					public eventType: number;
					public eventKey: string;
					public eventValue: string;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoException {
					public constructor();
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoFoiResult {
					public id: string;
					public status: number;
					public constructor(param0: number, param1: string);
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.nio.ByteBuffer.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoImage {
					public static TANGO_MAX_IMAGE_PLANES: number;
					public static RGBA_8888: number;
					public static RGB_888: number;
					public static YV12: number;
					public static YCRCB_420_SP: number;
					public static DEPTH16: number;
					public width: number;
					public height: number;
					public format: number;
					public timestampNs: number;
					public numPlanes: number;
					public planeData: native.Array<javanioByteBuffer>;
					public planeSize: native.Array<number>;
					public planeRowStride: native.Array<number>;
					public planePixelStride: native.Array<number>;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoInvalidException extends com.google.atap.tangoservice.TangoException {
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoNoAdfPermissionException extends com.google.atap.tangoservice.TangoException {
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoNoCameraPermissionException extends com.google.atap.tangoservice.TangoException {
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoNoDatasetPermissionException extends com.google.atap.tangoservice.TangoException {
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoOutOfDateException extends com.google.atap.tangoservice.TangoErrorException {
					public constructor();
				}
			}
		}
	}
}

import androidosParcelFileDescriptor = android.os.ParcelFileDescriptor;
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.ParcelFileDescriptor.d.ts" />
/// <reference path="./java.nio.FloatBuffer.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoPointCloudData {
					public timestamp: number;
					public numPoints: number;
					public points: javanioFloatBuffer;
					public pointCloudParcelFileDescriptor: androidosParcelFileDescriptor;
					public pointCloudParcelFileDescriptorSize: number;
					public pointCloudParcelFileDescriptorFlags: number;
					public pointCloudParcelFileDescriptorOffset: number;
					public pointCloudNativeFileDescriptor: number;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public getPointsBuffer(): javanioFloatBuffer;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoPoseData {
					public static INDEX_TRANSLATION_X: number;
					public static INDEX_TRANSLATION_Y: number;
					public static INDEX_TRANSLATION_Z: number;
					public static INDEX_ROTATION_X: number;
					public static INDEX_ROTATION_Y: number;
					public static INDEX_ROTATION_Z: number;
					public static INDEX_ROTATION_W: number;
					public static COORDINATE_FRAME_GLOBAL_WGS84: number;
					public static COORDINATE_FRAME_AREA_DESCRIPTION: number;
					public static COORDINATE_FRAME_START_OF_SERVICE: number;
					public static COORDINATE_FRAME_PREVIOUS_DEVICE_POSE: number;
					public static COORDINATE_FRAME_DEVICE: number;
					public static COORDINATE_FRAME_IMU: number;
					public static COORDINATE_FRAME_DISPLAY: number;
					public static COORDINATE_FRAME_CAMERA_COLOR: number;
					public static COORDINATE_FRAME_CAMERA_DEPTH: number;
					public static COORDINATE_FRAME_CAMERA_FISHEYE: number;
					public static COORDINATE_FRAME_UUID: number;
					public static FRAME_NAMES: native.Array<string>;
					public static POSE_INITIALIZING: number;
					public static POSE_VALID: number;
					public static POSE_INVALID: number;
					public static POSE_UNKNOWN: number;
					public static STATUS_NAMES: native.Array<string>;
					public timestamp: number;
					public rotation: native.Array<number>;
					public translation: native.Array<number>;
					public statusCode: number;
					public baseFrame: number;
					public targetFrame: number;
					public confidence: number;
					public accuracy: number;
					public static CREATOR: androidosParcelableCreator;
					public toString(): string;
					public constructor();
					public describeContents(): number;
					public getRotationAsFloats(): native.Array<number>;
					public getTranslationAsFloats(): native.Array<number>;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

import androidgraphicsSurfaceTexture = android.graphics.SurfaceTexture;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.SurfaceTexture.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./com.google.atap.tangoservice.Tango.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoTextureCameraPreview {
					public connectToTangoCamera(param0: com.google.atap.tangoservice.Tango, param1: number): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public getTimestamp(): number;
					public onSurfaceTextureAvailable(param0: androidgraphicsSurfaceTexture, param1: number, param2: number): void;
					public updateTexture(): void;
					public onFrameAvailable(): void;
					public constructor(param0: androidcontentContext);
					public onSurfaceTextureSizeChanged(param0: androidgraphicsSurfaceTexture, param1: number, param2: number): void;
					public onSurfaceTextureDestroyed(param0: androidgraphicsSurfaceTexture): boolean;
					public onSurfaceTextureUpdated(param0: androidgraphicsSurfaceTexture): void;
				}
			}
		}
	}
}

import javalangObject = java.lang.Object;
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoTransformation {
					public static INDEX_TRANSLATION_X: number;
					public static INDEX_TRANSLATION_Y: number;
					public static INDEX_TRANSLATION_Z: number;
					public static INDEX_ROTATION_X: number;
					public static INDEX_ROTATION_Y: number;
					public static INDEX_ROTATION_Z: number;
					public static INDEX_ROTATION_W: number;
					public rotation: native.Array<number>;
					public translation: native.Array<number>;
					public static CREATOR: androidosParcelableCreator;
					public toString(): string;
					public constructor();
					public equals(param0: javalangObject): boolean;
					public describeContents(): number;
					public getRotationAsFloats(): native.Array<number>;
					public getTranslationAsFloats(): native.Array<number>;
					public readFromParcel(param0: androidosParcel): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.view.Surface.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoVhs {
					public onMetadata(param0: number, param1: number, param2: number, param3: number): void;
					public setDatasetPathAndUUID(param0: string, param1: string): number;
					public constructor(param0: androidcontentContext);
					public getTrackingSurface(): androidviewSurface;
					public disconnect(): void;
					public connect(param0: javalangRunnable): void;
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.ParcelFileDescriptor.d.ts" />
/// <reference path="./java.nio.FloatBuffer.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TangoXyzIjData {
					public timestamp: number;
					public xyzCount: number;
					public xyz: javanioFloatBuffer;
					public xyzParcelFileDescriptor: androidosParcelFileDescriptor;
					public xyzParcelFileDescriptorSize: number;
					public xyzParcelFileDescriptorFlags: number;
					public xyzParcelFileDescriptorOffset: number;
					public ijRows: number;
					public ijCols: number;
					public ijParcelFileDescriptor: androidosParcelFileDescriptor;
					public static CREATOR: androidosParcelableCreator;
					public constructor();
					public describeContents(): number;
					public readFromParcel(param0: androidosParcel): void;
					public getXyzBuffer(): javanioFloatBuffer;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.graphics.SurfaceTexture.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export class TextureRenderer {
					public setSurfaceTexture(param0: androidgraphicsSurfaceTexture): void;
					public destroy(): void;
					public setViewport(param0: number, param1: number): void;
					public run(): void;
					public getTextureId(): number;
					public onFrameAvailable(): void;
					public initTexture(): number;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module experimental {
					export class TangoCloudEventKeys {
						public static KEY_STATUS_READY: string;
						public static KEY_STATUS_NOT_AVAILABLE: string;
						public static KEY_STATUS_FAILURE: string;
						public constructor();
					}
				}
			}
		}
	}
}

import javautilUUID = java.util.UUID;
/// <reference path="./com.google.atap.tangoservice.TangoTransformation.d.ts" />
/// <reference path="./java.util.UUID.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module experimental {
					export class TangoFrameOfInterest {
						public constructor();
						public updateFrameOfInterest(param0: number, param1: javautilUUID, param2: com.google.atap.tangoservice.TangoTransformation, param3: javautilUUID): void;
						public deleteFrameOfInterest(param0: javautilUUID): void;
						public createFrameOfInterest(param0: number, param1: javautilUUID, param2: com.google.atap.tangoservice.TangoTransformation): javautilUUID;
					}
				}
			}
		}
	}
}

/// <reference path="./java.nio.ByteBuffer.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module experimental {
					export class TangoImageBuffer {
						public static RGBA_8888: number;
						public static RGB_888: number;
						public static YV12: number;
						public static YCRCB_420_SP: number;
						public static DEPTH16: number;
						public width: number;
						public height: number;
						public stride: number;
						public timestamp: number;
						public frameNumber: number;
						public format: number;
						public data: javanioByteBuffer;
						public exposureDurationNs: number;
						public constructor();
						public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: javanioByteBuffer, param7: number);
						public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: javanioByteBuffer);
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoPoseData.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module experimental {
					export class TangoPlaneData {
						public id: number;
						public pose: com.google.atap.tangoservice.TangoPoseData;
						public boundaryPolygon: native.Array<number>;
						public centerX: number;
						public centerY: number;
						public width: number;
						public height: number;
						public yaw: number;
						public timestamp: number;
						public subsumedBy: number;
						public isValid: boolean;
						public static CREATOR: androidosParcelableCreator;
						public constructor();
						public describeContents(): number;
						public readFromParcel(param0: androidosParcel): void;
						public toString(): string;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.TangoTransformation.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module fois {
					export abstract class FoiRequest {
						public mType: com.google.atap.tangoservice.fois.FoiRequest.Type;
						public mId: string;
						public static CREATOR: androidosParcelableCreator;
						public parcelRead(param0: androidosParcel): void;
						public describeContents(): number;
						public parcelWrite(param0: androidosParcel): void;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
					export module FoiRequest {
						export class Create extends com.google.atap.tangoservice.fois.FoiRequest {
							public mTimestamp: number;
							public mBaseFrameId: string;
							public mTransformation: com.google.atap.tangoservice.TangoTransformation;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
						export class Delete extends com.google.atap.tangoservice.fois.FoiRequest {
							public mFrameIds: native.Array<string>;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
						export class Load extends com.google.atap.tangoservice.fois.FoiRequest {
							public mFrameIds: native.Array<string>;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
						export class Type {
							public static INVALID: com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static CREATE: com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static LOAD: com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static DELETE: com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static valueOf(param0: string): com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static fromInt(param0: number): com.google.atap.tangoservice.fois.FoiRequest.Type;
							public static values(): native.Array<com.google.atap.tangoservice.fois.FoiRequest.Type>;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module google {
		export module atap {
			export module tangoservice {
				export module fois {
					export abstract class FoiResponse {
						public mType: com.google.atap.tangoservice.fois.FoiRequest.Type;
						public mId: string;
						public static CREATOR: androidosParcelableCreator;
						public parcelRead(param0: androidosParcel): void;
						public describeContents(): number;
						public parcelWrite(param0: androidosParcel): void;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
					export module FoiResponse {
						export class Create extends com.google.atap.tangoservice.fois.FoiResponse {
							public mStatus: number;
							public mFrameId: string;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
						export class Delete extends com.google.atap.tangoservice.fois.FoiResponse {
							public mStatuses: native.Array<number>;
							public mFrameIds: native.Array<string>;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
						export class Load extends com.google.atap.tangoservice.fois.FoiResponse {
							public mStatuses: native.Array<number>;
							public mFrameIds: native.Array<string>;
							public constructor();
							public parcelRead(param0: androidosParcel): void;
							public parcelWrite(param0: androidosParcel): void;
							public equals(param0: javalangObject): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module tango {
			export module javacommon {
				export class BuildConfig {
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

import javaioInputStream = java.io.InputStream;
import javaioOutputStream = java.io.OutputStream;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./java.io.InputStream.d.ts" />
/// <reference path="./java.io.OutputStream.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module tango {
			export module javacommon {
				export class FileUtils {
					public static fileExists(param0: string, param1: string): boolean;
					public static writeBytesToFile(param0: native.Array<number>, param1: string, param2: string): boolean;
					public static fileEmpty(param0: string, param1: string): boolean;
					public static deleteDirectoryRecursive(param0: string): void;
					public static writeToFile(param0: androidcontentContext, param1: string, param2: string): void;
					public static fileLastModified(param0: string): number;
					public static nonEmptyDirectoryExists(param0: string): boolean;
					public static fileLastModified(param0: string, param1: string): number;
					public static list(param0: string, param1: string): native.Array<string>;
					public static fileExists(param0: androidcontentContext, param1: string): boolean;
					public constructor();
					public static copyStream(param0: javaioInputStream, param1: javaioOutputStream): void;
					public static createFileIfMissing(param0: androidcontentContext, param1: string): void;
					public static setFileLastModified(param0: string, param1: string, param2: number): boolean;
					public static readFromFile(param0: androidcontentContext, param1: string): string;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module tango {
			export module javacommon {
				export class MovingAverager {
					public addValue(param0: number): number;
					public constructor(param0: number);
					public getCurrentAverage(): number;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module tango {
			export module javacommon {
				export class SimpleTimer {
					public getStartNanos(): number;
					public elapsedMillis(): number;
					public elapsedSeconds(): number;
					public static startNew(): com.google.tango.javacommon.SimpleTimer;
					public restart(): void;
					public elapsedNanos(): number;
				}
			}
		}
	}
}

/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.tango.loader.IObjectWrapper.d.ts" />
declare module com {
	export module google {
		export module tango {
			export module loader {
				export class IObjectWrapper {
					/**
					 * Constructs a new instance of the com.google.tango.loader.IObjectWrapper interface with the provided implementation.
					 */
					public constructor(implementation: {
					});
				}
				export module IObjectWrapper {
					export abstract class Stub {
						public constructor();
						public static asInterface(param0: androidosIBinder): com.google.tango.loader.IObjectWrapper;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public asBinder(): androidosIBinder;
					}
					export module Stub {
						export class Proxy {
							public getInterfaceDescriptor(): string;
							public asBinder(): androidosIBinder;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.IBinder.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnFrameAvailableListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.IOnImageAvailableListener.d.ts" />
/// <reference path="./com.google.atap.tangoservice.ITangoListener.d.ts" />
/// <reference path="./com.google.tango.loader.IObjectWrapper.d.ts" />
/// <reference path="./com.google.tango.loader.ITangoCameraNative.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module google {
		export module tango {
			export module loader {
				export class ITangoCameraNative {
					/**
					 * Constructs a new instance of the com.google.tango.loader.ITangoCameraNative interface with the provided implementation.
					 */
					public constructor(implementation: {
						initialize(param0: com.google.tango.loader.IObjectWrapper, param1: com.google.atap.tangoservice.ITangoListener): number;
						connectTextureId(param0: number, param1: number, param2: boolean): number;
						updateTexture(param0: number, param1: native.Array<number>): number;
						connectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.IOnFrameAvailableListener, param2: boolean): number;
						startCamerasIfNeeded(): number;
						disconnectCamera(param0: number): number;
						stopAllCameras(): number;
						connectOnTextureAvailable(param0: number, param1: boolean): number;
						updateTextureExternalOes(param0: number, param1: number, param2: native.Array<number>): number;
						lockCameraBuffer(param0: number, param1: native.Array<number>, param2: native.Array<number>): number;
						unlockCameraBuffer(param0: number, param1: number): number;
						updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): number;
						connectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.IOnImageAvailableListener, param2: boolean): number;
						setDatasetPathAndUUID(param0: string, param1: string): number;
					});
					public connectOnTextureAvailable(param0: number, param1: boolean): number;
					public setDatasetPathAndUUID(param0: string, param1: string): number;
					public connectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.IOnFrameAvailableListener, param2: boolean): number;
					public lockCameraBuffer(param0: number, param1: native.Array<number>, param2: native.Array<number>): number;
					public updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): number;
					public stopAllCameras(): number;
					public connectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.IOnImageAvailableListener, param2: boolean): number;
					public updateTexture(param0: number, param1: native.Array<number>): number;
					public updateTextureExternalOes(param0: number, param1: number, param2: native.Array<number>): number;
					public unlockCameraBuffer(param0: number, param1: number): number;
					public startCamerasIfNeeded(): number;
					public disconnectCamera(param0: number): number;
					public initialize(param0: com.google.tango.loader.IObjectWrapper, param1: com.google.atap.tangoservice.ITangoListener): number;
					public connectTextureId(param0: number, param1: number, param2: boolean): number;
				}
				export module ITangoCameraNative {
					export abstract class Stub {
						public connectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.IOnFrameAvailableListener, param2: boolean): number;
						public stopAllCameras(): number;
						public constructor();
						public updateTextureExternalOes(param0: number, param1: number, param2: native.Array<number>): number;
						public connectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.IOnImageAvailableListener, param2: boolean): number;
						public initialize(param0: com.google.tango.loader.IObjectWrapper, param1: com.google.atap.tangoservice.ITangoListener): number;
						public updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): number;
						public startCamerasIfNeeded(): number;
						public asBinder(): androidosIBinder;
						public disconnectCamera(param0: number): number;
						public setDatasetPathAndUUID(param0: string, param1: string): number;
						public static asInterface(param0: androidosIBinder): com.google.tango.loader.ITangoCameraNative;
						public connectTextureId(param0: number, param1: number, param2: boolean): number;
						public lockCameraBuffer(param0: number, param1: native.Array<number>, param2: native.Array<number>): number;
						public unlockCameraBuffer(param0: number, param1: number): number;
						public onTransact(param0: number, param1: androidosParcel, param2: androidosParcel, param3: number): boolean;
						public updateTexture(param0: number, param1: native.Array<number>): number;
						public connectOnTextureAvailable(param0: number, param1: boolean): number;
					}
					export module Stub {
						export class Proxy {
							public connectOnFrameAvailable(param0: number, param1: com.google.atap.tangoservice.IOnFrameAvailableListener, param2: boolean): number;
							public stopAllCameras(): number;
							public lockCameraBuffer(param0: number, param1: native.Array<number>, param2: native.Array<number>): number;
							public startCamerasIfNeeded(): number;
							public updateTextureExternalOes(param0: number, param1: number, param2: native.Array<number>): number;
							public connectOnImageAvailable(param0: number, param1: com.google.atap.tangoservice.IOnImageAvailableListener, param2: boolean): number;
							public connectTextureId(param0: number, param1: number, param2: boolean): number;
							public unlockCameraBuffer(param0: number, param1: number): number;
							public updateTextureExternalOesForBuffer(param0: number, param1: number, param2: number): number;
							public connectOnTextureAvailable(param0: number, param1: boolean): number;
							public disconnectCamera(param0: number): number;
							public getInterfaceDescriptor(): string;
							public updateTexture(param0: number, param1: native.Array<number>): number;
							public asBinder(): androidosIBinder;
							public initialize(param0: com.google.tango.loader.IObjectWrapper, param1: com.google.atap.tangoservice.ITangoListener): number;
							public setDatasetPathAndUUID(param0: string, param1: string): number;
						}
					}
				}
			}
		}
	}
}

import javalangClass = java.lang.Class;
/// <reference path="./com.google.tango.loader.IObjectWrapper.d.ts" />
/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module google {
		export module tango {
			export module loader {
				export class ObjectWrapper extends com.google.tango.loader.IObjectWrapper.Stub {
					public static unwrap(param0: com.google.tango.loader.IObjectWrapper, param1: javalangClass): javalangObject;
					public static wrap(param0: javalangObject): com.google.tango.loader.IObjectWrapper;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Vector3d.d.ts" />
declare module javax {
	export module vecmath {
		export class AxisAngle4d {
			public x: number;
			public y: number;
			public z: number;
			public angle: number;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public get(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public equals(param0: javalangObject): boolean;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public set(param0: javax.vecmath.Matrix4f): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public set(param0: native.Array<number>): void;
			public equals(param0: javax.vecmath.AxisAngle4d): boolean;
			public toString(): string;
			public epsilonEquals(param0: javax.vecmath.AxisAngle4d, param1: number): boolean;
			public constructor(param0: javax.vecmath.Vector3d, param1: number);
			public set(param0: javax.vecmath.Quat4d): void;
			public constructor(param0: javax.vecmath.AxisAngle4d);
			public set(param0: javax.vecmath.Matrix3d): void;
			public set(param0: javax.vecmath.Vector3d, param1: number): void;
			public constructor(param0: javax.vecmath.AxisAngle4f);
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
declare module javax {
	export module vecmath {
		export class AxisAngle4f {
			public x: number;
			public y: number;
			public z: number;
			public angle: number;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public get(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public equals(param0: javalangObject): boolean;
			public epsilonEquals(param0: javax.vecmath.AxisAngle4f, param1: number): boolean;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public set(param0: javax.vecmath.Matrix4f): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public equals(param0: javax.vecmath.AxisAngle4f): boolean;
			public set(param0: native.Array<number>): void;
			public toString(): string;
			public set(param0: javax.vecmath.Vector3f, param1: number): void;
			public set(param0: javax.vecmath.Quat4d): void;
			public constructor(param0: javax.vecmath.AxisAngle4d);
			public set(param0: javax.vecmath.Matrix3d): void;
			public constructor(param0: javax.vecmath.Vector3f, param1: number);
			public constructor(param0: javax.vecmath.AxisAngle4f);
			public hashCode(): number;
		}
	}
}

declare module javax {
	export module vecmath {
		export class BuildConfig {
			public static DEBUG: boolean;
			public static APPLICATION_ID: string;
			public static BUILD_TYPE: string;
			public static FLAVOR: string;
			public static VERSION_CODE: number;
			public static VERSION_NAME: string;
			public constructor();
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3b.d.ts" />
declare module javax {
	export module vecmath {
		export class Color3b extends javax.vecmath.Tuple3b {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Color3b);
			public constructor(param0: javax.vecmath.Tuple3b);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
declare module javax {
	export module vecmath {
		export class Color3f extends javax.vecmath.Tuple3f {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: javax.vecmath.Color3f);
			public constructor(param0: javax.vecmath.Tuple3d);
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
		}
	}
}

/// <reference path="./javax.vecmath.Tuple4b.d.ts" />
declare module javax {
	export module vecmath {
		export class Color4b extends javax.vecmath.Tuple4b {
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Color4b);
			public constructor(param0: javax.vecmath.Tuple4b);
			public constructor(param0: number, param1: number, param2: number, param3: number);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Color4f extends javax.vecmath.Tuple4f {
			public constructor(param0: javax.vecmath.Color4f);
			public constructor(param0: javax.vecmath.Tuple4f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public constructor(param0: javax.vecmath.Tuple4d);
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.GVector.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
declare module javax {
	export module vecmath {
		export class GMatrix {
			public getColumn(param0: number, param1: javax.vecmath.GVector): void;
			public equals(param0: javalangObject): boolean;
			public epsilonEquals(param0: javax.vecmath.GMatrix, param1: number): boolean;
			public get(param0: javax.vecmath.Matrix3f): void;
			public invert(param0: javax.vecmath.GMatrix): void;
			public setScale(param0: number): void;
			public set(param0: native.Array<number>): void;
			public get(param0: javax.vecmath.Matrix3d): void;
			public setColumn(param0: number, param1: native.Array<number>): void;
			public getNumRow(): number;
			public add(param0: javax.vecmath.GMatrix): void;
			public trace(): number;
			public getElement(param0: number, param1: number): number;
			public copySubMatrix(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: javax.vecmath.GMatrix): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public equals(param0: javax.vecmath.GMatrix): boolean;
			public set(param0: javax.vecmath.Matrix4f): void;
			public setElement(param0: number, param1: number, param2: number): void;
			public setRow(param0: number, param1: native.Array<number>): void;
			public constructor(param0: javax.vecmath.GMatrix);
			public sub(param0: javax.vecmath.GMatrix): void;
			public constructor(param0: number, param1: number, param2: native.Array<number>);
			public setZero(): void;
			public setColumn(param0: number, param1: javax.vecmath.GVector): void;
			public transpose(): void;
			public LUD(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GVector): number;
			public mul(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public mul(param0: javax.vecmath.GVector, param1: javax.vecmath.GVector): void;
			public mulTransposeBoth(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public SVD(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix, param2: javax.vecmath.GMatrix): number;
			public sub(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public setSize(param0: number, param1: number): void;
			public setRow(param0: number, param1: javax.vecmath.GVector): void;
			public identityMinus(): void;
			public getRow(param0: number, param1: native.Array<number>): void;
			public setIdentity(): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public constructor(param0: number, param1: number);
			public get(param0: javax.vecmath.Matrix4f): void;
			public getNumCol(): number;
			public getRow(param0: number, param1: javax.vecmath.GVector): void;
			public invert(): void;
			public negate(param0: javax.vecmath.GMatrix): void;
			public getColumn(param0: number, param1: native.Array<number>): void;
			public get(param0: javax.vecmath.Matrix4d): void;
			public set(param0: javax.vecmath.GMatrix): void;
			public mul(param0: javax.vecmath.GMatrix): void;
			public negate(): void;
			public toString(): string;
			public transpose(param0: javax.vecmath.GMatrix): void;
			public mulTransposeRight(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public mulTransposeLeft(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public add(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): void;
			public get(param0: javax.vecmath.GMatrix): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.GMatrix.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class GVector {
			public sub(param0: javax.vecmath.GVector, param1: javax.vecmath.GVector): void;
			public SVDBackSolve(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix, param2: javax.vecmath.GMatrix, param3: javax.vecmath.GVector): void;
			public interpolate(param0: javax.vecmath.GVector, param1: javax.vecmath.GVector, param2: number): void;
			public set(param0: javax.vecmath.Tuple3d): void;
			public equals(param0: javalangObject): boolean;
			public constructor(param0: javax.vecmath.Tuple3d);
			public normalize(): void;
			public constructor(param0: javax.vecmath.GVector);
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>, param1: number);
			public sub(param0: javax.vecmath.GVector): void;
			public getSize(): number;
			public set(param0: native.Array<number>): void;
			public scale(param0: number): void;
			public mul(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GVector): void;
			public getElement(param0: number): number;
			public setSize(param0: number): void;
			public setElement(param0: number, param1: number): void;
			public norm(): number;
			public epsilonEquals(param0: javax.vecmath.GVector, param1: number): boolean;
			public set(param0: javax.vecmath.Tuple3f): void;
			public scaleAdd(param0: number, param1: javax.vecmath.GVector, param2: javax.vecmath.GVector): void;
			public normalize(param0: javax.vecmath.GVector): void;
			public set(param0: javax.vecmath.Tuple2f): void;
			public LUDBackSolve(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GVector, param2: javax.vecmath.GVector): void;
			public constructor(param0: number);
			public dot(param0: javax.vecmath.GVector): number;
			public constructor(param0: javax.vecmath.Tuple4f);
			public interpolate(param0: javax.vecmath.GVector, param1: number): void;
			public add(param0: javax.vecmath.GVector, param1: javax.vecmath.GVector): void;
			public constructor(param0: native.Array<number>);
			public constructor(param0: javax.vecmath.Tuple2f);
			public add(param0: javax.vecmath.GVector): void;
			public constructor(param0: javax.vecmath.Tuple4d);
			public normSquared(): number;
			public zero(): void;
			public negate(): void;
			public set(param0: javax.vecmath.GVector): void;
			public toString(): string;
			public equals(param0: javax.vecmath.GVector): boolean;
			public set(param0: javax.vecmath.Tuple4f): void;
			public mul(param0: javax.vecmath.GVector, param1: javax.vecmath.GMatrix): void;
			public angle(param0: javax.vecmath.GVector): number;
			public scale(param0: number, param1: javax.vecmath.GVector): void;
			public set(param0: javax.vecmath.Tuple4d): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Vector3d.d.ts" />
declare module javax {
	export module vecmath {
		export class Matrix3d {
			public m00: number;
			public m01: number;
			public m02: number;
			public m10: number;
			public m11: number;
			public m12: number;
			public m20: number;
			public m21: number;
			public m22: number;
			public getColumn(param0: number, param1: javax.vecmath.Vector3d): void;
			public sub(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public equals(param0: javalangObject): boolean;
			public rotY(param0: number): void;
			public mulTransposeRight(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public negate(param0: javax.vecmath.Matrix3d): void;
			public setScale(param0: number): void;
			public set(param0: native.Array<number>): void;
			public setColumn(param0: number, param1: native.Array<number>): void;
			public getRow(param0: number, param1: javax.vecmath.Vector3d): void;
			public constructor(param0: javax.vecmath.Matrix3f);
			public equals(param0: javax.vecmath.Matrix3d): boolean;
			public constructor(param0: javax.vecmath.Matrix3d);
			public set(param0: javax.vecmath.Quat4d): void;
			public mulNormalize(param0: javax.vecmath.Matrix3d): void;
			public normalizeCP(): void;
			public transform(param0: javax.vecmath.Tuple3d, param1: javax.vecmath.Tuple3d): void;
			public getElement(param0: number, param1: number): number;
			public setRow(param0: number, param1: javax.vecmath.Vector3d): void;
			public setColumn(param0: number, param1: javax.vecmath.Vector3d): void;
			public rotZ(param0: number): void;
			public mul(param0: number): void;
			public add(param0: number, param1: javax.vecmath.Matrix3d): void;
			public add(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public setElement(param0: number, param1: number, param2: number): void;
			public setRow(param0: number, param1: number, param2: number, param3: number): void;
			public setRow(param0: number, param1: native.Array<number>): void;
			public determinant(): number;
			public normalize(param0: javax.vecmath.Matrix3d): void;
			public setZero(): void;
			public transpose(): void;
			public transform(param0: javax.vecmath.Tuple3d): void;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public mul(param0: number, param1: javax.vecmath.Matrix3d): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public sub(param0: javax.vecmath.Matrix3d): void;
			public normalize(): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public epsilonEquals(param0: javax.vecmath.Matrix3d, param1: number): boolean;
			public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number);
			public add(param0: number): void;
			public getScale(): number;
			public mul(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public getRow(param0: number, param1: native.Array<number>): void;
			public setIdentity(): void;
			public add(param0: javax.vecmath.Matrix3d): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public normalizeCP(param0: javax.vecmath.Matrix3d): void;
			public rotX(param0: number): void;
			public invert(): void;
			public transpose(param0: javax.vecmath.Matrix3d): void;
			public set(param0: number): void;
			public mulTransposeLeft(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public setColumn(param0: number, param1: number, param2: number, param3: number): void;
			public getColumn(param0: number, param1: native.Array<number>): void;
			public mulNormalize(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public invert(param0: javax.vecmath.Matrix3d): void;
			public mul(param0: javax.vecmath.Matrix3d): void;
			public mulTransposeBoth(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): void;
			public toString(): string;
			public negate(): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
declare module javax {
	export module vecmath {
		export class Matrix3f {
			public m00: number;
			public m01: number;
			public m02: number;
			public m10: number;
			public m11: number;
			public m12: number;
			public m20: number;
			public m21: number;
			public m22: number;
			public equals(param0: javalangObject): boolean;
			public rotY(param0: number): void;
			public mulNormalize(param0: javax.vecmath.Matrix3f): void;
			public getColumn(param0: number, param1: javax.vecmath.Vector3f): void;
			public getRow(param0: number, param1: javax.vecmath.Vector3f): void;
			public setScale(param0: number): void;
			public set(param0: native.Array<number>): void;
			public setColumn(param0: number, param1: native.Array<number>): void;
			public mul(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public constructor(param0: javax.vecmath.Matrix3f);
			public transpose(param0: javax.vecmath.Matrix3f): void;
			public constructor(param0: javax.vecmath.Matrix3d);
			public set(param0: javax.vecmath.Quat4d): void;
			public normalizeCP(): void;
			public add(param0: number, param1: javax.vecmath.Matrix3f): void;
			public mulNormalize(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public getElement(param0: number, param1: number): number;
			public mulTransposeBoth(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public mulTransposeLeft(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public rotZ(param0: number): void;
			public mul(param0: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public setElement(param0: number, param1: number, param2: number): void;
			public setRow(param0: number, param1: number, param2: number, param3: number): void;
			public setRow(param0: number, param1: native.Array<number>): void;
			public setColumn(param0: number, param1: javax.vecmath.Vector3f): void;
			public determinant(): number;
			public epsilonEquals(param0: javax.vecmath.Matrix3f, param1: number): boolean;
			public negate(param0: javax.vecmath.Matrix3f): void;
			public setZero(): void;
			public setRow(param0: number, param1: javax.vecmath.Vector3f): void;
			public transpose(): void;
			public transform(param0: javax.vecmath.Tuple3f, param1: javax.vecmath.Tuple3f): void;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public sub(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public mul(param0: number, param1: javax.vecmath.Matrix3f): void;
			public sub(param0: javax.vecmath.Matrix3f): void;
			public normalize(): void;
			public transform(param0: javax.vecmath.Tuple3f): void;
			public add(param0: javax.vecmath.Matrix3f): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public normalize(param0: javax.vecmath.Matrix3f): void;
			public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number);
			public normalizeCP(param0: javax.vecmath.Matrix3f): void;
			public add(param0: number): void;
			public getScale(): number;
			public getRow(param0: number, param1: native.Array<number>): void;
			public setIdentity(): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public mulTransposeRight(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public rotX(param0: number): void;
			public invert(): void;
			public set(param0: number): void;
			public setColumn(param0: number, param1: number, param2: number, param3: number): void;
			public getColumn(param0: number, param1: native.Array<number>): void;
			public toString(): string;
			public negate(): void;
			public mul(param0: javax.vecmath.Matrix3f): void;
			public invert(param0: javax.vecmath.Matrix3f): void;
			public equals(param0: javax.vecmath.Matrix3f): boolean;
			public add(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Point3d.d.ts" />
/// <reference path="./javax.vecmath.Point3f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
/// <reference path="./javax.vecmath.Vector3d.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
/// <reference path="./javax.vecmath.Vector4d.d.ts" />
declare module javax {
	export module vecmath {
		export class Matrix4d {
			public m00: number;
			public m01: number;
			public m02: number;
			public m03: number;
			public m10: number;
			public m11: number;
			public m12: number;
			public m13: number;
			public m20: number;
			public m21: number;
			public m22: number;
			public m23: number;
			public m30: number;
			public m31: number;
			public m32: number;
			public m33: number;
			public get(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Vector3d): number;
			public equals(param0: javalangObject): boolean;
			public set(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Vector3d, param2: number): void;
			public get(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3d): number;
			public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number, param12: number, param13: number, param14: number, param15: number);
			public transform(param0: javax.vecmath.Vector3d, param1: javax.vecmath.Vector3d): void;
			public transform(param0: javax.vecmath.Tuple4f): void;
			public get(param0: javax.vecmath.Matrix3d): void;
			public equals(param0: javax.vecmath.Matrix4d): boolean;
			public set(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Vector3d, param2: number): void;
			public epsilonEquals(param0: javax.vecmath.Matrix4d, param1: number): boolean;
			public setRotationScale(param0: javax.vecmath.Matrix3d): void;
			public constructor(param0: javax.vecmath.Matrix4f);
			public mul(param0: number): void;
			public set(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Vector3d, param2: number): void;
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.Matrix4f): void;
			public determinant(): number;
			public get(param0: javax.vecmath.Quat4f): void;
			public transform(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f): void;
			public transform(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d): void;
			public getRotationScale(param0: javax.vecmath.Matrix3d): void;
			public set(param0: javax.vecmath.Vector3d, param1: number): void;
			public transpose(): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public mul(param0: javax.vecmath.Matrix4d): void;
			public constructor(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Vector3d, param2: number);
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public transform(param0: javax.vecmath.Point3d, param1: javax.vecmath.Point3d): void;
			public add(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
			public setIdentity(): void;
			public setRotation(param0: javax.vecmath.Matrix3f): void;
			public invert(): void;
			public set(param0: number): void;
			public set(param0: javax.vecmath.Vector3d): void;
			public getColumn(param0: number, param1: native.Array<number>): void;
			public add(param0: javax.vecmath.Matrix4d): void;
			public getRow(param0: number, param1: javax.vecmath.Vector4d): void;
			public sub(param0: javax.vecmath.Matrix4d): void;
			public transform(param0: javax.vecmath.Point3f): void;
			public transpose(param0: javax.vecmath.Matrix4d): void;
			public negate(): void;
			public mul(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
			public transform(param0: javax.vecmath.Vector3f): void;
			public hashCode(): number;
			public setRotation(param0: javax.vecmath.Quat4d): void;
			public getRotationScale(param0: javax.vecmath.Matrix3f): void;
			public rotY(param0: number): void;
			public get(param0: javax.vecmath.Matrix3f): void;
			public set(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3f, param2: number): void;
			public setTranslation(param0: javax.vecmath.Vector3d): void;
			public constructor(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Vector3d, param2: number);
			public setScale(param0: number): void;
			public set(param0: native.Array<number>): void;
			public setRow(param0: number, param1: number, param2: number, param3: number, param4: number): void;
			public setColumn(param0: number, param1: native.Array<number>): void;
			public invert(param0: javax.vecmath.Matrix4d): void;
			public set(param0: javax.vecmath.Quat4d): void;
			public setRow(param0: number, param1: javax.vecmath.Vector4d): void;
			public get(param0: javax.vecmath.Quat4d): void;
			public constructor(param0: javax.vecmath.Matrix4d);
			public getElement(param0: number, param1: number): number;
			public set(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Vector3f, param2: number): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public rotZ(param0: number): void;
			public get(param0: javax.vecmath.Vector3d): void;
			public mul(param0: number, param1: javax.vecmath.Matrix4d): void;
			public constructor(param0: native.Array<number>);
			public setElement(param0: number, param1: number, param2: number): void;
			public setRow(param0: number, param1: native.Array<number>): void;
			public sub(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
			public setRotationScale(param0: javax.vecmath.Matrix3f): void;
			public setZero(): void;
			public add(param0: number, param1: javax.vecmath.Matrix4d): void;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public set(param0: number, param1: javax.vecmath.Vector3d): void;
			public setColumn(param0: number, param1: javax.vecmath.Vector4d): void;
			public setRotation(param0: javax.vecmath.Quat4f): void;
			public transform(param0: javax.vecmath.Point3f, param1: javax.vecmath.Point3f): void;
			public add(param0: number): void;
			public negate(param0: javax.vecmath.Matrix4d): void;
			public getScale(): number;
			public transform(param0: javax.vecmath.Vector3f, param1: javax.vecmath.Vector3f): void;
			public getRow(param0: number, param1: native.Array<number>): void;
			public setRotation(param0: javax.vecmath.AxisAngle4d): void;
			public setColumn(param0: number, param1: number, param2: number, param3: number, param4: number): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public rotX(param0: number): void;
			public constructor(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Vector3d, param2: number);
			public constructor(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3d, param2: number);
			public transform(param0: javax.vecmath.Tuple4d): void;
			public transform(param0: javax.vecmath.Vector3d): void;
			public getColumn(param0: number, param1: javax.vecmath.Vector4d): void;
			public mulTransposeLeft(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
			public toString(): string;
			public transform(param0: javax.vecmath.Point3d): void;
			public setRotation(param0: javax.vecmath.Matrix3d): void;
			public mulTransposeRight(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
			public mulTransposeBoth(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): void;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Point3f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
/// <reference path="./javax.vecmath.Vector3d.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
/// <reference path="./javax.vecmath.Vector4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Matrix4f {
			public m00: number;
			public m01: number;
			public m02: number;
			public m03: number;
			public m10: number;
			public m11: number;
			public m12: number;
			public m13: number;
			public m20: number;
			public m21: number;
			public m22: number;
			public m23: number;
			public m30: number;
			public m31: number;
			public m32: number;
			public m33: number;
			public getRotationScale(param0: javax.vecmath.Matrix3f): void;
			public setTranslation(param0: javax.vecmath.Vector3f): void;
			public mul(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public equals(param0: javalangObject): boolean;
			public rotY(param0: number): void;
			public get(param0: javax.vecmath.Matrix3f): void;
			public set(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3f, param2: number): void;
			public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number, param12: number, param13: number, param14: number, param15: number);
			public setScale(param0: number): void;
			public set(param0: native.Array<number>): void;
			public setRow(param0: number, param1: number, param2: number, param3: number, param4: number): void;
			public add(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public add(param0: javax.vecmath.Matrix4f): void;
			public sub(param0: javax.vecmath.Matrix4f): void;
			public transform(param0: javax.vecmath.Tuple4f): void;
			public get(param0: javax.vecmath.Matrix3d): void;
			public setColumn(param0: number, param1: native.Array<number>): void;
			public set(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Vector3d, param2: number): void;
			public set(param0: javax.vecmath.Quat4d): void;
			public get(param0: javax.vecmath.Vector3f): void;
			public mul(param0: number, param1: javax.vecmath.Matrix4f): void;
			public constructor(param0: javax.vecmath.Matrix4d);
			public getElement(param0: number, param1: number): number;
			public constructor(param0: javax.vecmath.Matrix4f);
			public set(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Vector3f, param2: number): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public rotZ(param0: number): void;
			public mul(param0: number): void;
			public set(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Vector3d, param2: number): void;
			public setRow(param0: number, param1: javax.vecmath.Vector4f): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Quat4f): void;
			public setElement(param0: number, param1: number, param2: number): void;
			public set(param0: javax.vecmath.Matrix4f): void;
			public setRow(param0: number, param1: native.Array<number>): void;
			public determinant(): number;
			public get(param0: javax.vecmath.Quat4f): void;
			public mulTransposeBoth(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public transform(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f): void;
			public setRotationScale(param0: javax.vecmath.Matrix3f): void;
			public add(param0: number, param1: javax.vecmath.Matrix4f): void;
			public set(param0: number, param1: javax.vecmath.Vector3f): void;
			public setZero(): void;
			public mulTransposeLeft(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public transpose(): void;
			public setRotation(param0: javax.vecmath.AxisAngle4f): void;
			public mul(param0: javax.vecmath.Matrix4f): void;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public constructor(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Vector3f, param2: number);
			public setRotation(param0: javax.vecmath.Quat4f): void;
			public sub(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public mulTransposeRight(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): void;
			public transform(param0: javax.vecmath.Point3f, param1: javax.vecmath.Point3f): void;
			public setColumn(param0: number, param1: javax.vecmath.Vector4f): void;
			public add(param0: number): void;
			public getScale(): number;
			public getColumn(param0: number, param1: javax.vecmath.Vector4f): void;
			public set(param0: javax.vecmath.Vector3f, param1: number): void;
			public transform(param0: javax.vecmath.Vector3f, param1: javax.vecmath.Vector3f): void;
			public get(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3f): number;
			public getRow(param0: number, param1: native.Array<number>): void;
			public constructor(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Vector3f, param2: number);
			public setColumn(param0: number, param1: number, param2: number, param3: number, param4: number): void;
			public setIdentity(): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public negate(param0: javax.vecmath.Matrix4f): void;
			public getRow(param0: number, param1: javax.vecmath.Vector4f): void;
			public invert(param0: javax.vecmath.Matrix4f): void;
			public rotX(param0: number): void;
			public setRotation(param0: javax.vecmath.Matrix3f): void;
			public invert(): void;
			public set(param0: number): void;
			public getColumn(param0: number, param1: native.Array<number>): void;
			public set(param0: javax.vecmath.Vector3f): void;
			public transpose(param0: javax.vecmath.Matrix4f): void;
			public transform(param0: javax.vecmath.Point3f): void;
			public epsilonEquals(param0: javax.vecmath.Matrix4f, param1: number): boolean;
			public toString(): string;
			public negate(): void;
			public setRotation(param0: javax.vecmath.Matrix3d): void;
			public transform(param0: javax.vecmath.Vector3f): void;
			public equals(param0: javax.vecmath.Matrix4f): boolean;
			public hashCode(): number;
			public setRotation(param0: javax.vecmath.Quat4d): void;
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module javax {
	export module vecmath {
		export class MismatchedSizeException {
			public constructor();
			public constructor(param0: string);
		}
	}
}

/// <reference path="./javax.vecmath.Point2f.d.ts" />
/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point2d extends javax.vecmath.Tuple2d {
			public distanceSquared(param0: javax.vecmath.Point2d): number;
			public distanceL1(param0: javax.vecmath.Point2d): number;
			public distanceLinf(param0: javax.vecmath.Point2d): number;
			public constructor(param0: javax.vecmath.Point2d);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Point2f);
			public constructor(param0: javax.vecmath.Tuple2f);
			public distance(param0: javax.vecmath.Point2d): number;
			public constructor(param0: javax.vecmath.Tuple2d);
			public constructor(param0: number, param1: number);
		}
	}
}

/// <reference path="./javax.vecmath.Point2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point2f extends javax.vecmath.Tuple2f {
			public distance(param0: javax.vecmath.Point2f): number;
			public distanceSquared(param0: javax.vecmath.Point2f): number;
			public distanceLinf(param0: javax.vecmath.Point2f): number;
			public constructor(param0: javax.vecmath.Point2d);
			public distanceL1(param0: javax.vecmath.Point2f): number;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Point2f);
			public constructor(param0: javax.vecmath.Tuple2f);
			public constructor(param0: javax.vecmath.Tuple2d);
			public constructor(param0: number, param1: number);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple2i.d.ts" />
declare module javax {
	export module vecmath {
		export class Point2i extends javax.vecmath.Tuple2i {
			public constructor(param0: javax.vecmath.Tuple2i);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number);
		}
	}
}

/// <reference path="./javax.vecmath.Point3f.d.ts" />
/// <reference path="./javax.vecmath.Point4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point3d extends javax.vecmath.Tuple3d {
			public constructor(param0: number, param1: number, param2: number);
			public distanceL1(param0: javax.vecmath.Point3d): number;
			public constructor(param0: javax.vecmath.Tuple3d);
			public constructor(param0: javax.vecmath.Point3d);
			public constructor(param0: javax.vecmath.Tuple3f);
			public distanceLinf(param0: javax.vecmath.Point3d): number;
			public project(param0: javax.vecmath.Point4d): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Point3f);
			public distanceSquared(param0: javax.vecmath.Point3d): number;
			public distance(param0: javax.vecmath.Point3d): number;
		}
	}
}

/// <reference path="./javax.vecmath.Point3d.d.ts" />
/// <reference path="./javax.vecmath.Point4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point3f extends javax.vecmath.Tuple3f {
			public constructor(param0: number, param1: number, param2: number);
			public project(param0: javax.vecmath.Point4f): void;
			public distance(param0: javax.vecmath.Point3f): number;
			public distanceL1(param0: javax.vecmath.Point3f): number;
			public distanceSquared(param0: javax.vecmath.Point3f): number;
			public distanceLinf(param0: javax.vecmath.Point3f): number;
			public constructor(param0: javax.vecmath.Tuple3d);
			public constructor(param0: javax.vecmath.Point3d);
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Point3f);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3i.d.ts" />
declare module javax {
	export module vecmath {
		export class Point3i extends javax.vecmath.Tuple3i {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: javax.vecmath.Point3i);
			public constructor(param0: javax.vecmath.Tuple3i);
			public constructor(param0: native.Array<number>);
			public constructor();
		}
	}
}

/// <reference path="./javax.vecmath.Point4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point4d extends javax.vecmath.Tuple4d {
			public set(param0: javax.vecmath.Tuple3d): void;
			public constructor(param0: javax.vecmath.Point4f);
			public constructor(param0: javax.vecmath.Tuple3d);
			public constructor(param0: javax.vecmath.Tuple4f);
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public project(param0: javax.vecmath.Point4d): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public distanceLinf(param0: javax.vecmath.Point4d): number;
			public constructor(param0: javax.vecmath.Point4d);
			public constructor(param0: javax.vecmath.Tuple4d);
			public distance(param0: javax.vecmath.Point4d): number;
			public set(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Tuple4f): void;
			public distanceL1(param0: javax.vecmath.Point4d): number;
			public distanceSquared(param0: javax.vecmath.Point4d): number;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

/// <reference path="./javax.vecmath.Point4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Point4f extends javax.vecmath.Tuple4f {
			public project(param0: javax.vecmath.Point4f): void;
			public distance(param0: javax.vecmath.Point4f): number;
			public distanceL1(param0: javax.vecmath.Point4f): number;
			public constructor(param0: javax.vecmath.Point4f);
			public constructor(param0: javax.vecmath.Tuple4f);
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public constructor(param0: javax.vecmath.Point4d);
			public constructor(param0: javax.vecmath.Tuple4d);
			public set(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Tuple4f): void;
			public distanceLinf(param0: javax.vecmath.Point4f): number;
			public distanceSquared(param0: javax.vecmath.Point4f): number;
			public set(param0: javax.vecmath.Tuple3f): void;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple4i.d.ts" />
declare module javax {
	export module vecmath {
		export class Point4i extends javax.vecmath.Tuple4i {
			public constructor(param0: javax.vecmath.Tuple4i);
			public constructor(param0: javax.vecmath.Point4i);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
		}
	}
}

/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Quat4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Quat4d extends javax.vecmath.Tuple4d {
			public inverse(param0: javax.vecmath.Quat4d): void;
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public mul(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Quat4d): void;
			public mul(param0: javax.vecmath.Quat4d): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public constructor(param0: javax.vecmath.Quat4f);
			public normalize(): void;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: javax.vecmath.Quat4d);
			public interpolate(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d, param2: number): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public set(param0: native.Array<number>): void;
			public conjugate(): void;
			public normalize(param0: javax.vecmath.Quat4d): void;
			public inverse(): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public interpolate(param0: javax.vecmath.Tuple4d, param1: number): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public interpolate(param0: javax.vecmath.Quat4d, param1: number): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public interpolate(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Quat4d, param2: number): void;
			public mulInverse(param0: javax.vecmath.Quat4d): void;
			public set(param0: javax.vecmath.Matrix4f): void;
			public constructor(param0: javax.vecmath.Tuple4d);
			public mulInverse(param0: javax.vecmath.Quat4d, param1: javax.vecmath.Quat4d): void;
			public set(param0: javax.vecmath.Tuple4f): void;
			public conjugate(param0: javax.vecmath.Quat4d): void;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Quat4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Quat4f extends javax.vecmath.Tuple4f {
			public set(param0: javax.vecmath.AxisAngle4d): void;
			public set(param0: javax.vecmath.Matrix3f): void;
			public constructor(param0: javax.vecmath.Quat4f);
			public normalize(): void;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: javax.vecmath.Quat4d);
			public normalize(param0: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.AxisAngle4f): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public mul(param0: javax.vecmath.Quat4f): void;
			public set(param0: native.Array<number>): void;
			public conjugate(): void;
			public interpolate(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f, param2: number): void;
			public interpolate(param0: javax.vecmath.Quat4f, param1: number): void;
			public inverse(): void;
			public interpolate(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Quat4f, param2: number): void;
			public set(param0: javax.vecmath.Matrix3d): void;
			public interpolate(param0: javax.vecmath.Tuple4f, param1: number): void;
			public conjugate(param0: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.Matrix4d): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Matrix4f): void;
			public constructor(param0: javax.vecmath.Tuple4d);
			public set(param0: javax.vecmath.Tuple4f): void;
			public mul(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Quat4f): void;
			public mulInverse(param0: javax.vecmath.Quat4f): void;
			public inverse(param0: javax.vecmath.Quat4f): void;
			public mulInverse(param0: javax.vecmath.Quat4f, param1: javax.vecmath.Quat4f): void;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module javax {
	export module vecmath {
		export class SingularMatrixException {
			public constructor();
			public constructor(param0: string);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
declare module javax {
	export module vecmath {
		export class TexCoord2f extends javax.vecmath.Tuple2f {
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple2f);
			public constructor(param0: javax.vecmath.Tuple2d);
			public constructor(param0: number, param1: number);
			public constructor(param0: javax.vecmath.TexCoord2f);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
declare module javax {
	export module vecmath {
		export class TexCoord3f extends javax.vecmath.Tuple3f {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: javax.vecmath.Tuple3d);
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.TexCoord3f);
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple2d {
			public x: number;
			public y: number;
			public sub(param0: javax.vecmath.Tuple2d, param1: javax.vecmath.Tuple2d): void;
			public get(param0: native.Array<number>): void;
			public equals(param0: javalangObject): boolean;
			public absolute(): void;
			public clampMin(param0: number): void;
			public set(param0: number, param1: number): void;
			public interpolate(param0: javax.vecmath.Tuple2d, param1: number): void;
			public epsilonEquals(param0: javax.vecmath.Tuple2d, param1: number): boolean;
			public set(param0: native.Array<number>): void;
			public absolute(param0: javax.vecmath.Tuple2d): void;
			public scale(param0: number, param1: javax.vecmath.Tuple2d): void;
			public scale(param0: number): void;
			public clamp(param0: number, param1: number): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple2d): void;
			public sub(param0: javax.vecmath.Tuple2d): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2d, param2: javax.vecmath.Tuple2d): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple2d): void;
			public constructor(param0: number, param1: number);
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2d): void;
			public set(param0: javax.vecmath.Tuple2f): void;
			public negate(param0: javax.vecmath.Tuple2d): void;
			public set(param0: javax.vecmath.Tuple2d): void;
			public clampMax(param0: number): void;
			public add(param0: javax.vecmath.Tuple2d, param1: javax.vecmath.Tuple2d): void;
			public equals(param0: javax.vecmath.Tuple2d): boolean;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple2f);
			public constructor(param0: javax.vecmath.Tuple2d);
			public interpolate(param0: javax.vecmath.Tuple2d, param1: javax.vecmath.Tuple2d, param2: number): void;
			public negate(): void;
			public toString(): string;
			public add(param0: javax.vecmath.Tuple2d): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple2d): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple2f {
			public x: number;
			public y: number;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple2f): void;
			public sub(param0: javax.vecmath.Tuple2f, param1: javax.vecmath.Tuple2f): void;
			public get(param0: native.Array<number>): void;
			public equals(param0: javalangObject): boolean;
			public absolute(): void;
			public absolute(param0: javax.vecmath.Tuple2f): void;
			public clampMin(param0: number): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple2f): void;
			public equals(param0: javax.vecmath.Tuple2f): boolean;
			public epsilonEquals(param0: javax.vecmath.Tuple2f, param1: number): boolean;
			public set(param0: number, param1: number): void;
			public set(param0: native.Array<number>): void;
			public sub(param0: javax.vecmath.Tuple2f): void;
			public scale(param0: number): void;
			public clamp(param0: number, param1: number): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2f, param2: javax.vecmath.Tuple2f): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple2f): void;
			public constructor(param0: number, param1: number);
			public set(param0: javax.vecmath.Tuple2f): void;
			public negate(param0: javax.vecmath.Tuple2f): void;
			public set(param0: javax.vecmath.Tuple2d): void;
			public clampMax(param0: number): void;
			public scale(param0: number, param1: javax.vecmath.Tuple2f): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2f): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple2f);
			public interpolate(param0: javax.vecmath.Tuple2f, param1: number): void;
			public constructor(param0: javax.vecmath.Tuple2d);
			public add(param0: javax.vecmath.Tuple2f, param1: javax.vecmath.Tuple2f): void;
			public negate(): void;
			public toString(): string;
			public add(param0: javax.vecmath.Tuple2f): void;
			public interpolate(param0: javax.vecmath.Tuple2f, param1: javax.vecmath.Tuple2f, param2: number): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple2i {
			public x: number;
			public y: number;
			public clampMin(param0: number, param1: javax.vecmath.Tuple2i): void;
			public absolute(param0: javax.vecmath.Tuple2i): void;
			public get(param0: native.Array<number>): void;
			public add(param0: javax.vecmath.Tuple2i): void;
			public equals(param0: javalangObject): boolean;
			public absolute(): void;
			public clampMin(param0: number): void;
			public getY(): number;
			public set(param0: number, param1: number): void;
			public constructor(param0: javax.vecmath.Tuple2i);
			public set(param0: native.Array<number>): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2i): void;
			public scale(param0: number): void;
			public setY(param0: number): void;
			public clamp(param0: number, param1: number): void;
			public getX(): number;
			public clampMax(param0: number, param1: javax.vecmath.Tuple2i): void;
			public constructor(param0: number, param1: number);
			public add(param0: javax.vecmath.Tuple2i, param1: javax.vecmath.Tuple2i): void;
			public scale(param0: number, param1: javax.vecmath.Tuple2i): void;
			public clampMax(param0: number): void;
			public set(param0: javax.vecmath.Tuple2i): void;
			public sub(param0: javax.vecmath.Tuple2i): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple2i, param2: javax.vecmath.Tuple2i): void;
			public negate(param0: javax.vecmath.Tuple2i): void;
			public get(param0: javax.vecmath.Tuple2i): void;
			public negate(): void;
			public toString(): string;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple2i): void;
			public setX(param0: number): void;
			public sub(param0: javax.vecmath.Tuple2i, param1: javax.vecmath.Tuple2i): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple3b {
			public x: number;
			public y: number;
			public z: number;
			public constructor(param0: number, param1: number, param2: number);
			public set(param0: native.Array<number>): void;
			public toString(): string;
			public equals(param0: javax.vecmath.Tuple3b): boolean;
			public get(param0: native.Array<number>): void;
			public equals(param0: javalangObject): boolean;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Tuple3b): void;
			public constructor(param0: javax.vecmath.Tuple3b);
			public get(param0: javax.vecmath.Tuple3b): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple3d {
			public x: number;
			public y: number;
			public z: number;
			public constructor(param0: number, param1: number, param2: number);
			public set(param0: javax.vecmath.Tuple3d): void;
			public get(param0: native.Array<number>): void;
			public absolute(): void;
			public interpolate(param0: javax.vecmath.Tuple3d, param1: number): void;
			public constructor(param0: javax.vecmath.Tuple3d);
			public clampMin(param0: number): void;
			public negate(param0: javax.vecmath.Tuple3d): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3d): void;
			public scale(param0: number, param1: javax.vecmath.Tuple3d): void;
			public set(param0: number, param1: number, param2: number): void;
			public set(param0: native.Array<number>): void;
			public scale(param0: number): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3d, param2: javax.vecmath.Tuple3d): void;
			public add(param0: javax.vecmath.Tuple3d): void;
			public clamp(param0: number, param1: number): void;
			public set(param0: javax.vecmath.Tuple3f): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple3d): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple3d): void;
			public add(param0: javax.vecmath.Tuple3d, param1: javax.vecmath.Tuple3d): void;
			public epsilonEquals(param0: javax.vecmath.Tuple3d, param1: number): boolean;
			public equals(param0: javax.vecmath.Tuple3d): boolean;
			public clampMax(param0: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public absolute(param0: javax.vecmath.Tuple3d): void;
			public sub(param0: javax.vecmath.Tuple3d): void;
			public negate(): void;
			public toString(): string;
			public get(param0: javax.vecmath.Tuple3d): void;
			public sub(param0: javax.vecmath.Tuple3d, param1: javax.vecmath.Tuple3d): void;
			public interpolate(param0: javax.vecmath.Tuple3d, param1: javax.vecmath.Tuple3d, param2: number): void;
			public hashCode(): number;
			public clampMin(param0: number, param1: javax.vecmath.Tuple3d): void;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple3f {
			public x: number;
			public y: number;
			public z: number;
			public constructor(param0: number, param1: number, param2: number);
			public epsilonEquals(param0: javax.vecmath.Tuple3f, param1: number): boolean;
			public set(param0: javax.vecmath.Tuple3d): void;
			public get(param0: native.Array<number>): void;
			public absolute(): void;
			public constructor(param0: javax.vecmath.Tuple3d);
			public clampMin(param0: number): void;
			public sub(param0: javax.vecmath.Tuple3f): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public interpolate(param0: javax.vecmath.Tuple3f, param1: javax.vecmath.Tuple3f, param2: number): void;
			public negate(param0: javax.vecmath.Tuple3f): void;
			public set(param0: number, param1: number, param2: number): void;
			public set(param0: native.Array<number>): void;
			public scale(param0: number): void;
			public get(param0: javax.vecmath.Tuple3f): void;
			public clamp(param0: number, param1: number): void;
			public add(param0: javax.vecmath.Tuple3f, param1: javax.vecmath.Tuple3f): void;
			public set(param0: javax.vecmath.Tuple3f): void;
			public scale(param0: number, param1: javax.vecmath.Tuple3f): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple3f): void;
			public absolute(param0: javax.vecmath.Tuple3f): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple3f): void;
			public clampMax(param0: number): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple3f): void;
			public interpolate(param0: javax.vecmath.Tuple3f, param1: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public add(param0: javax.vecmath.Tuple3f): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3f, param2: javax.vecmath.Tuple3f): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3f): void;
			public negate(): void;
			public toString(): string;
			public equals(param0: javax.vecmath.Tuple3f): boolean;
			public sub(param0: javax.vecmath.Tuple3f, param1: javax.vecmath.Tuple3f): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple3i {
			public x: number;
			public y: number;
			public z: number;
			public constructor(param0: number, param1: number, param2: number);
			public get(param0: native.Array<number>): void;
			public equals(param0: javalangObject): boolean;
			public absolute(): void;
			public clampMin(param0: number): void;
			public scale(param0: number, param1: javax.vecmath.Tuple3i): void;
			public set(param0: number, param1: number, param2: number): void;
			public set(param0: native.Array<number>): void;
			public scale(param0: number): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple3i): void;
			public clamp(param0: number, param1: number): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple3i): void;
			public sub(param0: javax.vecmath.Tuple3i): void;
			public add(param0: javax.vecmath.Tuple3i, param1: javax.vecmath.Tuple3i): void;
			public get(param0: javax.vecmath.Tuple3i): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3i, param2: javax.vecmath.Tuple3i): void;
			public clampMax(param0: number): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public set(param0: javax.vecmath.Tuple3i): void;
			public absolute(param0: javax.vecmath.Tuple3i): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple3i): void;
			public negate(param0: javax.vecmath.Tuple3i): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple3i): void;
			public negate(): void;
			public toString(): string;
			public constructor(param0: javax.vecmath.Tuple3i);
			public sub(param0: javax.vecmath.Tuple3i, param1: javax.vecmath.Tuple3i): void;
			public add(param0: javax.vecmath.Tuple3i): void;
			public hashCode(): number;
		}
	}
}

declare module javax {
	export module vecmath {
		export abstract class Tuple4b {
			public x: number;
			public y: number;
			public z: number;
			public w: number;
			public get(param0: javax.vecmath.Tuple4b): void;
			public set(param0: native.Array<number>): void;
			public toString(): string;
			public equals(param0: javax.vecmath.Tuple4b): boolean;
			public get(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Tuple4b): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public constructor(param0: javax.vecmath.Tuple4b);
			public hashCode(): number;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple4d {
			public x: number;
			public y: number;
			public z: number;
			public w: number;
			public get(param0: native.Array<number>): void;
			public absolute(): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple4d): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple4d): void;
			public clampMin(param0: number): void;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public get(param0: javax.vecmath.Tuple4d): void;
			public interpolate(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d, param2: number): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple4d): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public add(param0: javax.vecmath.Tuple4d): void;
			public set(param0: native.Array<number>): void;
			public scale(param0: number): void;
			public clamp(param0: number, param1: number): void;
			public equals(param0: javax.vecmath.Tuple4d): boolean;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4d): void;
			public add(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d): void;
			public interpolate(param0: javax.vecmath.Tuple4d, param1: number): void;
			public sub(param0: javax.vecmath.Tuple4d): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4d, param2: javax.vecmath.Tuple4d): void;
			public clampMax(param0: number): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple4d);
			public epsilonEquals(param0: javax.vecmath.Tuple4d, param1: number): boolean;
			public negate(): void;
			public toString(): string;
			public set(param0: javax.vecmath.Tuple4f): void;
			public sub(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d): void;
			public absolute(param0: javax.vecmath.Tuple4d): void;
			public scale(param0: number, param1: javax.vecmath.Tuple4d): void;
			public negate(param0: javax.vecmath.Tuple4d): void;
			public set(param0: javax.vecmath.Tuple4d): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple4f {
			public x: number;
			public y: number;
			public z: number;
			public w: number;
			public get(param0: javax.vecmath.Tuple4f): void;
			public add(param0: javax.vecmath.Tuple4f): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4f): void;
			public get(param0: native.Array<number>): void;
			public negate(param0: javax.vecmath.Tuple4f): void;
			public absolute(): void;
			public clampMin(param0: number, param1: javax.vecmath.Tuple4f): void;
			public clampMin(param0: number): void;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public set(param0: native.Array<number>): void;
			public add(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple4f): void;
			public scale(param0: number): void;
			public epsilonEquals(param0: javax.vecmath.Tuple4f, param1: number): boolean;
			public clamp(param0: number, param1: number): void;
			public interpolate(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f, param2: number): void;
			public interpolate(param0: javax.vecmath.Tuple4f, param1: number): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4f, param2: javax.vecmath.Tuple4f): void;
			public sub(param0: javax.vecmath.Tuple4f): void;
			public clampMax(param0: number): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public sub(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple4d);
			public negate(): void;
			public equals(param0: javax.vecmath.Tuple4f): boolean;
			public toString(): string;
			public set(param0: javax.vecmath.Tuple4f): void;
			public absolute(param0: javax.vecmath.Tuple4f): void;
			public scale(param0: number, param1: javax.vecmath.Tuple4f): void;
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple4f): void;
			public set(param0: javax.vecmath.Tuple4d): void;
			public hashCode(): number;
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module javax {
	export module vecmath {
		export abstract class Tuple4i {
			public x: number;
			public y: number;
			public z: number;
			public w: number;
			public set(param0: javax.vecmath.Tuple4i): void;
			public negate(param0: javax.vecmath.Tuple4i): void;
			public get(param0: native.Array<number>): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4i): void;
			public equals(param0: javalangObject): boolean;
			public absolute(): void;
			public get(param0: javax.vecmath.Tuple4i): void;
			public scale(param0: number, param1: javax.vecmath.Tuple4i): void;
			public clampMin(param0: number): void;
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public add(param0: javax.vecmath.Tuple4i, param1: javax.vecmath.Tuple4i): void;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public set(param0: native.Array<number>): void;
			public add(param0: javax.vecmath.Tuple4i): void;
			public scale(param0: number): void;
			public constructor(param0: javax.vecmath.Tuple4i);
			public clamp(param0: number, param1: number): void;
			public clampMax(param0: number): void;
			public clampMax(param0: number, param1: javax.vecmath.Tuple4i): void;
			public absolute(param0: javax.vecmath.Tuple4i): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public clamp(param0: number, param1: number, param2: javax.vecmath.Tuple4i): void;
			public sub(param0: javax.vecmath.Tuple4i, param1: javax.vecmath.Tuple4i): void;
			public negate(): void;
			public toString(): string;
			public clampMin(param0: number, param1: javax.vecmath.Tuple4i): void;
			public sub(param0: javax.vecmath.Tuple4i): void;
			public scaleAdd(param0: number, param1: javax.vecmath.Tuple4i, param2: javax.vecmath.Tuple4i): void;
			public hashCode(): number;
		}
	}
}

declare module javax {
	export module vecmath {
		export class VecMathUtil {
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4d.d.ts" />
/// <reference path="./javax.vecmath.AxisAngle4f.d.ts" />
/// <reference path="./javax.vecmath.GMatrix.d.ts" />
/// <reference path="./javax.vecmath.GVector.d.ts" />
/// <reference path="./javax.vecmath.Matrix3d.d.ts" />
/// <reference path="./javax.vecmath.Matrix3f.d.ts" />
/// <reference path="./javax.vecmath.Matrix4d.d.ts" />
/// <reference path="./javax.vecmath.Matrix4f.d.ts" />
/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
declare module javax {
	export module vecmath {
		export class VecmathTest {
			public static NL: string;
			public static epsilon: number;
			public static equals(param0: javax.vecmath.AxisAngle4f, param1: javax.vecmath.AxisAngle4f): boolean;
			public static equals(param0: javax.vecmath.Matrix3f, param1: javax.vecmath.Matrix3f): boolean;
			public static equals(param0: javax.vecmath.Tuple4d, param1: javax.vecmath.Tuple4d): boolean;
			public static equals(param0: javax.vecmath.Tuple4f, param1: javax.vecmath.Tuple4f): boolean;
			public static equals(param0: number, param1: number): boolean;
			public static equals(param0: javax.vecmath.Tuple3d, param1: javax.vecmath.Tuple3d): boolean;
			public static GMatrixTest(): void;
			public static equals(param0: javax.vecmath.GVector, param1: javax.vecmath.GVector): boolean;
			public static SVDTest(): void;
			public static Matrix4dTest(): void;
			public static equals(param0: javax.vecmath.Matrix4f, param1: javax.vecmath.Matrix4f): boolean;
			public static equals(param0: javax.vecmath.Tuple3f, param1: javax.vecmath.Tuple3f): boolean;
			public static Vector3dTest(): void;
			public static ASSERT(param0: boolean): void;
			public static equals(param0: javax.vecmath.Matrix4d, param1: javax.vecmath.Matrix4d): boolean;
			public static equals(param0: javax.vecmath.AxisAngle4d, param1: javax.vecmath.AxisAngle4d): boolean;
			public static Matrix4fTest(): void;
			public constructor();
			public static ASSERT(param0: boolean, param1: string): void;
			public static Matrix3dTest(): void;
			public static main(param0: native.Array<string>): void;
			public static Matrix3fTest(): void;
			public static equals(param0: javax.vecmath.GMatrix, param1: javax.vecmath.GMatrix): boolean;
			public static exit(): void;
			public static Vector3fTest(): void;
			public static equals(param0: javax.vecmath.Matrix3d, param1: javax.vecmath.Matrix3d): boolean;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
/// <reference path="./javax.vecmath.Vector2f.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector2d extends javax.vecmath.Tuple2d {
			public constructor(param0: javax.vecmath.Vector2d);
			public length(): number;
			public lengthSquared(): number;
			public normalize(): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple2f);
			public constructor(param0: javax.vecmath.Tuple2d);
			public constructor(param0: javax.vecmath.Vector2f);
			public normalize(param0: javax.vecmath.Vector2d): void;
			public angle(param0: javax.vecmath.Vector2d): number;
			public dot(param0: javax.vecmath.Vector2d): number;
			public constructor(param0: number, param1: number);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple2d.d.ts" />
/// <reference path="./javax.vecmath.Tuple2f.d.ts" />
/// <reference path="./javax.vecmath.Vector2d.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector2f extends javax.vecmath.Tuple2f {
			public constructor(param0: javax.vecmath.Vector2d);
			public length(): number;
			public lengthSquared(): number;
			public normalize(): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: javax.vecmath.Tuple2f);
			public constructor(param0: javax.vecmath.Tuple2d);
			public constructor(param0: javax.vecmath.Vector2f);
			public normalize(param0: javax.vecmath.Vector2f): void;
			public dot(param0: javax.vecmath.Vector2f): number;
			public angle(param0: javax.vecmath.Vector2f): number;
			public constructor(param0: number, param1: number);
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Vector3f.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector3d extends javax.vecmath.Tuple3d {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: javax.vecmath.Vector3f);
			public constructor(param0: javax.vecmath.Vector3d);
			public dot(param0: javax.vecmath.Vector3d): number;
			public angle(param0: javax.vecmath.Vector3d): number;
			public lengthSquared(): number;
			public length(): number;
			public constructor(param0: javax.vecmath.Tuple3d);
			public normalize(): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public cross(param0: javax.vecmath.Vector3d, param1: javax.vecmath.Vector3d): void;
			public normalize(param0: javax.vecmath.Vector3d): void;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Vector3d.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector3f extends javax.vecmath.Tuple3f {
			public constructor(param0: number, param1: number, param2: number);
			public constructor(param0: javax.vecmath.Vector3f);
			public constructor(param0: javax.vecmath.Vector3d);
			public lengthSquared(): number;
			public length(): number;
			public dot(param0: javax.vecmath.Vector3f): number;
			public normalize(param0: javax.vecmath.Vector3f): void;
			public constructor(param0: javax.vecmath.Tuple3d);
			public normalize(): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public cross(param0: javax.vecmath.Vector3f, param1: javax.vecmath.Vector3f): void;
			public angle(param0: javax.vecmath.Vector3f): number;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
/// <reference path="./javax.vecmath.Vector4f.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector4d extends javax.vecmath.Tuple4d {
			public constructor(param0: javax.vecmath.Vector4f);
			public constructor(param0: javax.vecmath.Vector4d);
			public set(param0: javax.vecmath.Tuple3d): void;
			public lengthSquared(): number;
			public length(): number;
			public constructor(param0: javax.vecmath.Tuple3d);
			public normalize(): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public normalize(param0: javax.vecmath.Vector4d): void;
			public constructor(param0: native.Array<number>);
			public constructor();
			public angle(param0: javax.vecmath.Vector4d): number;
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public constructor(param0: javax.vecmath.Tuple4d);
			public dot(param0: javax.vecmath.Vector4d): number;
			public set(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Tuple4f): void;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

/// <reference path="./javax.vecmath.Tuple3f.d.ts" />
/// <reference path="./javax.vecmath.Tuple4d.d.ts" />
/// <reference path="./javax.vecmath.Tuple4f.d.ts" />
/// <reference path="./javax.vecmath.Vector4d.d.ts" />
declare module javax {
	export module vecmath {
		export class Vector4f extends javax.vecmath.Tuple4f {
			public constructor(param0: javax.vecmath.Vector4f);
			public constructor(param0: javax.vecmath.Vector4d);
			public lengthSquared(): number;
			public length(): number;
			public angle(param0: javax.vecmath.Vector4f): number;
			public dot(param0: javax.vecmath.Vector4f): number;
			public normalize(): void;
			public constructor(param0: javax.vecmath.Tuple4f);
			public set(param0: number, param1: number, param2: number, param3: number): void;
			public normalize(param0: javax.vecmath.Vector4d): void;
			public constructor(param0: javax.vecmath.Tuple3f);
			public constructor(param0: native.Array<number>);
			public constructor();
			public constructor(param0: number, param1: number, param2: number, param3: number);
			public constructor(param0: javax.vecmath.Tuple4d);
			public set(param0: native.Array<number>): void;
			public set(param0: javax.vecmath.Tuple4f): void;
			public set(param0: javax.vecmath.Tuple3f): void;
			public set(param0: javax.vecmath.Tuple4d): void;
		}
	}
}

