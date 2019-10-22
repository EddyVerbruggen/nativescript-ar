import {ARDebugLevel} from "nativescript-ar";
<template>
  <Page @loaded="pageLoaded">
    <ActionBar title="Solar System {N}-Vue"></ActionBar>
    <GridLayout columns="*" rows="*">

      <!-- because this controlPanel layout is "below" the AR node (z-index-wise) it's not shown to the user -->
      <StackLayout id="controlPanel" class="control-panel">
        <Label text="Orbit Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="orbitSpeed" width="100%" minValue="-30" maxValue="50" horizontalAlignment="center"></Slider>
        <Label text="Rotation Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="rotationSpeed" width="100%" minValue="-20" maxValue="50" horizontalAlignment="center"></Slider>
        <Label text="Sun size:" horizontalAlignment="center"></Label>
        <Slider v-model="sunSize" width="100%" minValue="0" maxValue="100" horizontalAlignment="center"></Slider>
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
          planeDetection="HORIZONTAL"
          @arLoaded="arLoaded"
          @planeTapped="loadSolarSystem">
      </AR>

      <!-- because this bit is "above" the AR node, it _is_ visible -->
      <StackLayout class="ar-label" verticalAlignment="top">
        <Label :text="arLabel" verticalAlignment="top"></Label>
        <Label :text="simulatedDateFormatted" style="font-size: 12"></Label>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { AR, ARDebugLevel } from "nativescript-ar";
  import { Color } from "tns-core-modules/color";
  import { isIOS } from "tns-core-modules/platform";

  const materialPrefix = isIOS ? "Orbitals.scnassets/" : "";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAY_MS = 24 * 60 * 60 * 1000;

  // if this is set to 1 (which is more realistic), you'd have a hard time seeing all planets
  const SCALE_FACTOR = 4;

  // TODO add feature: when you look at a planet, highlight it/show its name

  const SUN_DEFAULT_SCALE = 0.82;
  const SUN_TO_EARTH_METERS = 1.0;
  const EARTH_TO_MOON_METERS = 0.15;
  const EARTH_ORBIT_SPEED = 30.5;

  // Saturn now officially has 82 moons, so let's add some ;)
  const NR_OF_SATURN_MOONS = isIOS ? 82 : 20; // not sure how performance is affected on Android, so using a safer number
  const saturnMoonColors = ["red", "yellow", "blue", "green", "purple", "orange", "pink", "gray", "brown", "black"];
  const saturnMoonNColors = [];
  saturnMoonColors.forEach(s => saturnMoonNColors.push(new Color(s)));
  const saturnMoons = [];
  for (let i = 0; i < NR_OF_SATURN_MOONS; i++) {
    saturnMoons.push({
      name: "Saturn moon",
      distance: 0.4 + (Math.random() / 300),
      orbitSpeed: 100 * Math.random(),
      scale: (Math.random() / 80) * SCALE_FACTOR,
      tilt: i * 13,
      position: {
        x: 0.04 + (Math.random() / 50),
        y: 0,
        z: 0
      },
      materials: isIOS ? [{
        diffuse: materialPrefix + "Luna_Mat_baseColor.png",
        normal: materialPrefix + "Luna_Mat_normal.png",
        roughness: materialPrefix + "Luna_Mat_occlusionRoughnessMetallic.png",
        emission: saturnMoonNColors[Math.round(Math.random() * 9)]
      }] : [saturnMoonNColors[Math.round(Math.random() * 9)]],
    });
  }

  const solarSystemDefinition = {
    name: "Sun",
    distance: 0,
    orbitSpeed: 0,
    scale: SUN_DEFAULT_SCALE,
    materials: [{
      diffuse: materialPrefix + "Sol_Opaque_Mat_baseColor.png",
      emission: materialPrefix + "Sol_Opaque_Mat_emissive.png"
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
      orbitSpeed: EARTH_ORBIT_SPEED,
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
        orbitSpeed: 0, // "locked" with Earth
        scale: 0.018 * SCALE_FACTOR,
        tilt: 6.68,
        materials: [{
          diffuse: materialPrefix + "Luna_Mat_baseColor.png",
          normal: materialPrefix + "Luna_Mat_normal.png",
          roughness: materialPrefix + "Luna_Mat_occlusionRoughnessMetallic.png"
        }],
        life: [{
          // Snorlax is on the dark side of the moon - that's why we've never seen him!
          name: "Snorlax",
          position: {x: .27, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: -90},
          scale: 0.001 * (isIOS ? 1 : 100)
        }]
      }]
    }, {
      name: "Mars",
      distance: 1.5,
      orbitSpeed: 24,
      materials: [{
        diffuse: materialPrefix + "Mars_mat_baseColor.png",
        normal: materialPrefix + "Mars_mat_normal.png"
      }],
      scale: 0.0265 * SCALE_FACTOR,
      tilt: 25.19,
      // Elon's mission is foobar as the place is crawling with nasty creatures!
      life: [
        {
          name: "Caterpie",
          position: {x: -.3, y: 0, z: 0},
          rotation: {x: 0, y: 90, z: 0},
          scale: 0.005 * (isIOS ? 1 : 50)
        },
        {
          name: "Caterpie",
          position: {x: .3, y: 0, z: 0},
          rotation: {x: 0, y: 90, z: 0},
          scale: 0.003 * (isIOS ? 1 : 50)
        },
        {
          name: "Caterpie",
          position: {x: 0, y: .3, z: 0},
          rotation: {x: 0, y: 90, z: 90},
          scale: 0.004 * (isIOS ? 1 : 50)
        },
        {
          name: "Caterpie",
          position: {x: 0, y: 0, z: .3},
          rotation: {x: 0, y: 90, z: 90},
          scale: 0.006 * (isIOS ? 1 : 50)
        }]
    }, {
      name: "Jupiter",
      distance: 2.2,
      orbitSpeed: 30,
      materials: [{
        diffuse: materialPrefix + "Jupiter_Mat_baseColor.png"
      }],
      scale: 0.16 * SCALE_FACTOR,
      tilt: 3.13,
      life: [
        {
          name: "Spider",
          position: {x: 0.263, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: -90},
          scale: 0.0005 * (isIOS ? 1 : 2000)
        }, {
          name: "WalkingBoy",
          position: {x: 0, y: 0.263, z: 0},
          rotation: {x: 0, y: 90, z: 0},
          scale: 0.001 * (isIOS ? 1 : 70)
        }
      ]
    }, {
      name: "Saturn",
      distance: 3.5,
      orbitSpeed: 9,
      materials: [{
        diffuse: materialPrefix + "SaturnPlanet_Opaque_Mat_baseColor.png"
      }],
      scale: 0.1325 * SCALE_FACTOR,
      tilt: 26.73,
      children: saturnMoons
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
        simulatedDate: new Date(),
        simulatedDateFormatted: undefined,
        orbitSpeed: -15,
        rotationSpeed: -15,
        sunSize: 50,
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

          if (this.solarSystemLoaded) {
            this.updateSimulatedDate(orbitSpeedCompensation);
          }
        }, 1000 / fps);
      },

      updateSimulatedDate(speed) {
        const d = new Date(this.simulatedDate.getTime() + ((speed / 2.3) * DAY_MS));
        this.simulatedDate = d;
        this.simulatedDateFormatted = MONTHS[d.getMonth()] + " " + d.getFullYear()
      },

      arLoaded(arLoadedEventData) {
        console.log("AR loaded");
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
            y: arPlaneTappedEventData.position.y + 1.2, // a bit above the plane we tapped (in meters)
            z: arPlaneTappedEventData.position.z
          }
        }).then(solarSystemNode => {
          console.log("solarSystemNode added: " + solarSystemNode);
          this.renderSolarsystemObject(ar, solarSystemDefinition, solarSystemNode);
          this.arLabel = "Now tap the sun for controls..";
          // disabling plane detection
          ar.setDebugLevel(ARDebugLevel.NONE);
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
              position: solarSystemObject.position,
              onTap: () => {
                console.log(">> tap: " + solarSystemObject.name);
                this.arLabel = solarSystemObject.name + " tapped";
                if (solarSystemObject.name === "Sun") {
                  if (!this.hasControlPanel) {
                    this.hasControlPanel = true;
                    ar.addUIView({
                      position: {x: 0, y: .33, z: 0},
                      parentNode: objectNode,
                      view: this.page.getViewById("controlPanel"),
                      scale: 0.5
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
                  // this.orbitalName = solarSystemObject.name;
                  // ar.addUIView({
                  //   position: {x: 0, y: .1, z: 0},
                  //   parentNode: objectNode,
                  //   view: this.page.getViewById("orbitalName"),
                  //   scale: 0.35 // TODO see above
                  // });
                }
              }
            }).then(parentNode => {
              // add some life to planets ;)
              if (solarSystemObject.life) {
                solarSystemObject.life.forEach(life => {
                  const name = isIOS
                      ? `PokemonModels.scnassets/${life.name}/${life.name}.dae`
                      : `${life.name}.glb`;
                  ar.addModel({
                    name,
                    parentNode,
                    position: life.position,
                    rotation: life.rotation,
                    scale: life.scale
                  }).then(addedLife => {
                    console.log("Added life: " + addedLife);
                    // this can be used to move the boy-model over the planet, but we also need to rotate it so his feet always touch the surface
                    /*
                    if (life.name === "WalkingBoy") {
                      let walkDegreesPerSecond = 0;
                      setInterval(() => {
                        walkDegreesPerSecond += .1 / fps;
                        const r = life.position.y;
                        const newLeft = r * Math.cos(walkDegreesPerSecond);
                        const newTop = r * Math.sin(walkDegreesPerSecond);
                        addedLife.moveTo({x: newLeft, y: newTop, z: 0});
                      }, 1000 / fps);
                    }
                    */
                  }).catch(err => console.log("Error adding life: " + err))
                });
              }

              // adding planet-specific tweaks here, just for fun/show :)
              if (solarSystemObject.name === "Earth") {
                console.log("Adding clouds to Earth");
                let cloudDegreesPerSecond = 12;
                ar.addSphere({
                  position: {x: -.0001, y: 0, z: 0},
                  parentNode,
                  radius: radius + (isIOS ? 0.015 : 0.05), // TODO this platform difference is not so nice
                  materials: [{
                    diffuse: materialPrefix + "Earth_Clouds_mat_baseColor.png"
                  }],
                  onTap: () => {
                    console.log(">> tap earth clouds");
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
                  parentNode,
                  dimensions: {
                    x: 1.8,
                    y: 0,
                    z: 1.8
                  },
                  materials: [{
                    diffuse: materialPrefix + "saturn_loop.png",
                    transparency: 0.6
                  }]
                }).catch(console.error);

              } else if (solarSystemObject.name === "Sun") {
                let lastSunSize = this.sunSize;
                setInterval(() => {
                  if (lastSunSize !== this.sunSize) {
                    lastSunSize = this.sunSize;
                    parentNode.scaleTo(0.016 * this.sunSize);
                  }
                }, 500);
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
    width: 320;
    height: 320;
    padding: 24;
    opacity: 0.8;
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
