AR view tag options
===================

[🔙](../README.md)

The `<AR>` view tag extends [`ContentView`](https://docs.nativescript.org/api-reference/classes/_ui_content_view_.contentview.html)
which means you can add regular NativeScript properties like `style`, `row`, `col`, and `horizontalAlignment` as usual.

But to help add behavior to the AR experience, here are the properties and events unique to the `<AR>` tag:

## Properties
|property|default|description
|---|---|---
|`debugLevel`|`NONE`|One of the options in the `ARDebugLevel` enum: `NONE`, `WORLD_ORIGIN`, `FEATURE_POINTS`, `PHYSICS_SHAPES`.
|`detectPlanes`|`false`|You can have the plugin detecting planes right away by setting this to `true`.
|`showStatistics`|`false`|Draw a few statistics at the bottom.
|`planeMaterial`|-|A `string` referencing a texture for the planes. For instance, the demo uses ['tron'](https://github.com/EddyVerbruggen/nativescript-ar/tree/master/demo/app/App_Resources/iOS/Assets.scnassets/Materials/tron). Can also be a `Color` or `ARMaterial` instance. You won't see the planes if not set.  
|`planeOpacity`|`0.1`|Determines how transparent the planes are, where 0 is invisible, and 1 is 'solid'.

## Events
|event|event data|description
|---|---|---
|`arLoaded`|`ARLoadedEventData`|Triggered when the AR view has been drawn.
|`planeDetected`|`ARPlaneDetectedEventData`|Triggered when a new plane was detected.
|`planeTapped`|`ARPlaneTappedEventData`|Triggered when a plane was tapped by the user. Will return the x, y, and z coordinates in the 3D space.
|`sceneTapped`|`ARSceneTappedEventData`|Triggered when a scene was tapped by the user. Will return the x and y screen coordinates.

## Continue reading
- [Tell me about the API](api.md)
