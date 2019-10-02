Face Tracking
=============

[🔙](../README.md)

## Demo app
Check out the [Glasses demo app](../demo-glasses).

## Declaring the `<AR>` view
I'm going to assume you're working on a vanilla NativeScript app with XML,
but if you're using Angular or Vue you'll have to register the `AR` element as explained in the respective docs.

So for XML, add the `AR` namespace to the view, then add use it like any other UI component:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <GridLayout rows="*" columns="*">
    <AR:AR
        trackingMode="FACE"
        trackingFaceDetected="{{ trackingFaceDetected }}"/>
  </GridLayout>
</Page>
```

Open its component and, for instance, add:

```typescript
import { ARTrackingFaceEventData } from "nativescript-ar";
import { isIOS } from "tns-core-modules/platform";

export class HelloWorldModel extends Observable {

  public trackingFaceDetected(args: ARTrackingFaceEventData): void {
    if (args.faceTrackingActions) {
      args.faceTrackingActions.addModel({}) // see the "demo-glasses" folder for an example
          .then(model => console.log("model added to the face"))
          .catch(err => console.log(`Error adding model: ${err}`));
    }

    // on iOS there are a few properties you can read and and act upon, for instance, when the user sticks out their tongue:
    if (args.properties && args.properties.tongueOut > 0.8) { // 0.8 means we're 80% sure the tongue is out
      // do something interesting - see the "demo-glasses" folder for an example
    }
  }
}
```

## The `trackingFaceDetected` event
See the example above. The properties of `ARTrackingFaceEventData` are:

|property|description
|---|---
|`eventType`|One of `FOUND`, `UPDATED`, `LOST`.
|`faceTrackingActions`|This is available when `eventType` is `FOUND`. See below for details.
|`properties`|iOS only. This object has these properties, which represent a probability (0 - 1, where 1 is 100%): `eyeBlinkLeft`, `eyeBlinkRight`, `jawOpen`, `mouthFunnel`, `mouthSmileLeft`, `mouthSmileRight`, `tongueOut`, and `lookAtPoint` which is an `ARPosition` object (with x, y, z properties).


The `faceTrackingActions` object is of type `ARFaceTrackingActions` and has these functions:

|function|description
|---|---
|`addModel`|See [the API docs](./api.md#addmodel).
|`addText`|iOS only. See [the API docs](./api.md#addtext).
|`addUIView`|See [the API docs](./api.md#adduiview).

## Continue reading
- [Learn about all AR view tag properties](./tag-properties.md)
- [Learn about using the AR API](./api.md)
