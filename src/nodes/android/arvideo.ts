import { ARAddVideoOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ImageSource, fromFileOrResource, fromUrl } from "tns-core-modules/image-source";
import { File } from "tns-core-modules/file-system";
import * as utils from "tns-core-modules/utils/utils";

let pixelsPerMeter=500;

export class ARVideo extends ARCommonNode {



	static create(options: ARAddVideoOptions, fragment): Promise<ARVideo> {

		return new Promise<ARVideo>(async (resolve, reject) => {
			const node = ARCommonNode.createNode(options, fragment);
			

			//use a child node to provide sizing without interfering with user defined size/scale
			const videoNode = ARCommonNode.createNode(options, fragment);
			videoNode.setParent(node);



			const size = new (<any>com.google.ar.sceneform).math.Vector3(
				options.dimensions instanceof Object ? options.dimensions.x : options.dimensions || 0.96,
				options.dimensions instanceof Object ? options.dimensions.y : options.dimensions || 0.56,
				1);

			videoNode.setLocalScale(size);

			const texture = new com.google.ar.sceneform.rendering.ExternalTexture();
			const mediaPlayer = ARVideo.getPlayer(options);
			mediaPlayer.setSurface(texture.getSurface());
			mediaPlayer.setVideoScalingMode(android.media.MediaPlayer.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING);


			const loop = options.loop !== false;

			if (loop) {
				mediaPlayer.setLooping(true);
			}



			let videoMat;

			ARVideo.model().then(renderable => {

				videoMat = renderable.getMaterial();


				com.google.ar.sceneform.rendering.MaterialFactory.makeOpaqueWithColor(
					utils.ad.getApplicationContext(),
					new com.google.ar.sceneform.rendering.Color(android.graphics.Color.MAGENTA))
					.thenAccept(new (<any>java.util).function.Consumer({
						accept: material => {
							renderable.setMaterial(material);
							videoNode.setRenderable(renderable);
							resolve(new ARVideo(options, node));
						}
					}));

				videoMat.setExternalTexture("videoTexture", texture);
				videoMat.setBoolean("disableChromaKey", true);
				// videoMat.setFloat4("keyColor", new com.google.ar.sceneform.rendering.Color(0.1843, 1.0, 0.098));



				mediaPlayer.setOnPreparedListener(new android.media.MediaPlayer.OnPreparedListener({
					onPrepared: (mp: android.media.MediaPlayer) => {

							const width=mp.getVideoWidth();
							const height=mp.getVideoHeight();


							


							if(!options.dimensions){
								videoNode.setLocalScale(new (<any>com.google.ar.sceneform).math.Vector3(
									width/pixelsPerMeter,
									height/pixelsPerMeter,
								1));
							}

							console.log([height, width]);


							mediaPlayer.start();
							// Wait to set the renderable until the first frame of the  video becomes available.
							// This prevents the renderable from briefly appearing as a black quad before the video
							// plays.
							texture
								.getSurfaceTexture()
								.setOnFrameAvailableListener(
									new android.graphics.SurfaceTexture.OnFrameAvailableListener({
										onFrameAvailable: (surfaceTexture) => {
											console.log('available')

											try {
												renderable.setMaterial(videoMat);
												texture.getSurfaceTexture().setOnFrameAvailableListener(null);
											} catch (e) {
												console.error(e);
											}
										}

									})
								);

					}
				}));
				mediaPlayer.prepareAsync();




			}).catch(console.error)

		});

	}



	static model(): Promise<com.google.ar.sceneform.rendering.ModelRenderable> {
		return new Promise<com.google.ar.sceneform.rendering.ModelRenderable>((resolve, reject) => {
			com.google.ar.sceneform.rendering.ModelRenderable.builder()
				.setSource(utils.ad.getApplicationContext(), android.net.Uri.parse("VideoPlane.sfb")) // eg. "andy.sfb"
				.build()
				.thenAccept(new (<any>java.util).function.Consumer({
					accept: renderable => {
						resolve(renderable);
					}
					// TODO add the exception case
				}));
		});
	}


	static getPlayer(options: ARAddVideoOptions): android.media.MediaPlayer {

		const video = options.video;
		const context = utils.ad.getApplicationContext();
		//const controller = new 	android.widget.MediaController(context);


		if (typeof video == "string") {
			try {

				// console.log('mediaPlayer');
				const mediaPlayer = new android.media.MediaPlayer();

				if (video.indexOf("://") >= 0) {
					mediaPlayer.setDataSource(context, android.net.Uri.parse(video));
				} else {
					mediaPlayer.setDataSource(context.getAssets().openFd(video));
				}

				mediaPlayer.setOnErrorListener(new android.media.MediaPlayer.OnErrorListener({
					onError: (mp: android.media.MediaPlayer, what: number, extra: number) => {
						console.error("MediaPlayer Error " + what + " with " + video);
						([
							[android.media.MediaPlayer.MEDIA_ERROR_IO, "MEDIA_ERROR_IO"],
							[android.media.MediaPlayer.MEDIA_ERROR_MALFORMED, "MEDIA_ERROR_MALFORMED"],
							[android.media.MediaPlayer.MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK, "MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK"],
							[android.media.MediaPlayer.MEDIA_ERROR_SERVER_DIED, "MEDIA_ERROR_SERVER_DIED"],
							[android.media.MediaPlayer.MEDIA_ERROR_TIMED_OUT, "MEDIA_ERROR_TIMED_OUT"],
							[android.media.MediaPlayer.MEDIA_ERROR_UNKNOWN, "MEDIA_ERROR_UNKNOWN"],
							[android.media.MediaPlayer.MEDIA_ERROR_UNSUPPORTED, "MEDIA_ERROR_UNSUPPORTED"]



						]).forEach(function(code) {
							if (what == code[0]) {
								console.log(code[1]);
							}
							if (extra == code[0]) {
								console.log(code[1]);
							}

						})
						return true;
					}
				}));

				return mediaPlayer;

			} catch (e) {
				console.error(video);
				console.error(e);
			}

		}
		console.log('throw');
		throw 'Error';



	}



} 