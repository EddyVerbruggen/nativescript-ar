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

## The `trackingImageDetected` event
See the example above. The properties of `ARTrackingImageDetectedEventData` are:

|property|description
|---|---
|`object`|An `AR` object for you to call any API function upon.
|`position`|An [`ARPosition`](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/src/ar-common.ts#L346-L348) object with `x`, `y`, and `z` properties.
|`size`|An [`ARSize`](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/src/ar-common.ts#L332-L340) object, consisting of `width` and `height` properties.
|`imageName`|The name of the detected image.
|`imageTrackingActions`|See below for details.

The `imageTrackingActions` object is of type [`ARImageTrackingActions`](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/src/ar-common.ts#L294-L308) and has these functions:

|function|description
|---|---
|`addModel`|See [api/addModel](./api.md#addmodel)
|`addBox`|See [api/addBox](./api.md#addbox)
|`addImage`|See [api/addImage](./api.md#addimage)
|`addUIView`|See [api/addUIView](./api.md#adduiview)
|`addNode`|See [api/addNode](./api.md#addnode)
|`playVideo`|Overlays the image with a video. Pass in a URL to a video, and optionally a boolean telling the video to loop: `imageTrackingActions.playVideo("https://mysite.com/myvideo.mov", true)`
|`stopVideoLoop`|Stops the video

## Continue reading
- [Learn about all AR view tag properties](./tag-properties.md)
- [Learn about using the AR API](./api.md)
