/// <reference path="./_helpers.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
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

import comgooglearcoreSession = com.google.ar.core.Session;
import androidcontentContext = android.content.Context;
import javaxmicroeditionkhronosopenglesGL10 = javax.microedition.khronos.opengles.GL10;
import javaxmicroeditionkhronoseglEGLConfig = javax.microedition.khronos.egl.EGLConfig;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.ar.core.Session.d.ts" />
/// <reference path="./javax.microedition.khronos.egl.EGLConfig.d.ts" />
/// <reference path="./javax.microedition.khronos.opengles.GL10.d.ts" />
/// <reference path="./org.nativescript.tns.arlib.TNSSurfaceRendererListener.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export class TNSSurfaceRenderer {
					public onDrawFrame(param0: javaxmicroeditionkhronosopenglesGL10): void;
					public onSurfaceChanged(param0: javaxmicroeditionkhronosopenglesGL10, param1: number, param2: number): void;
					public static setSurfaceEventCallbackListener(param0: org.nativescript.tns.arlib.TNSSurfaceRendererListener): void;
					public constructor();
					public setContext(param0: androidcontentContext): void;
					public setSession(param0: comgooglearcoreSession): void;
					public onSurfaceCreated(param0: javaxmicroeditionkhronosopenglesGL10, param1: javaxmicroeditionkhronoseglEGLConfig): void;
				}
			}
		}
	}
}

import javalangObject = java.lang.Object;
/// <reference path="./java.lang.Object.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export class TNSSurfaceRendererListener {
					/**
					 * Constructs a new instance of the org.nativescript.tns.arlib.TNSSurfaceRendererListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						callback(param0: javalangObject): void;
					});
					public callback(param0: javalangObject): void;
				}
			}
		}
	}
}

import comgooglearcoreFrame = com.google.ar.core.Frame;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.ar.core.Frame.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export module rendering {
					export class BackgroundRenderer {
						public static QUAD_COORDS: native.Array<number>;
						public static QUAD_TEXCOORDS: native.Array<number>;
						public constructor();
						public getTextureId(): number;
						public createOnGlThread(param0: androidcontentContext): void;
						public draw(param0: comgooglearcoreFrame): void;
					}
				}
			}
		}
	}
}

import javautilCollection = java.util.Collection;
import comgooglearcorePose = com.google.ar.core.Pose;
import comgooglearcorePlane = com.google.ar.core.Plane;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.ar.core.Plane.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Collection.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export module rendering {
					export class PlaneRenderer {
						public constructor();
						public createOnGlThread(param0: androidcontentContext, param1: string): void;
						public drawPlanes(param0: javautilCollection, param1: comgooglearcorePose, param2: native.Array<number>): void;
					}
					export module PlaneRenderer {
						export class SortablePlane {
							public constructor(param0: number, param1: comgooglearcorePlane);
						}
					}
				}
			}
		}
	}
}

import comgooglearcorePointCloud = com.google.ar.core.PointCloud;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.google.ar.core.PointCloud.d.ts" />
/// <reference path="./com.google.ar.core.Pose.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export module rendering {
					export class PointCloudRenderer {
						public constructor();
						public update(param0: comgooglearcorePointCloud): void;
						public createOnGlThread(param0: androidcontentContext): void;
						public draw(param0: comgooglearcorePose, param1: native.Array<number>, param2: native.Array<number>): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module org {
	export module nativescript {
		export module tns {
			export module arlib {
				export module rendering {
					export class ShaderUtil {
						public constructor();
						public static loadGLShader(param0: string, param1: androidcontentContext, param2: number, param3: number): number;
						public static checkGLError(param0: string, param1: string): void;
					}
				}
			}
		}
	}
}

