API
===

[🔙](../README.md)


AR
- [isSupported](#issupported-static)
- [addModel](#addmodel)
- [addBox](#addbox)

TODO: other functions


### `isSupported` (static)
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

#### `addModel`
You can add 3D models to the AR scene by passing in `ARAddModelOptions` to the `addModel` function.
ARKit supports `.dae` files as used in our demo app, but you may need to clean up the model a bit so
it's properly shown. [Google a bit](https://www.google.nl/search?q=arkit+dae) for details.

```typescript
import { ARNode } from "nativescript-ar";

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
  mass: 0.2, // pass this in so the model can 'fall'. Increase the 'position.y' value for a higher drop :)
  onTap: ((model: ARNode) => {
    console.log("Model was tapped");
  }),
  onLongPress: ((model: ARNode) => {
    console.log("Model was longpressed, removing it just for show.");
    model.remove();
  })
}).then(arNode => {
  // to remove the model after a few seconds you can do this:
  setTimeout(() => {
    arNode.remove();
  }, 2000);
});
```

#### `addBox`
You can add a basic shape, like a box, to the AR scene by passing in `ARAddBoxOptions` to the `addBox` function.

By default boxes are white, but you can pass in a texture to make it look pretty.

```typescript
import { ARNode } from "nativescript-ar";

ar.addBox({
  name: "Models.scnassets/Ball.dae", // refers to a file in App_Resources, see the demo app for examples
  childNodeName: null, // optional; if you only need 1 node within the model, then set its name here
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
  mass: 0.2, // pass this in so the model can 'fall'. Increase the 'position.y' value for a higher drop :)
  onTap: ((model: ARNode) => {
    console.log("Model was tapped");
  }),
  onLongPress: ((model: ARNode) => {
    console.log("Model was longpressed, removing it just for show.");
    model.remove();
  })
}).then(arNode => {
  // to remove the model after a few seconds you can do this:
  setTimeout(() => {
    arNode.remove();
  }, 2000);
});
```

### TODO: other functions..