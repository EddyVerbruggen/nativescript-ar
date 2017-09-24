import { Observable } from 'tns-core-modules/data/observable';
import { AR } from 'nativescript-ar';

export class HelloWorldModel extends Observable {
  public message: string;
  private ar: AR;

  constructor() {
    super();

    const supported = AR.isSupported();
    this.message = `Supported? ${supported}`;

    if (!supported) {
      return;
    }

    this.ar = new AR();
  }
}
