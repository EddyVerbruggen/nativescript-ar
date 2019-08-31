/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module google {
		export module ar {
			export module sceneform {
				export module assets {
					export class Converter {
						public static class: java.lang.Class<com.google.ar.sceneform.assets.Converter>;
					}
					export module Converter {
						export class a {
							public static class: java.lang.Class<com.google.ar.sceneform.assets.Converter.a>;
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
				export module assets {
					export class RenderableSource extends java.util.concurrent.Callable<java.io.InputStream> {
						public static class: java.lang.Class<com.google.ar.sceneform.assets.RenderableSource>;
						public call(): java.io.InputStream;
						public static builder(): com.google.ar.sceneform.assets.RenderableSource.Builder;
					}
					export module RenderableSource {
						export class Builder {
							public static class: java.lang.Class<com.google.ar.sceneform.assets.RenderableSource.Builder>;
							public constructor();
							public setSource(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri, param2: com.google.ar.sceneform.assets.RenderableSource.SourceType): com.google.ar.sceneform.assets.RenderableSource.Builder;
							public build(): com.google.ar.sceneform.assets.RenderableSource;
							public setScale(param0: number): com.google.ar.sceneform.assets.RenderableSource.Builder;
							public setRecenterMode(param0: com.google.ar.sceneform.assets.RenderableSource.RecenterMode): com.google.ar.sceneform.assets.RenderableSource.Builder;
						}
						export class RecenterMode {
							public static class: java.lang.Class<com.google.ar.sceneform.assets.RenderableSource.RecenterMode>;
							public static NONE: com.google.ar.sceneform.assets.RenderableSource.RecenterMode;
							public static CENTER: com.google.ar.sceneform.assets.RenderableSource.RecenterMode;
							public static ROOT: com.google.ar.sceneform.assets.RenderableSource.RecenterMode;
							public static values(): native.Array<com.google.ar.sceneform.assets.RenderableSource.RecenterMode>;
							public static valueOf(param0: string): com.google.ar.sceneform.assets.RenderableSource.RecenterMode;
						}
						export class SourceType {
							public static class: java.lang.Class<com.google.ar.sceneform.assets.RenderableSource.SourceType>;
							public static GLTF2: com.google.ar.sceneform.assets.RenderableSource.SourceType;
							public static GLB: com.google.ar.sceneform.assets.RenderableSource.SourceType;
							public static values(): native.Array<com.google.ar.sceneform.assets.RenderableSource.SourceType>;
							public static valueOf(param0: string): com.google.ar.sceneform.assets.RenderableSource.SourceType;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class a {
				public static class: java.lang.Class<com.google.sceneform_assets.a>;
				public static a(param0: boolean, param1: any): void;
				public static a(param0: number, param1: number, param2: string): number;
				public static b(param0: number, param1: number, param2: string): number;
				public static b(param0: number, param1: number): number;
				public static a(param0: any, param1: any): boolean;
				public static a(param0: any): any;
				public static a(param0: number, param1: number): number;
				public static a(param0: number, param1: number, param2: number): void;
				public static a(param0: string, param1: native.Array<any>): string;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class aa extends java.lang.Object {
				public static class: java.lang.Class<com.google.sceneform_assets.aa>;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class ab {
				public static class: java.lang.Class<com.google.sceneform_assets.ab>;
				public static a(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
			}
			export module ab {
				export class a extends com.google.sceneform_assets.ae {
					public static class: java.lang.Class<com.google.sceneform_assets.ab.a>;
					public a(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class ac extends com.google.sceneform_assets.q {
				public static class: java.lang.Class<com.google.sceneform_assets.ac>;
				public toString(): string;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class ad {
				public static class: java.lang.Class<com.google.sceneform_assets.ad>;
				public a(param0: java.lang.Throwable, param1: boolean): java.util.List<java.lang.Throwable>;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class ae {
				public static class: java.lang.Class<com.google.sceneform_assets.ae>;
				public a(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class af extends com.google.sceneform_assets.ae {
				public static class: java.lang.Class<com.google.sceneform_assets.af>;
				public a(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class ag extends java.lang.ref.WeakReference<java.lang.Throwable> {
				public static class: java.lang.Class<com.google.sceneform_assets.ag>;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public constructor(param0: java.lang.Throwable, param1: java.lang.ref.ReferenceQueue<java.lang.Throwable>);
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class ah extends com.google.sceneform_assets.ae {
				public static class: java.lang.Class<com.google.sceneform_assets.ah>;
				public a(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class b<E>  extends com.google.sceneform_assets.n<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.b<any>>;
				public constructor(param0: number, param1: number);
				public previous(): any;
				public previousIndex(): number;
				public nextIndex(): number;
				public a(param0: number): any;
				public next(): any;
				public hasNext(): boolean;
				public hasPrevious(): boolean;
				public constructor();
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class c {
				public static class: java.lang.Class<com.google.sceneform_assets.c>;
				public static a(param0: java.lang.Throwable, param1: java.lang.Class): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class d<E>  extends java.util.AbstractCollection<any> implements java.io.Serializable  {
				public static class: java.lang.Class<com.google.sceneform_assets.d<any>>;
				public a(): com.google.sceneform_assets.o<any>;
				public add(param0: any): boolean;
				public contains(param0: any): boolean;
				public addAll(param0: java.util.Collection<any>): boolean;
				public removeAll(param0: java.util.Collection<any>): boolean;
				public e(): com.google.sceneform_assets.g<any>;
				public toArray(param0: native.Array<any>): native.Array<any>;
				public clear(): void;
				public retainAll(param0: java.util.Collection<any>): boolean;
				public remove(param0: any): boolean;
				public toArray(): native.Array<any>;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class e {
				public static class: java.lang.Class<com.google.sceneform_assets.e>;
				public static a(param0: java.util.Iterator<any>, param1: java.util.Iterator<any>): boolean;
				public static a(param0: any): com.google.sceneform_assets.o<any>;
				public static a(param0: native.Array<any>, param1: number): native.Array<any>;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class f extends com.google.sceneform_assets.g<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.f>;
				public a(param0: number, param1: number): com.google.sceneform_assets.g<any>;
				public a(): com.google.sceneform_assets.o<any>;
				public static a(param0: any): com.google.sceneform_assets.g<any>;
				public get(param0: number): any;
				public size(): number;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class g<E>  extends com.google.sceneform_assets.d<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.g<any>>;
				public indexOf(param0: any): number;
				public contains(param0: any): boolean;
				public addAll(param0: java.util.Collection<any>): boolean;
				public remove(param0: number): any;
				public e(): com.google.sceneform_assets.g<any>;
				public add(param0: number, param1: any): void;
				public a(param0: number, param1: number): com.google.sceneform_assets.g<any>;
				public set(param0: number, param1: any): any;
				public static f(): com.google.sceneform_assets.g<any>;
				public a(): com.google.sceneform_assets.o<any>;
				public add(param0: any): boolean;
				public static a(param0: any): com.google.sceneform_assets.g<any>;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public addAll(param0: number, param1: java.util.Collection<any>): boolean;
				public lastIndexOf(param0: any): number;
				public remove(param0: any): boolean;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class h extends com.google.sceneform_assets.o<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.h>;
				public next(): any;
				public hasNext(): boolean;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class i<E>  extends com.google.sceneform_assets.d<any> implements java.util.Set<any>  {
				public static class: java.lang.Class<com.google.sceneform_assets.i<any>>;
				public a(): com.google.sceneform_assets.o<any>;
				public static a(param0: native.Array<any>): com.google.sceneform_assets.i<any>;
				public hashCode(): number;
				public e(): com.google.sceneform_assets.g<any>;
				public equals(param0: any): boolean;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class j<E>  extends com.google.sceneform_assets.i<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.j<any>>;
				public a(): com.google.sceneform_assets.o<any>;
				public static a(param0: native.Array<any>): com.google.sceneform_assets.i<any>;
				public contains(param0: any): boolean;
				public hashCode(): number;
				public size(): number;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class k<E>  extends com.google.sceneform_assets.g<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.k<any>>;
				public get(param0: number): any;
				public size(): number;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class l<T>  extends java.lang.Object {
				public static class: java.lang.Class<com.google.sceneform_assets.l<any>>;
				public constructor();
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class m<E>  extends com.google.sceneform_assets.i<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.m<any>>;
				public a(): com.google.sceneform_assets.o<any>;
				public static a(param0: native.Array<any>): com.google.sceneform_assets.i<any>;
				public contains(param0: any): boolean;
				public hashCode(): number;
				public toString(): string;
				public size(): number;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class n<E>  extends com.google.sceneform_assets.o<any> implements java.util.ListIterator<any>  {
				public static class: java.lang.Class<com.google.sceneform_assets.n<any>>;
				public set(param0: any): void;
				public add(param0: any): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class o<E>  extends java.util.Iterator<any> {
				public static class: java.lang.Class<com.google.sceneform_assets.o<any>>;
				public remove(): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class p {
				public static class: java.lang.Class<com.google.sceneform_assets.p>;
				public static a(param0: java.io.InputStream, param1: java.io.OutputStream): number;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export abstract class q {
				public static class: java.lang.Class<com.google.sceneform_assets.q>;
				public a(param0: java.io.InputStream): number;
				public constructor();
				public a(): java.io.OutputStream;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class r {
				public static class: java.lang.Class<com.google.sceneform_assets.r>;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class s {
				public static class: java.lang.Class<com.google.sceneform_assets.s>;
				public write(param0: native.Array<number>, param1: number, param2: number): void;
				public write(param0: number): void;
				public write(param0: native.Array<number>): void;
				public toString(): string;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class t extends com.google.sceneform_assets.v {
				public static class: java.lang.Class<com.google.sceneform_assets.t>;
				public a(param0: java.io.Closeable, param1: java.lang.Throwable, param2: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class u {
				public static class: java.lang.Class<com.google.sceneform_assets.u>;
				public close(): void;
				public static a(): com.google.sceneform_assets.u;
				public a(param0: java.io.Closeable): java.io.Closeable;
				public a(param0: java.lang.Throwable): java.lang.RuntimeException;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class v {
				public static class: java.lang.Class<com.google.sceneform_assets.v>;
				/**
				 * Constructs a new instance of the com.google.sceneform_assets.v interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					a(param0: java.io.Closeable, param1: java.lang.Throwable, param2: java.lang.Throwable): void;
				});
				public constructor();
				public a(param0: java.io.Closeable, param1: java.lang.Throwable, param2: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class w extends com.google.sceneform_assets.v {
				public static class: java.lang.Class<com.google.sceneform_assets.w>;
				public a(param0: java.io.Closeable, param1: java.lang.Throwable, param2: java.lang.Throwable): void;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class x {
				public static class: java.lang.Class<com.google.sceneform_assets.x>;
				public static a(): java.io.File;
				public static a(param0: java.io.File, param1: native.Array<com.google.sceneform_assets.y>): com.google.sceneform_assets.q;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class y {
				public static class: java.lang.Class<com.google.sceneform_assets.y>;
				public static a: com.google.sceneform_assets.y;
			}
		}
	}
}

declare module com {
	export module google {
		export module sceneform_assets {
			export class z extends com.google.sceneform_assets.l<java.io.File> {
				public static class: java.lang.Class<com.google.sceneform_assets.z>;
				public toString(): string;
			}
		}
	}
}

//Generics information:
//com.google.sceneform_assets.b:1
//com.google.sceneform_assets.d:1
//com.google.sceneform_assets.g:1
//com.google.sceneform_assets.i:1
//com.google.sceneform_assets.j:1
//com.google.sceneform_assets.k:1
//com.google.sceneform_assets.l:1
//com.google.sceneform_assets.m:1
//com.google.sceneform_assets.n:1
//com.google.sceneform_assets.o:1

