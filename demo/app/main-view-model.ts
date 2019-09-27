import { AR, ARMaterial } from "nativescript-ar";
import { Color } from "tns-core-modules/color";
import { Observable } from "tns-core-modules/data/observable";
import { Image } from "tns-core-modules/ui/image";

export class HelloWorldModel extends Observable {
  public message: string;
  public ar: AR;
  public screenshot: Image;

  // All these are valid plane materials:
  // public planeMaterial = "Assets.scnassets/Materials/tron/tron-diffuse.png";
  // public planeMaterial = new Color("red");
  public planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.25
  };

  constructor() {
    super();

    const supported = AR.isSupported();
    this.message = `AR supported? ${supported}`;

    console.log(`Image tracking supported? ${AR.isImageTrackingSupported()}`);
  }

  public async grabScreenshot(): Promise<void> {
    if (!this.ar) {
      return;
    }

    this.screenshot.src = await this.ar.grabScreenshot();

    // let's animate the grabbed image on and off screen in an iOS-screenshot style fashion
    this.screenshot.animate({
      opacity: 0.8,
      scale: {
        x: 0.5,
        y: 0.5
      },
      translate: {
        x: -20,
        y: 40
      },
      duration: 500
    });

    setTimeout(() => {
      this.screenshot.animate({
        opacity: 0,
        scale: {
          x: 0.5,
          y: 0.5
        },
        translate: {
          x: -300,
          y: 40
        },
        duration: 500
      });

      setTimeout(() => {
        this.screenshot.animate({
          opacity: 0,
          scale: {
            x: 1,
            y: 1
          },
          translate: {
            x: 0,
            y: 0
          },
          duration: 0
        });
      }, 600);

    }, 2000);
  }

  public recordVideo(): void {
    if (!this.ar) {
      return;
    }

    this.ar.startRecordingVideo()
        .then(() => {
          console.log("Started recording video");

          // stop recording after 2 seconds
          setTimeout(() => {
            this.ar.stopRecordingVideo().then(videoUrl => {
              console.log("Recording result: " + videoUrl);
            });
          }, 2000);
        })
        .catch(err => console.log(err));
  }
}
