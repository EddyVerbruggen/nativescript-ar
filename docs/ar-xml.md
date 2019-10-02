nativescript-ar with XML
========================

[🔙](../README.md)

## Demo app
Check out the [demo app](../demo).

## Declaring the `<AR>` view
Add the `AR` namespace to the view you want AR-ify, then add use it like any other UI component:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <GridLayout rows="auto, *" columns="*" class="p-20">
    <Label text="AR FTW!" class="t-20 text-center" textWrap="true"/>
    <AR:AR
        row="1"
        debugLevel="FEATURE_POINTS"
        detectPlanes="true"
        showStatistics="true"
        planeOpacity="0.2"
        arLoaded="arLoaded"
        planeTapped="planeTapped" />
  </GridLayout>
</Page>
```

Now open `your-page.ts` and add:

```typescript
import { AR, ARLoadedEventData, ARNodeInteraction, ARPlaneTappedEventData } from 'nativescript-ar';

export function arLoaded(args: ARLoadedEventData): void {
  const ar: AR = args.object;
  // interact with the 'ar' object here if you like
}

export function planeTapped(args: ARPlaneTappedEventData): void {
  console.log("Plane tapped @ x coordinate: " + args.position.x);
  args.object.addBox({
    position: {
      x: args.position.x,
      y: args.position.y + 1, // drop the box from a meter high
      z: args.position.z
    },
    scale: 0.15,
    material: "tnsgranite", // this needs to be part of your app's assets, see the demo app
    mass: 0.0000001, // very light - makes it bounce a bit when dropped
    onTap: (interaction: ARNodeInteraction) => {
      console.log("box tapped: " + interaction.node.id + " at " + interaction.touchPosition);
      // let's rotate the box 5 degrees to the right
      interaction.node.rotateBy({
        x: 0,
        y: 0,
        z: -5
      });
    },
    onLongPress: (interaction: ARNodeInteraction) => {
      console.log("box longpressed: " + interaction.node.id + " at " + interaction.touchPosition);
      // let's rotate the box 5 degrees to the left
      interaction.node.rotateBy({
        x: 0,
        y: 0,
        z: 5
      });
      // and move it a little
      interaction.node.moveBy({
        x: 0,
        y: 0,
        z: 0.02
      });
    }
  }).then(node => console.log("box added: " + node.id));
}
```

## Continue reading
- [World tracking](docs/tracking-world.md): augment the world around you
- [Face tracking](docs/tracking-faces.md): augment a face
- [Image tracking](docs/tracking-images.md): augment 2D images your camera finds
