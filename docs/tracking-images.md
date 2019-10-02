Image Tracking
==============

[🔙](../README.md)

## Demo app
Check out the [Pokémon demo app](../demo-pokemon).

## Declaring the `<AR>` view
I'm going to assume you're working on a vanilla NativeScript app with XML,
but if you're using Angular or Vue you'll have to register the `AR` element as explained in the respective docs.

So for XML, add the `AR` namespace to the view, then add use it like any other UI component:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <GridLayout rows="*" columns="*">
    <AR:AR
        trackingMode="IMAGE"
        trackingImagesBundle="PokemonResources"
        trackingImageDetected="{{ trackingImageDetected }}"/>
  </GridLayout>
</Page>
```

Open its component and, for instance, add:

```typescript
import { ARTrackingImageDetectedEventData } from "nativescript-ar";
import { isIOS } from "tns-core-modules/platform";

export class HelloWorldModel extends Observable {

  public trackingImageDetected(args: ARTrackingImageDetectedEventData): void {
    console.log("Tracked image detected: " + args.imageName);

    // match the name the plugin returned to what you expect (the names in your images bundle)
    if (args.imageName === "my-image-name") {
      // for instancce, "replace" the image by a video
      const loop = true;
      args.imageTrackingActions.playVideo("http://techslides.com/demos/samples/sample.mov", loop);

    } else if (args.imageName === "my-other-image") {
      // etc
    }
  }
}
```

## Continue reading
- [Learn about all AR view tag properties](./tag-properties.md)
- [Learn about using the AR API](./api.md)
