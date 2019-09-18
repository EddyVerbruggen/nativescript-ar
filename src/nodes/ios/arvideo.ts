import * as application from 'tns-core-modules/application';
import { ARAddVideoOptions, ARVideoNode } from "../../ar-common";
import { ARCommonNode } from "./arcommon";

export class ARVideo extends ARCommonNode implements ARVideoNode {
  private videoPlayer: AVPlayer;

  isPlaying(): boolean {
    return this.videoPlayer && this.videoPlayer.timeControlStatus === AVPlayerTimeControlStatus.Playing;
  }

  play(): void {
    if (this.videoPlayer) {
      this.videoPlayer.play();
    }
  }

  pause(): void {
    if (this.videoPlayer) {
      this.videoPlayer.pause();
    }
  }

  static create(options: ARAddVideoOptions): ARVideoNode {
    const video = options.video;
    // const size=tvVideoNode.size;

    let dimensions = options.dimensions;

    if (!options.dimensions) {
      dimensions = {
        x: .96,
        y: .56
      };
    }

    const materialPlane = SCNPlane.planeWithWidthHeight(dimensions.x, dimensions.y);

    let nativeUrl;
    let videoPlayer;

    // TODO use this for remote videos on imagetracking as well
    if (typeof video === "string") {

      if (video.indexOf("://") >= 0) {
        nativeUrl = NSURL.URLWithString(video);
      }

      if (!nativeUrl) {
        try {
          let parts = video.split('/');
          let name = parts.pop();
          let dir = parts.join('/');

          let nameParts = name.split('.');
          let ext = nameParts.pop();
          name = nameParts.join('.');
          nativeUrl = NSBundle.mainBundle.URLForResourceWithExtensionSubdirectory(name, ext, dir);
        } catch (e) {
          console.error(e);
        }
      }

      if (!nativeUrl) {
        try {
          nativeUrl = NSURL.fileURLWithPath(video);
        } catch (e) {
          console.error(e);
        }
      }

      if (!nativeUrl) {
        throw "Unable to resolve file/url: " + nativeUrl;
      }

      videoPlayer = AVPlayer.playerWithURL(nativeUrl);

    } else {

      if (video instanceof AVPlayer) {
        videoPlayer = video;
      } else if (video.ios && video.ios instanceof AVPlayer) {
        videoPlayer = video.ios;
      }
    }

    materialPlane.firstMaterial.diffuse.contents = videoPlayer;
    materialPlane.firstMaterial.doubleSided = true;

    if (options.loop !== false) {
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
    if (options.play !== false) {
      videoPlayer.play();
    }

    const node = SCNNode.nodeWithGeometry(materialPlane);
    // node.addAudioPlayer(SCNAudioPlayer);

    const arVideo = new ARVideo(options, node);
    arVideo.videoPlayer = videoPlayer;
    return arVideo;
  }
}