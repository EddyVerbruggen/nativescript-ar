NativeScript Augmented Reality
==============================

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/EddyVerbruggen/nativescript-ar.svg?branch=master
[build-url]:https://travis-ci.org/EddyVerbruggen/nativescript-ar
[npm-image]:http://img.shields.io/npm/v/nativescript-ar.svg
[npm-url]:https://npmjs.org/package/nativescript-ar
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

> Work in progress. Implementation-details may change.

> You'll need to install Xcode 9 to run AR on iOS.

> Android support will be added, but there's currently hardly anyone on the planet with an Android device capable of running AR anyway.

### Supported platforms
* iPhone SE, 6s, iPad Pro, iPad 2017, or newer. Running iOS 11 or newer.
* In the future: Google Pixel (1 or 2), or Samsung Galaxy S8. Running Android 8.0 or newer.

## Installation
From the command prompt go to your app's root folder and execute:
```bash
tns plugin add nativescript-ar
```

## Demo app (XML & TypeScript)
Check out [the embedded demo app](demo).

## Demo app (Angular)
This plugin is part of the [plugin showcase app](https://github.com/EddyVerbruggen/nativescript-pluginshowcase/tree/master/app/ar) I built using Angular.

## API

### `isSupported`
Check whether or not the device is AR-capable.

##### JavaScript
```js
var AR = require("nativescript-ar").AR;
var supported = AR.isSupported();
```

##### TypeScript
```typescript
import { AR } from "nativescript-ar";
const supported = AR.isSupported();
```



## Usage with XML
> For Angular, see the next section.

Add the `AR` namespace to the view you want AR-ify:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:AR="nativescript-ar">
  <!-- view contents -->
</Page>
```

And add an `AR` tag anywhere on the page, just like any other UI component. For instance:

```xml
  <GridLayout rows="auto, *" columns="*" class="p-20">
    <Label text="AR FTW!" class="t-20 text-center" textWrap="true"/>
    <AR:AR
        row="1"
        debugLevel="FEATURE_POINTS"
        planeOpacity="0.2"
        planeTapped="planeTapped" />
  </GridLayout>
```

Now open its backing component (for instance `main-page.ts`) and add:

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

## Usage with Angular
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
    planeOpacity="0.2"
    (planeTapped)="planeTapped($event)">
    <!-- you can add layouts here if you like to overlay the AR view -->
  </AR>
</GridLayout>
```

Open its component and, for instance, add:

```typescript
// add to imports
import { AR, ARPlaneTappedEventData } from "nativescript-ar";

export class MyComponent {
  constructor() {
    console.log("AR supported? " + AR.isSupported());
  }

  planeTapped(args: ARPlaneTappedEventData): void {
    console.log(`Plane tapped at ${args.position.x} y ${args.position.y} z ${args.position.z}`);
  }
}
```