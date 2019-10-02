nativescript-ar with Vue
========================

[🔙](../README.md)

## Demo app
Check out the [Solar System demo app](../demo-solarsystem), which is an example of [World tracking](./tracking-world.md).

## Declaring the `<AR>` view
Open your `main.ts` and add:

```typescript
(<any>Vue).registerElement('AR', () => require('nativescript-ar').AR);
```

Open a `.vue` file and add something like this (simplified):

```html
<template>
  <Page @loaded="pageLoaded">
    <ActionBar title="Welcome to NativeScript-Vue!"></ActionBar>
    <GridLayout columns="*" rows="*">
      <AR
          debugLevel="FEATURE_POINTS"
          planeDetection="HORIZONTAL"
          showStatistics="true"
          @arLoaded="arLoaded"
          @planeTapped="addSomethingToThePlane">
      </AR>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { AR } from "nativescript-ar";

  export default {
    methods: {
      arLoaded(arLoadedEventData) {
        console.log(">> AR Loaded! Object: " + arLoadedEventData.object);
        const ar: AR = arLoadedEventData.object;
        // do something with the 'ar' object.. see 'addSomethingToThePlane' below 
      },

      addSomethingToThePlane(arPlaneTappedEventData) {
        const ar: AR = arPlaneTappedEventData.object;
        ar.addNode({
          position: {
            x: arPlaneTappedEventData.position.x,
            y: arPlaneTappedEventData.position.y + 0.1, // half a meter above the plane we tapped
            z: arPlaneTappedEventData.position.z
          }
        }).then(node => console.log("node added: " + node))
      }
    }
  }
</script>
```

## Continue reading
- [World tracking](./tracking-world.md): augment the world around you
- [Face tracking](./tracking-faces.md): augment a face
- [Image tracking](./tracking-images.md): augment 2D images your camera finds
