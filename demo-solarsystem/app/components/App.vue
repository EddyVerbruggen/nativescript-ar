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
          planeOpacity="0.25"
          :planeMaterial="planeMaterial"
          @arLoaded="arLoaded"
          @planeTapped="loadSolarSystem">
      </AR>

      <!-- adding 'isUserInteractionEnabled' makes sure this layer doesn't steal taps from layers below (esp. the AR one) -->
      <AbsoluteLayout isUserInteractionEnabled="false" v-if="gameEnabled">
        <Img src="~/assets/images/crosshair.png" width="32" height="32" opacity="0.75" :left="center.x - 16" :top="center.y - center.yCompensation"/>
        <Img src="~/assets/images/arrow.png" @loaded="gameArrowLoaded" width="32" height="32" :left="game.objectPositionOffscreenIndicator.x" :top="game.objectPositionOffscreenIndicator.y"/>
      </AbsoluteLayout>

      <!-- because this bit is "above" the AR node, it _is_ visible -->
      <GridLayout rows="auto, auto" columns="*, auto" class="ar-info" verticalAlignment="top">
        <Label row="0" col="0" :text="arLabel" verticalAlignment="top"></Label>
        <StackLayout row="0" col="1" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="solarSystemLoaded">
          <Img src="~/assets/images/telescope.png" width="32" height="32" marginRight="10"/>
          <Switch v-model="gameEnabled" color="white" verticalAlignment="top"></Switch>
        </StackLayout>

        <Label row="1" col="0" :text="simulatedDateFormatted" style="font-size: 12"></Label>
        <Label row="1" col="1" :text="game.elapsedTimeFormatted" style="font-size: 12" horizontalAlignment="right" v-if="solarSystemLoaded"></Label>
      </GridLayout>

    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { AR } from "nativescript-ar";
  import { TNSPlayer } from "nativescript-audio";
  import { ToastPosition, Toasty } from "nativescript-toasty";
  import { Vibrate } from "nativescript-vibrate";
  import { Color } from "tns-core-modules/color";
  import { isIOS, screen } from "tns-core-modules/platform";

  declare const SCNTransaction: any;

  let vibrator;
  let audioPlayer;

  const width = screen.mainScreen.widthDIPs;
  const height = screen.mainScreen.heightDIPs;
  const centerX = width / 2;
  const centerY = height / 2;
  console.log(`::::: screen = ${width} x ${height}`);

  const materialPrefix = isIOS ? "Orbitals.scnassets/" : "";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAY_MS = 24 * 60 * 60 * 1000;

  // if this is set to 1 (which is more realistic), you'd have a hard time seeing all planets
  const SCALE_FACTOR = 5;

  const SUN_DEFAULT_SCALE = .9;
  const ONE_AU = 0.75; // 1 AU (Astronomical Unit), which is ~150 million km (the distance from the Earth to the Sun)
  const EARTH_TO_MOON_METERS = 0.15;
  const EARTH_ORBIT_SPEED = 30.5;

  const GAME_OBJECTS = ["Mars", "Earth", "Neptune", "Saturn", "Venus", "Earth's moon", "Mercury", "Jupiter", "Uranus"];

  // Saturn now officially has 82 moons, so let's add some ;)
  const NR_OF_SATURN_MOONS = isIOS ? 82 : 20; // not sure how performance is affected on Android, so using a safer number
  const saturnMoonColors = ["red", "yellow", "blue", "green", "purple", "orange", "pink", "gray", "brown", "black"];
  const saturnMoonNColors = [];
  saturnMoonColors.forEach(s => saturnMoonNColors.push(new Color(s)));
  const saturnMoons = [];
  for (let i = 0; i < NR_OF_SATURN_MOONS; i++) {
    saturnMoons.push({
      distance: 0.35 + (Math.random() / 5),
      orbitSpeed: -1000 * Math.random(),
      scale: (Math.random() / 50) * SCALE_FACTOR,
      tilt: i * 17,
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
      distance: 0.4 * ONE_AU,
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
      distance: 0.7 * ONE_AU,
      orbitSpeed: 35,
      materials: [{
        diffuse: materialPrefix + "Venus_Atmosphere_Mat_baseColor.png",
        roughness: materialPrefix + "Venus_Atmosphere_Mat_occlusionRoughnessMetallic.png"
      }],
      scale: 0.0475 * SCALE_FACTOR,
      tilt: 2.64
    }, {
      name: "Earth",
      distance: ONE_AU,
      orbitSpeed: EARTH_ORBIT_SPEED,
      scale: 0.05 * SCALE_FACTOR,
      tilt: 23.4,
      materials: [{
        diffuse: materialPrefix + "Earth_Mat_baseColor.png",
        normal: materialPrefix + "Earth_Mat_normal.png",
        roughness: materialPrefix + "Earth_Mat_occlusionRoughnessMetallic.png"
      }],
      children: [{
        name: "Earth's moon",
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
      distance: 1.5 * ONE_AU,
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
      distance: 3 * ONE_AU, // IRL this is 5 AU
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
      distance: 6 * ONE_AU, // IRL this is 10 AU
      orbitSpeed: 9,
      materials: [{
        diffuse: materialPrefix + "SaturnPlanet_Opaque_Mat_baseColor.png"
      }],
      scale: 0.1325 * SCALE_FACTOR,
      tilt: 26.73,
      children: saturnMoons
    }, {
      name: "Uranus",
      distance: 9 * ONE_AU, // IRL this is 20 AU
      orbitSpeed: 7,
      materials: [{
        diffuse: materialPrefix + "UranusGlobe_Mat_baseColor.png"
      }],
      scale: 0.1 * SCALE_FACTOR,
      tilt: 82.23
    }, {
      name: "Neptune",
      distance: 12 * ONE_AU, // IRL this is 30 AU
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
        arLabel: 'Find a surface and tap it',
        planeMaterial: new Color("white"),
        solarSystemLoaded: false,
        orbitalName: undefined,
        simulatedDate: new Date(),
        simulatedDateFormatted: undefined,
        gameEnabled: false,
        game: {
          objectsToFind: [],
          interval: undefined,
          startTime: undefined,
          objectToFind: undefined,
          elapsedTimeFormatted: "Play Game",
          objectPositionOffscreenIndicator: {
            x: -1000,
            y: -1000
          },
          arrow: undefined
        },
        orbitSpeed: -15,
        rotationSpeed: -15,
        sunSize: 50,
        hasControlPanel: false,
        page: undefined,
        ar: undefined,
        orbitals: [],
        rotators: [],
        center: {
          x: centerX,
          y: centerY,
          yCompensation: isIOS ? 104 : 180
        }
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

      gameArrowLoaded(event): void {
        this.game.arrow = event.object;
      },

      enableNativeAnimationsWithDurationOfSeconds(sec) {
        // TODO add animations (like this) to the plugin (this is a global setting, so only enabling it briefly
        if (isIOS) {
          SCNTransaction.animationDuration = sec;
        }
      },

      disableNativeAnimations() {
        if (isIOS) {
          SCNTransaction.animationDuration = 0;
        }
      },

      updateSimulatedDate(speed) {
        const d = new Date(this.simulatedDate.getTime() + ((speed / 2.3) * DAY_MS));
        this.simulatedDate = d;
        this.simulatedDateFormatted = MONTHS[d.getMonth()] + " " + d.getFullYear()
      },

      updateElapsedGameTime() {
        this.game.elapsedTimeFormatted = `${this.getElapsedGameTime()} sec`;
      },

      getElapsedGameTime() {
        return Math.round((new Date().getTime() - this.game.startTime) / 1000);
      },

      findNextGameObject() {
        const nextObject = this.game.objectsToFind.length === 0 ? undefined : this.game.objectsToFind.pop();
        if (nextObject) {
          this.arLabel = `Try to find ${nextObject}`;
          this.game.objectToFind = nextObject;
          new Toasty({
            text: `Try to find ${nextObject}`
          }).setToastPosition(ToastPosition.CENTER).show();
        } else {
          this.giveFeedback();
          this.arLabel = `FINISHED in ${this.getElapsedGameTime()} seconds 🎉`;
          this.gameEnabled = false;
          new Toasty({
            text: `${this.getElapsedGameTime()} seconds 💪`
          }).setToastPosition(ToastPosition.CENTER).show();
        }
      },

      getVibrator() {
        if (!vibrator) {
          vibrator = new Vibrate();
        }
        return vibrator;
      },

      getAudioPlayer() {
        if (!audioPlayer) {
          audioPlayer = new TNSPlayer();
          audioPlayer.initFromFile({
            audioFile: '~/assets/audio/success.mp3',
            loop: false
          });
        }
        return audioPlayer;
      },

      giveFeedback() {
        this.getVibrator().vibrate();
        this.getAudioPlayer().play();
      },

      arLoaded(arLoadedEventData) {
        this.ar = arLoadedEventData.object;
      },

      loadSolarSystem(arPlaneTappedEventData) {
        // we only need one solar system in our lives, right?
        if (this.solarSystemLoaded) {
          return;
        }
        this.solarSystemLoaded = true;

        const ar: AR = arPlaneTappedEventData.object;

        // "Alpha Centauri" ;)
        /*
        ar.addSphere({
          scale: SUN_DEFAULT_SCALE * 2,
          radius: 0.28,
          materials: [new Color("blue")],
          position: {
            x: arPlaneTappedEventData.position.x + 10,
            y: arPlaneTappedEventData.position.y + 10,
            z: arPlaneTappedEventData.position.z + -100
          },
        });
        */

        ar.addNode({
          position: {
            x: arPlaneTappedEventData.position.x,
            y: arPlaneTappedEventData.position.y + 1.3, // a bit above the plane we tapped (in meters)
            z: arPlaneTappedEventData.position.z
          }
        }).then(solarSystemNode => {
          this.renderSolarSystemObject(ar, solarSystemDefinition, solarSystemNode);
          this.arLabel = "Now tap the sun for controls..";

          // disabling plane detection and hide already discovered planes
          ar.togglePlaneVisibility(false);
          ar.setPlaneDetection("NONE");
          ar.setDebugLevel("NONE");
        })
      },

      isInFocusRange(x, y): boolean {
        return Math.abs(x - centerX) < 20 &&
            Math.abs(y - centerY) < 20;
      },

      growShrinkNode(objectNode): void {
        const scaleChange = .3;
        this.enableNativeAnimationsWithDurationOfSeconds(.3);
        objectNode.scaleBy(scaleChange);
        setTimeout(() => {
          objectNode.scaleBy(-scaleChange);
          setTimeout(() => this.disableNativeAnimations(), .35);
        }, 300);
      },

      renderSolarSystemObject(ar, solarSystemObject, parentNode) {
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
              segmentCount: Math.min(80, Math.round(150 * solarSystemObject.scale)), // we want fewer segments for small objects (note: on iOS, the default is 48)
              materials: solarSystemObject.materials,
              position: solarSystemObject.position,
              onTap: () => {
                if (!solarSystemObject.name) {
                  return;
                }

                if (this.gameEnabled) {
                  new Toasty({
                    text: `${solarSystemObject.name} tapped`
                  }).setToastPosition(ToastPosition.BOTTOM).show();
                } else {
                  this.arLabel = `${solarSystemObject.name} tapped`;
                }

                // a bit of visual feedback
                if (solarSystemObject.name !== "Sun" || this.hasControlPanel) {
                  this.growShrinkNode(objectNode);
                }

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
                          view.lookAtWorldPosition({
                            x: c.x,
                            y: p.y, // use the y of the view itself, otherwise it would tilt (look down at the camera) which is a bit weird
                            z: c.z
                          });
                        } catch (e) {
                          console.error(e);
                        }
                      }, 1000 / fps / 4); // every fourth frame should suffice
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

              // if a planet is near the center of the screen, we assume the user is 👀 at it
              if (solarSystemObject.name && solarSystemObject.name !== "Sun") {
                let shouldFindNext = true;

                setInterval(() => {
                  if (this.gameEnabled && solarSystemObject.name === this.game.objectToFind) {
                    const positionOnScreen = objectNode.getPositionOnScreen();
                    const inRange = this.isInFocusRange(positionOnScreen.x, positionOnScreen.y);
                    if (inRange) {
                      if (shouldFindNext) {
                        this.growShrinkNode(objectNode);
                        this.arLabel = `You found ${solarSystemObject.name} 🥳`;
                        this.giveFeedback();
                        shouldFindNext = false;
                        setTimeout(() => {
                          this.findNextGameObject();
                          shouldFindNext = true;
                        }, 1600);
                      }
                    } else {
                      const distL = objectNode.getDistanceTo({x: 0, y: height / 2, z: 0});
                      const distR = objectNode.getDistanceTo({x: width, y: height / 2, z: 0});
                      const distT = objectNode.getDistanceTo({x: 0, y: 0, z: 0});
                      const distB = objectNode.getDistanceTo({x: 0, y: height, z: 0});
                      const isOnLeftSide = distL < distR;
                      const isOnTopSide = distT < distB;

                      if (positionOnScreen.x < 0 || positionOnScreen.x > width) {
                        this.game.objectPositionOffscreenIndicator.x = isOnLeftSide ? 0 : width;
                      } else if (positionOnScreen.y < 0 || positionOnScreen.y > height) {
                        this.game.objectPositionOffscreenIndicator.x = positionOnScreen.x;
                      } else {
                        this.game.objectPositionOffscreenIndicator.x = -1000; // place off screen
                      }

                      if (positionOnScreen.y < 0 || positionOnScreen.y > height) {
                        this.game.objectPositionOffscreenIndicator.y = isOnTopSide ? 0 : height;
                      } else if (positionOnScreen.x < 0 || positionOnScreen.x > width) {
                        this.game.objectPositionOffscreenIndicator.y = positionOnScreen.y;
                      } else {
                        this.game.objectPositionOffscreenIndicator.y = -1000; // place off screen
                      }

                      if (this.game.objectPositionOffscreenIndicator.x >= 0 && this.game.objectPositionOffscreenIndicator.y >= 0) {
                        let arrowRotation = Math.atan2(this.game.objectPositionOffscreenIndicator.y - (height / 2), this.game.objectPositionOffscreenIndicator.x - (width / 2));
                        arrowRotation = arrowRotation * 180 / Math.PI;
                        this.game.arrow.style.transform = `rotate(${arrowRotation})`;

                        // make sure the arrow is shown
                        if (this.game.objectPositionOffscreenIndicator.x === width) {
                          this.game.objectPositionOffscreenIndicator.x -= 32;
                        }
                        if (this.game.objectPositionOffscreenIndicator.y > 0) {
                          this.game.objectPositionOffscreenIndicator.y -= 114;
                        }
                      }
                    }
                  }
                }, 1000 / fps / 4); // every fourth frame
              }

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
                let cloudDegreesPerSecond = 12;
                ar.addSphere({
                  position: {x: -.0001, y: 0, z: 0},
                  parentNode,
                  radius: radius + (isIOS ? 0.015 : 0.05), // TODO this platform difference is not so nice
                  materials: [{
                    diffuse: materialPrefix + "Earth_Clouds_mat_baseColor.png"
                  }],
                  onTap: () => {
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
                ar.addTube({
                  parentNode,
                  innerRadius: 0.1,
                  outerRadius: 1,
                  height: 0.01,
                  materials: [{
                    diffuse: materialPrefix + "saturn_loop.png",
                    transparency: 0.5
                  }]
                }).catch(console.error);

              } else if (solarSystemObject.name === "Sun") {
                let lastSunSize = this.sunSize;
                setInterval(() => {
                  if (lastSunSize !== this.sunSize) {
                    // let's animate this scaleTo this way, until we're able to pass in an animate object
                    this.enableNativeAnimationsWithDurationOfSeconds(.3);
                    setTimeout(() => this.disableNativeAnimations(), 350);
                    lastSunSize = this.sunSize;
                    parentNode.scaleTo(0.016 * this.sunSize);
                  }
                }, 500);
              }
            }).catch(e => console.error("error adding sphere: " + e));

            if (solarSystemObject.children) {
              solarSystemObject.children.forEach(child => {
                this.renderSolarSystemObject(ar, child, objectNode);
              });
            }
          }).catch(e => console.error(e))
        }).catch(e => console.error(e))
      }
    },
    watch: {
      // when the Switch itself is toggled there's no event (on iOS)
      gameEnabled: function (enabled) {
        if (enabled) {

          new Toasty({
            text: `Hang on, shuffling...`
          }).setToastPosition(ToastPosition.CENTER).show();

          setTimeout(() => {
            this.orbitSpeed = 100;
            setTimeout(() => {
              this.orbitSpeed = 0.13;

              new Toasty({
                text: `All set. Let's go 🚀`
              }).setToastPosition(ToastPosition.CENTER).show();

              this.game.objectsToFind.push(...GAME_OBJECTS);
              this.game.objectsToFind.sort(() => Math.random() - 0.5);

              setTimeout(() => {
                this.game.startTime = new Date().getTime();
                this.game.interval = setInterval(() => this.updateElapsedGameTime(), 1000);
                this.findNextGameObject();
                this.updateElapsedGameTime();
              }, 1200);

            }, 2000);
          }, 700);

        } else {
          if (this.game.interval) {
            clearInterval(this.game.interval);
            this.game.interval = undefined;
            this.game.elapsedTimeFormatted = undefined;
            this.game.objectsToFind = [];
          }
        }
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .ar-info {
    padding: 14 16;
    color: black;
    background-color: white;
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
