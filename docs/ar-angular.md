nativescript-ar with Angular
============================

[🔙](../README.md)

## Demo app
This plugin is part of the [plugin showcase app](https://github.com/EddyVerbruggen/nativescript-pluginshowcase/tree/master/app/ar) I built using Angular.

## Declaring the `<AR>` view
Browse to the module where you want to show off some AR goodness and add:

```typescript
import { registerElement } from "nativescript-angular/element-registry";
registerElement("AR", () => require("nativescript-ar").AR);
```

Open a view that's in the same module (or you've added it to the global app module) and add:

```html
<GridLayout rows="auto, *" class="page">
  <Label row="0" text="Scan a surface.." class="p-20" horizontalAlignment="center"></Label>
  <AR
    row="1"
    debugLevel="FEATURE_POINTS"
    detectPlanes="true"
    showStatistics="true"
    [planeMaterial]="planeMaterial"
    (planeTapped)="planeTapped($event)">
    <!-- you can add layouts here if you like to overlay the AR view -->
  </AR>
</GridLayout>
```

Open its component and, for instance, add:

```typescript
// add to imports
import { AR, ARMaterial,ARPlaneTappedEventData } from "nativescript-ar";
import { Color } from "tns-core-modules/color";

export class MyComponent {
  // All these are valid plane materials:
  // public planeMaterial = "Assets.scnassets/Materials/tron/tron-diffuse.png";
  // public planeMaterial = new Color("red");
  public planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.2
  };

  constructor() {
    console.log("AR supported? " + AR.isSupported());
  }

  planeTapped(args: ARPlaneTappedEventData): void {
    console.log(`Plane tapped at ${args.position.x} y ${args.position.y} z ${args.position.z}`);
    const ar: AR = args.object;
    // interact with the 'ar' object here if you like
  }
}
```

## Continue reading
- [Tell me about those <AR> tag properties](tag-properties.md)
