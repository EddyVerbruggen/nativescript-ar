nativescript-ar with XML
========================

[🔙](../README.md)

## Demo app
Check out [the embedded demo app](../demo).

## Declaring the `<AR>` view
Add the `AR` namespace to the view you want AR-ify, then add use it like any other UI component:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <GridLayout rows="auto, *" columns="*" class="p-20">
    <Label text="AR FTW!" class="t-20 text-center" textWrap="true"/>
    <AR:AR
        row="1"
        debugLevel="FEATURE_POINTS"
        planeOpacity="0.2"
        planeTapped="planeTapped" />
  </GridLayout>
</Page>
```

Now open `your-page.ts` and add:

```typescript
import { AR, ARPlaneTappedEventData } from 'nativescript-ar';

let ar: AR;

export function arLoaded(args): void {
  ar = args.object;
}

export function planeTapped(args: ARPlaneTappedEventData): void {
  console.log("Plane tapped @ x coordinate: " + args.position.x);
  ar.addBox({
    position: {
      x: args.position.x,
      y: args.position.y + 1, // drop the box from a meter high
      z: args.position.z
    },
    scale: 0.15,
    material: "tnsgranite", // this needs to be part of your app's assets, see the demo app
    mass: 0.0000001, // very light - makes it bounce a bit when dropped
    onTap: node => console.log("box tapped: " + node.id)
  }).then(node => console.log("box added: " + node.id));
}
```

## Continue reading
- [Tell me about those <AR> tag properties](tag-properties.md)
