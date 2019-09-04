<template>
  <Page @loaded="pageLoaded">
    <ActionBar title="Welcome to NativeScript-Vue!"></ActionBar>
    <GridLayout columns="*" rows="*">

      <!-- because this controlPanel layout is "below" the AR node (z-index-wise) it's not shown to the user -->
      <StackLayout id="controlPanel" class="control-panel">
        <Label text="Orbit Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="orbitSpeed" width="100%" minValue="-20" maxValue="20" horizontalAlignment="center"></Slider>
        <Label text="Rotation Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="rotationSpeed" width="100%" minValue="-20" maxValue="20" horizontalAlignment="center"></Slider>
      </StackLayout>

      <!-- same comment as above -->
      <StackLayout id="orbitalName" class="orbital-name" horizontalAlignment="center" verticalAlignment="center">
        <Label :text="orbitalName" horizontalAlignment="center" verticalAlignment="center"></Label>
      </StackLayout>

      <!-- this will hide the above layouts during the time the app is loaded and the AR camera view is showing -->
      <StackLayout class="cover">
      </StackLayout>

      <AR
          debugLevel="FEATURE_POINTS"
          detectPlanes="true"
          showStatistics="true"
          @arLoaded="arLoaded"
          @planeTapped="loadSolarSystem">
      </AR>

      <!-- because this label is "above" the AR node, it _is_ visible -->
      <Label :text="arLabel" class="ar-label" verticalAlignment="top"></Label>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { AR } from "nativescript-ar";
  import { isIOS } from "tns-core-modules/platform";

  // if this is set to 1 (which is more realistic), you'd have a hard time seeing all planets
  const SCALE_FACTOR = 4;

  const SUN_TO_EARTH_METERS = 1.0;
  const EARTH_TO_MOON_METERS = 0.15;

  const materialPrefix = isIOS ? "Orbitals.scnassets/" : "";
  const solarSystemDefinition = {
    name: "Sun",
    distance: 0,
    orbitSpeed: 0,
    scale: 0.5,
    materials: [{
      diffuse: materialPrefix + "Sol_Opaque_Mat_baseColor.png",
      // emission: materialPrefix + "Sol_Opaque_Mat_emissive.png"
    }],
    tilt: 0,
    children: [{
      name: "Mercury",
      distance: 0.4,
      orbitSpeed: 47,
      materials: [{
        diffuse: materialPrefix + "Mercury_Mat_baseColor.png",
        normal: materialPrefix + "Mercury_Mat_normal.png",
        roughness: materialPrefix + "Mercury_Mat_occlusionRoughnessMetallic.png"
      }],
      scale: 0.019 * SCALE_FACTOR,
      tilt: 0.03
    }, {
      name: "Venus",
      distance: 0.7,
      orbitSpeed: 35,
      materials: [{
        diffuse: materialPrefix + "Venus_Atmosphere_Mat_baseColor.png",
        roughness: materialPrefix + "Venus_Atmosphere_Mat_occlusionRoughnessMetallic.png"
      }],
      scale: 0.0475 * SCALE_FACTOR,
      tilt: 2.64
    }, {
      name: "Earth",
      distance: SUN_TO_EARTH_METERS,
      orbitSpeed: 29,
      scale: 0.05 * SCALE_FACTOR,
      tilt: 23.4,
      materials: [{
        diffuse: materialPrefix + "Earth_Mat_baseColor.png",
        normal: materialPrefix + "Earth_Mat_normal.png",
        roughness: materialPrefix + "Earth_Mat_occlusionRoughnessMetallic.png"
      }],
      children: [{
        name: "Moon",
        distance: EARTH_TO_MOON_METERS,
        orbitSpeed: 3,
        scale: 0.018 * SCALE_FACTOR,
        tilt: 6.68,
        materials: [{
          diffuse: materialPrefix + "Luna_Mat_baseColor.png",
          normal: materialPrefix + "Luna_Mat_normal.png",
          roughness: materialPrefix + "Luna_Mat_occlusionRoughnessMetallic.png"
        }],
      }]
    }, {
      name: "Mars",
      distance: 1.5,
      orbitSpeed: 24,
      materials: [{
        diffuse: materialPrefix + "Mercury_Mat_baseColor.png",
        normal: materialPrefix + "Mercury_Mat_normal.png"
      }],
      scale: 0.0265 * SCALE_FACTOR,
      tilt: 25.19
    }, {
      name: "Jupiter",
      distance: 2.2,
      orbitSpeed: 13,
      materials: [{
        diffuse: materialPrefix + "Jupiter_Mat_baseColor.png"
      }],
      scale: 0.16 * SCALE_FACTOR,
      tilt: 3.13
    }, {
      name: "Saturn",
      distance: 3.5,
      orbitSpeed: 9,
      materials: [{
        diffuse: materialPrefix + "SaturnPlanet_Opaque_Mat_baseColor.png"
      }],
      scale: 0.1325 * SCALE_FACTOR,
      tilt: 26.73
    }, {
      name: "Uranus",
      distance: 5.2,
      orbitSpeed: 7,
      materials: [{
        diffuse: materialPrefix + "UranusGlobe_Mat_baseColor.png"
      }],
      scale: 0.1 * SCALE_FACTOR,
      tilt: 82.23
    }, {
      name: "Neptune",
      distance: 6.1,
      orbitSpeed: 5,
      materials: [{
        diffuse: materialPrefix + "NeptuneGlobe_Mat_baseColor.png"
      }],
      scale: 0.074 * SCALE_FACTOR,
      tilt: 28.32
    }]
  };

  const fps = 60;

  export default {
    data() {
      return {
        msg: 'Hello World!',
        arLabel: 'Look for a surface and tap it..',
        solarSystemLoaded: false,
        orbitalName: undefined,
        orbitSpeed: 1,
        rotationSpeed: 1,
        hasControlPanel: false,
        page: undefined,
        ar: undefined,
        orbitals: [],
        rotators: []
      }
    },

    methods: {
      pageLoaded(event) {
        this.page = event.object;

        const animator = setInterval(() => {
          // this makes the orbitals rotate around their parent
          const orbitSpeedCompensation = this.orbitSpeed > 0 ? this.orbitSpeed : 1 / Math.max(1.5, Math.abs(this.orbitSpeed));
          this.orbitals.forEach(orbit => {
            orbit.node.rotateBy({
              x: 0,
              y: orbitSpeedCompensation * orbit.speed / fps,
              z: 0
            });
          });

          // and this makes the planets and moons rotate around their own axis
          const rotationSpeedCompensation = this.rotationSpeed > 0 ? this.rotationSpeed : 1 / Math.max(1.5, Math.abs(this.rotationSpeed));
          this.rotators.forEach(orbit => {
            orbit.node.rotateBy({
              x: 0,
              // TODO not happy with this difference between platforms
              y: (isIOS ? 6 : 2) * rotationSpeedCompensation * orbit.speed / fps,
              z: 0
            });
          });
        }, 1000 / fps);
      },

      arLoaded(arLoadedEventData) {
        console.log(">> AR Loaded! Object: " + arLoadedEventData.object);
        this.ar = arLoadedEventData.object;
      },

      loadSolarSystem(arPlaneTappedEventData) {
        // we only need one solar system in our lives, right?
        if (this.solarSystemLoaded) {
          return;
        }
        this.solarSystemLoaded = true;

        const ar: AR = arPlaneTappedEventData.object;

        ar.addNode({
          position: {
            x: arPlaneTappedEventData.position.x,
            y: arPlaneTappedEventData.position.y + 0.5, // a bit above where we tapped
            z: arPlaneTappedEventData.position.z
          }
        }).then(solarSystemNode => {
          console.log("solarSystemNode added: " + solarSystemNode);
          this.renderSolarsystemObject(ar, solarSystemDefinition, solarSystemNode);
          this.arLabel = "Now tap the sun for controls..";
        })
      },

      renderSolarsystemObject(ar, solarSystemObject, parentNode) {
        ar.addNode({
          parentNode,
          rotation: {
            x: 0,
            y: 0,
            z: solarSystemObject.tilt
          }
        }).then(orbitNode => {

          this.orbitals.push({
            node: orbitNode,
            speed: solarSystemObject.orbitSpeed
          });

          ar.addNode({
            parentNode: orbitNode,
            position: {
              x: 0,
              y: 0,
              z: -solarSystemObject.distance
            }

          }).then(objectNode => {
            this.rotators.push({
              node: objectNode,
              speed: solarSystemObject.orbitSpeed
            });

            const radius = 0.28;
            ar.addSphere({
              parentNode: objectNode,
              scale: solarSystemObject.scale,
              radius,
              materials: solarSystemObject.materials,
              onTap: () => {
                console.log(">> tap: " + solarSystemObject.name);
                this.arLabel = solarSystemObject.name + " tapped";
                if (solarSystemObject.name === "Sun") {
                  if (!this.hasControlPanel) {
                    this.hasControlPanel = true;
                    ar.addUIView({
                      position: {x: 0, y: .22, z: 0},
                      // dimensions:{x:1, y:0.8}, //ios might need this
                      parentNode: objectNode,
                      view: this.page.getViewById("controlPanel"),
                      // 0.35 for Android
                      scale: 0.5 // TODO (in the plugin code).. prolly do something with screen density
                    }).then(view => {
                      setInterval(() => {
                        try {
                          let p = view.getWorldPosition();
                          let c = ar.getCameraPosition();
                          c.y = p.y;
                          view.lookAtWorldPosition(c);
                        } catch (e) {
                          console.error(e);
                        }
                      }, 100);
                    });
                  }
                } else {
                  this.orbitalName = solarSystemObject.name;
                  ar.addUIView({
                    position: {x: 0, y: .1, z: 0},
                    parentNode: objectNode,
                    view: this.page.getViewById("orbitalName"),
                    scale: 0.35 // TODO see above
                  });
                }
              }
            }).then(o => {
              // adding planet-specific tweaks here, just for fun/show :)
              if (solarSystemObject.name === "Earth") {
                console.log("Adding clouds to Earth");
                let cloudDegreesPerSecond = 12;
                ar.addSphere({
                  // position: {x: -.0001, y: 0, z: 0},
                  parentNode: o,
                  radius: radius + (isIOS ? 0.015 : 0.05), // TODO this platform difference is not so nice
                  materials: [{
                    diffuse: materialPrefix + "Earth_Clouds_mat_baseColor.png"
                  }],
                  onTap: () => {
                    console.log(">> tap: " + solarSystemObject.name);
                    this.arLabel = solarSystemObject.name + " tapped, reversing clouds ☁ 🔁";
                    this.orbitalName = solarSystemObject.name;
                    // GodMode: reverse the clouds!
                    cloudDegreesPerSecond = -1 * cloudDegreesPerSecond;
                  }
                }).then(earthClouds => {
                  setInterval(() => {
                    earthClouds.rotateBy({x: 0, y: cloudDegreesPerSecond / fps, z: 0});
                  }, 1000 / fps);
                }).catch(console.error);

              } else if (solarSystemObject.name === "Saturn") {
                console.log("Adding a ring to Saturn");
                ar.addBox({
                  parentNode: o,
                  dimensions: {
                    x: 1.2,
                    y: 0,
                    z: 1.2
                  },
                  materials: [{
                    diffuse: materialPrefix + "saturn_loop.png",
                    transparency: 0.7
                  }]
                }).catch(console.error);
              }

            }).catch(e => {
              console.error("error adding sphere: " + e);
            });

            if (solarSystemObject.children) {
              solarSystemObject.children.forEach(child => {
                this.renderSolarsystemObject(ar, child, objectNode);
              });
            }
          }).catch(e => console.error(e))
        }).catch(e => console.error(e))
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .ar-label {
    padding: 12 14;
    color: black;
    background-color: white;
    font-weight: bold;
    opacity: .7;
  }

  .control-panel {
    width: 300;
    height: 270;
    padding: 24;
    /*opacity: 0.8;*/
    font-size: 24;
    color: white;
    border-radius: 10;
    background-color: cornflowerblue;
  }

  .control-panel Label {
    padding: 16;
  }

  .orbital-name {
    width: 240;
    height: 60;
    background-color: cornflowerblue;
    opacity: 0.5;
  }

  .orbital-name Label {
    font-size: 24;
    color: white;
    padding: 8;
  }

  .cover {
    background-color: black;
  }
</style>
