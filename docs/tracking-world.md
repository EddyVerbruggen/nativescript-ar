World Tracking
==============

[🔙](../README.md)

## Demo app
Check out the [Solar System demo app](../demo-solarsystem).

## Declaring the `<AR>` view
I'm going to assume you're working on a vanilla NativeScript app with XML,
but if you're using Angular or Vue you'll have to register the `AR` element as explained in the respective docs.

So for XML, add the `AR` namespace to the view, then add use it like any other UI component:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <GridLayout rows="*" columns="*">
    <AR:AR
        debugLevel="FEATURE_POINTS"
        showStatistics="true"
        planeDetection="HORIZONTAL"
        arLoaded="{{ arLoaded }}"
        planeTapped="{{ planeTapped }}" />
  </GridLayout>
</Page>
```

Open its component and, for instance, add:

```typescript
import { AR, ARLoadedEventData, ARPlaneTappedEventData } from "nativescript-ar";
import { isIOS } from "tns-core-modules/platform";

export class HelloWorldModel extends Observable {

  public arLoaded(args: ARLoadedEventData): void {
    const ar: AR = args.object;
    // interact with the 'ar' object here if you like.. for an example see "planeTapped" below
  }

  public planeTapped(args: ARPlaneTappedEventData): void {
    console.log(`Plane tapped at ${args.position.x} y ${args.position.y} z ${args.position.z}`);

    const ar: AR = args.object;
    // interact with the 'ar' object here if you like, for instance add a sphere:

    const sphereRadius = 0.15;
    const materialPrefix = isIOS ? "Assets.scnassets/Materials/tnsgranite/" : "";

    ar.addSphere({
      position: {
        x: args.position.x,
        y: args.position.y + sphereRadius,
        z: args.position.z
      },
      radius: sphereRadius,
      materials: [{
        diffuse: {
          contents: materialPrefix + "tnsgranite-diffuse.png",
          wrapMode: "ClampToBorder"
        }
      }],
      onLongPress: model => model.remove()
    }).then(arNode => {
      console.log("Sphere successfully added");
      if (arNode.ios) {
        // do something iOS specific here if you like
      }
    });
  }
}
```

## Continue reading
- [Learn about all AR view tag properties](./tag-properties.md)
- [Learn about using the AR API](./api.md)
