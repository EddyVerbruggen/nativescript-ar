import { Observable } from 'tns-core-modules/data/observable';
import { AR, ARMaterial } from 'nativescript-ar';
import { Color } from "tns-core-modules/color";

export class HelloWorldModel extends Observable {
  public message: string;

  // All these are valid plane materials:
  // public planeMaterial = "Assets.scnassets/Materials/tron/tron-diffuse.png";
  // public planeMaterial = new Color("red");
  public planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.2
  };

  constructor() {
    super();

    const supported = AR.isSupported();
    this.message = `AR supported? ${supported}`;

    if (!supported) {
      return;
    }
  }
}
