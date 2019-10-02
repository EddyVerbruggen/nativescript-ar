AR API
======

[🔙](../README.md)

TODO all features of ARCommonNode, ARAddOptions, ARImageTrackingActions, etc

The easiest way to obtain a reference to the `AR` object is by grabbing it from the `arLoaded` event you bind in the view:

```typescript
import { AR, ARLoadedEventData } from "nativescript-ar";

class MyModel {
  private ar: AR;

  public arLoaded(args: ARLoadedEventData): void {
    this.ar = args.object;
  }
}
```

Then call one of the functions below, like `this.ar.addModel({})`:

- [add*](#add)

- [addNode](#addnode)
- [addModel](#addmodel)
- [addBox](#addbox)
- [addSphere](#addsphere)
- [addTube](#addtube)
- [addText](#addtext)
- [addImage](#addimage)
- [addUIView](#adduiview)

- [isSupported](#issupported-static)

- [grabScreenshot](#grabscreenshot-ios)

## `add*`

### Shared properties of all `add*` functions

#### `position` 
<img src="images/xyz.png" width="300px"/>

Looking at the image above, you can see the `0,0,0` coordinate is your device (not the floor),
and for instance, if you want to place an object in front of you, pass in a negative `z` value (in meters).

```typescript
position: ARPosition = {
  x: number,
  y: number,
  z: number
}
```

#### `scale` (optional)
This can either be a `number` or an `ARScale`:

```typescript
// either a number..
scale: number = 2.5;

// .. or an ARScale
scale: ARScale = {
  x: number,
  y: number,
  z: number
}
```

#### `rotation` (optional)
If you're not happy with the default placement of an object,
you can rotate it by a certain amount of degrees (0 - 360) relative to the x, y, and z axes.

For instance, if the backside of the model is facing you, setting y to `180` will make the front face you.

```typescript
rotation: ARRotation = {
  x: number,
  y: number,
  z: number
}
```

#### `mass` (optional, iOS only)
By default objects don't have a mass so they're not subject to gravity and don't 'fall'.

If you want the object to fall you may also want to increase the `position.y` (for a higher drop).

```typescript
mass: number = 0.1;
```

### Shared functions of all `add*` functions

#### `onTap`

```typescript
import { ARNodeInteraction } from "nativescript-ar";

onTap: (interaction: ARNodeInteraction) => {
  console.log("A node was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
  // as an example, here's how to rotate that node 5 degrees to the right:
  interaction.node.rotateBy({
    x: 0,
    y: 0,
    z: -5
  });
}
```

The `interaction` object above is of type [`ARNodeInteraction`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L71-L74) and contains a `touchPosition` (`x`, `y` coordinate) and a `node` object of type [`ARCommonNode`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L76-L99) which contains these properties:

|property|description
|---|---
|`position`|Returns the node's position as an [`ARPosition`](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/src/ar-common.ts#L346-L348) object with `x`, `y`, and `z` properties 
|`rotation`|Returns the node's rotation as an [`ARRotation`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L350-L352) object with `x`, `y`, and `z` properties (see the example above) 
|`scale`|Returns the node's scale as an [`ARScale`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L342-L344) object with `x`, `y`, and `z` properties
|`ios`|Returns the native iOS object
|`android`|Returns the native Android object

Furthermore, the `node` contains these functions by which you can interact with the node you tapped:

|function|description
|---|---
|`remove`|Removes the node from the scene
|`moveTo`|Move the node to a position (in meters from the camera) by passing in an [`ARPosition`](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/src/ar-common.ts#L346-L348) object with `x`, `y`, and `z` properties
|`moveBy`|Move the node by a number of meters by passing in an `ARPosition` object
|`rotateBy`|Rotate the node by a number of degrees by passing in an [`ARRotation`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L350-L352) object with `x`, `y`, and `z` properties (see the example above)
|`scaleBy`|Scale the node by either a `number` or an [`ARScale`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L342-L344) object with `x`, `y`, and `z` properties
|`getWorldPosition`|Get the position of the node in the world as an `ARPosition` object
|`setWorldPosition`|Set the position of the node in the world by passing in an `ARPosition` object


#### `onLongPress`

```typescript
import { ARNodeInteraction } from "nativescript-ar";

onLongPress: (interaction: ARNodeInteraction) => {
  console.log("A node was longpressed at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
  // as an example, here's how to rotate that node 5 degrees to the right:
  interaction.node.rotateBy({
    x: 0,
    y: 0,
    z: -5
  });
}
```

The `interaction` object above is of type [`ARNodeInteraction`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L71-L74) and contains a `touchPosition` (`x`, `y` coordinate) and a `node` object of type [`ARCommonNode`](https://github.com/EddyVerbruggen/nativescript-ar/blob/298ea9c5ad013eddfe1d5fac1adb144621ed1be4/src/ar-common.ts#L76-L99) which contains the same functions as described at `onTap` above.

## `addNode`
Use this if you want to add a node which you can attach other nodes to (models, images, spheres, etc), but you don't want the node itself to show up.

```typescript
ar.addNode({
  position: {
    x: 0,
    y: 1.2,
    z: 1
  }
});
```

## `addModel`
You can add 3D models to the AR scene by passing in `ARAddModelOptions` to the `addModel` function.
ARKit supports `.dae` files as used in our demo app, but you may need to clean up the model a bit so
it's properly shown. [Google a bit](https://www.google.nl/search?q=arkit+dae) for details.

Here are a few nice resources for `.dae` models:
- [Free3D.com](https://free3d.com/3d-models/all/1/dae)
- [Turbosquid.com, free](https://www.turbosquid.com/Search/Index.cfm?keyword=&search_type=free&media_typeid=2&file_type=194&=true&sort_column=A8&sort_order=desc)
- [Turbosquid.com, all](https://www.turbosquid.com/Search/Index.cfm?keyword=&media_typeid=2&file_type=194&=true&sort_column=A8&sort_order=desc)

> 💡 TIP: You can convert iOS Collada `.dae` files to an Android-compatible format:

Download [COLLADA2GLTF](https://github.com/KhronosGroup/COLLADA2GLTF), then run these commands from the folder you installed it to:

```
# glb format (the '-b' option here stands for 'binary'):
COLLADA2GLTF-bin <path-to>/your-collada-file.dae output.glb -b
```

Alternatively, convert from `.dae` to `.gltf` (although I was less successful using these):

```
COLLADA2GLTF-bin <path-to>/your-collada-file.dae output.glb
```

```typescript
import { ARNodeInteraction } from "nativescript-ar";

// assuming you have an 'ar' instance from either an event's 'object' property, or simply 'new AR()'.
ar.addModel({
  name: "Models.scnassets/Ball.dae", // refers to a file in App_Resources, see the demo app for examples
  childNodeName: null, // optional; if you only need 1 node within the model, then set its name here
  position: {
    x: 1,
    y: 1,
    z: 1
  },
  scale: 0.25,
  mass: 0.2,
  rotation: {
    x: 0,
    y: 180,
    z: 0
  },
  onTap: (interaction: ARNodeInteraction) => {
    console.log("Model was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
    // let's rotate the box 5 degrees to the right
    interaction.node.rotateBy({
      x: 0,
      y: 0,
      z: -5
    });
  },
  onLongPress: ((interaction: ARNodeInteraction) => {
    console.log("Model was longpressed, removing it just for show.");
    interaction.node.remove();
  })
}).then(arNode => {
  // to remove the model after a few seconds, you can do this:
  setTimeout(() => {
    arNode.remove();
  }, 2000);
});
```

## `addBox`
You can add a basic shape, like a box, to the AR scene by passing in `ARAddBoxOptions` to the `addBox` function.
By default boxes are white, but you can pass in a texture to make it look pretty.

<img src="images/scnbox.png" width="278px"/>

Note that the `materials` array can be specified in a number of ways.
Its contents are either of type `string` (referring to an image), `Color`, or `ARMaterial`.
See the TS definitions and these examples for details.

```typescript
import { ARNodeInteraction } from "nativescript-ar";

ar.addBox({
  position: {
    x: 1,
    y: 1,
    z: 1
  },
  dimensions: {
    x: 0.25,
    y: 0.25,
    z: 0.25
  },
  chamferRadius: 0.01, // 'rounded corners', this is relative to the 'dimensions'.
  mass: 0.2,
  materials: ["Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png"], // must be in App_Resources
  onTap: (interaction: ARNodeInteraction) => {
    console.log("Box was tapped");
    // move the box a little
    interaction.node.moveBy({
      x: 0,
      y: 0.02,
      z: 0.02
    });
  },
  onLongPress: (interaction: ARNodeInteraction) => console.log("Box was longpressed")
}).then(arNode => console.log("Box was added"));
```

## `addSphere`
<img src="images/scnsphere.png" width="316px"/>

```typescript
import { ARNodeInteraction } from "nativescript-ar";
import { Color } from "tns-core-modules/color";

ar.addSphere({
  position: {
    x: 1,
    y: 1,
    z: 1
  },
  radius: 0.5,
  segmentCount: 100,
  mass: 0.001,
  materials: [new Color("red")],
  onTap: (interaction: ARNodeInteraction) => {
    console.log("sphere tapped: " + interaction.node.id + " at " + interaction.touchPosition);
    // let's rotate the box 5 degrees to the right
    interaction.node.rotateBy({
      x: 0,
      y: 0,
      z: -5
    });
  },
  onLongPress: (interaction: ARNodeInteraction) => {
    console.log("sphere longpressed: " + interaction.node.id + " at " + interaction.touchPosition);
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
});
```

## `addTube`
<img src="images/scntube.png" width="308px"/>

```typescript
import { ARNodeInteraction } from "nativescript-ar";

ar.addTube({
  position: {
    x: 1,
    y: 1,
    z: 1
  },
  innerRadius: 0.3,
  outerRadius: 0.5,
  height: 0.8,
  radialSegmentCount: 40,
  heightSegmentCount: 10,
  mass: 0.001,
  materials: [{
    diffuse: {
      contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
      wrapMode: "Repeat" // which is the default, see ARMaterialWrapMode for other options
    },
    roughness: "Assets.scnassets/Materials/tnsgranite/tnsgranite-roughness.png",
    transparency: 1 // 0 - 1, where 1 is solid (which is the default)
  }],
  onTap: (interaction: ARNodeInteraction) => console.log("Tube was tapped"),
  onLongPress: (interaction: ARNodeInteraction) => console.log("Tube was longpressed")
});
```

## `addText`
This is implemented for iOS only.

```typescript
import { ARNode } from "nativescript-ar";
import { Color } from "tns-core-modules/color";

ar.addText({
  text: "{N}",
  position: {
    x: 2.7,
    y: -0.2,
    z: -5
  },
  scale: 0.1,
  depth: 1,
  materials: [new Color("blue")],
  rotation: {
    x: 40,
    y: 10,
    z: 10
  }
});
```

## `addImage`

```typescript
ar.addImage({
  position: {
    x: 0,
    y: 0.5,
    z: -2
  },
  image: "https://d2odgkulk9w7if.cloudfront.net/images/default-source/logos/ns-logo-shadowed-min.png"
});
```

## `addUIView`
This one is a bit tricky and requires some tinkering with sizes and positioning because the rendered view may differ a bit between platforms.

A great example can be seen in the [Solar System demo app](../demo-solarsystem), check out [this UI declaration](https://github.com/EddyVerbruggen/nativescript-ar/blob/9b6cd01aed9ff31857593288232cc6c3c2d987e7/demo-solarsystem/app/components/App.vue#L7-L12) which are a few NativeScript `Label` and `Slider` tags wrapped in a `StackLayout` which renders like this:

<img src="images/addUIView.jpg" width="450px"/>

_Neat huh!?_

So what you need to do is declare a view like in this Vue example:

```html
<Page @loaded="pageLoaded">
  <ActionBar title="ARRRR"></ActionBar>

  <GridLayout columns="*" rows="*">

    <!-- because this layout is "below" the AR node (z-index-wise) it's not shown to the user -->
    <StackLayout id="myUIView">
      <Label text="any NativeScript view can go here" horizontalAlignment="center"></Label>
    </StackLayout>

    <!-- this will hide the above layouts during the time the app is loaded and the AR camera view is showing -->
    <StackLayout class="cover">
    </StackLayout>

    <AR
        planeDetection="HORIZONTAL"
        @arLoaded="arLoaded"
        @planeTapped="loadARContent">
    </AR>

    <!-- because this label is "above" the AR node, it _is_ visible -->
    <Label :text="arLabel" class="ar-label" verticalAlignment="top"></Label>
  </GridLayout>
</Page>
```

Once the AR view is showing, you can grab that `myUIView` view and add it to the camera.
By passing a `parentNode` you can position the view relative to another node.

```typescript
ar.addUIView({
  position: {x: 0, y: .22, z: 0},
  parentNode: objectNode,
  view: this.page.getViewById("myUIView"),
  scale: 0.4
}).then(view => console.log("UI view added"));
```

For more details, please see [this implementation](https://github.com/EddyVerbruggen/nativescript-ar/blob/master/demo-solarsystem/app/components/App.vue) in the Solar System demo app.

## `isSupported` (static)
Check whether or not the device is AR-capable.

#### JavaScript
```js
var AR = require("nativescript-ar").AR;
var supported = AR.isSupported();
```

#### TypeScript
```typescript
import { AR } from "nativescript-ar";
const supported = AR.isSupported();
```

## `grabScreenshot` (iOS)
Added in 0.5.0, currently iOS-only.

Grab whatever the camera is showing, and get back a native image (`UIImage` on iOS).
You can show it on-screen afterwards as [shown here, in the demo app](https://github.com/EddyVerbruggen/nativescript-ar/blob/49fe472b1d53461c51423182c46168e17dbe5b64/demo/app/main-view-model.ts#L32).

#### JavaScript
```js
var img = ar.grabScreenshot();
```

#### TypeScript
```typescript
const img = ar.grabScreenshot();
```

## `startRecordingVideo` / `stopRecordingVideo` (iOS)
Added in 0.8.1, currently iOS-only.

Record the AR scene to a locally stored `.mp4` file.

#### TypeScript
```typescript
ar.startRecordingVideo()
  .then(() => {
    console.log("Started recording video");

    // stop recording after 2 seconds
    setTimeout(() => {
      this.ar.stopRecordingVideo().then(videoUrl => {
        console.log("Recording result: " + videoUrl); // a local url to an .mp4 file
      });
    }, 2000);
  });
```
