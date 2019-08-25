import { ARAddVideoOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

import * as application from 'tns-core-modules/application';

let pixelsPerMeter = 500;

export class ARVideo extends ARCommonNode {

    static create(options: ARAddVideoOptions): ARVideo {



        const video = options.video;

        if (!options.dimensions) {
            options.dimensions = {
                x: .32,
                y: .18
            }
        }


        //const size=tvVideoNode.size;

        const dimensions = options.dimensions;
        const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);

        let nativeUrl;
        let videoPlayer;


        if (typeof video == "string") {

            if (video.indexOf("://") >= 0) {
                nativeUrl = NSURL.URLWithString(video);
            }


            if(!nativeUrl){
                try {
                    let parts = video.split('/');
                    let name = parts.pop();
                    let dir = parts.join('/');

                    let nameParts = name.split('.');
                    let ext = nameParts.pop();
                    name = nameParts.join('.');



                    nativeUrl = NSBundle.mainBundle.URLForResourceWithExtensionSubdirectory(name, ext, dir);

                } catch (e) {
                    //console.error(e);
                }
            }


            if(!nativeUrl){
                try {
                    nativeUrl = NSURL.fileURLWithPath(video);
                } catch (e) {
                    //console.error(e);
                }
            }


            if(!nativeUrl){
                throw 'Unable to resolve file/url';
            }

            videoPlayer = AVPlayer.playerWithURL(nativeUrl);
          
        } else {




            if(video instanceof AVPlayer){
                videoPlayer = video
            }else if(video.ios&&video.ios instanceof AVPlayer){
                videoPlayer = video.ios;
            }


        }

        materialPlane.firstMaterial.diffuse.contents = videoPlayer;
        materialPlane.firstMaterial.doubleSided = true;

        if (options.loop!==false) {
            const AVPlayerItemDidPlayToEndTimeNotificationObserver = application.ios.addNotificationObserver(
                AVPlayerItemDidPlayToEndTimeNotification,
                (notification: NSNotification) => {
                    // const player = this.plane.firstMaterial.diffuse.contents;
                    if (videoPlayer.currentItem && videoPlayer.currentItem === notification.object) {
                        videoPlayer.seekToTime(CMTimeMake(5, 100));
                        videoPlayer.play();
                    }
                }
            );
        }
        if(options.play!==false){
            videoPlayer.play();
        }

  
        return new ARVideo(options, SCNNode.nodeWithGeometry(materialPlane));


    }
}
