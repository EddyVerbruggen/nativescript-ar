<template>
  <Page @loaded="pageLoaded">
    <ActionBar title="Welcome to NativeScript-Vue!"></ActionBar>
    <GridLayout columns="*" rows="*">

      <!-- because this controlPanel layout is "below" the AR node (z-index-wise) it's not shown to the user -->
      <StackLayout id="controlPanel" class="control-panel">
        <Label text="Orbit Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="orbitSpeed" width="100%" minValue="-10" maxValue="10" horizontalAlignment="center"></Slider>
        <Label text="Rotation Speed:" horizontalAlignment="center"></Label>
        <Slider v-model="rotationSpeed" width="100%" minValue="-10" maxValue="10" horizontalAlignment="center"></Slider>
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
  import { AR, ARCommonNode } from "nativescript-ar";
  import { Color } from "tns-core-modules/color";

  const solarSystemDefinition = {
    name: "Sun",
    distance: 0,
    orbitSpeed: 0,
    model: "Sol.sfb",
    scale: 0.5,
    materials: [new Color("Coral")],
    tilt: 0,
    children: [{
      name: "Mercury",
      distance: 0.4,
      orbitSpeed: 47,
      model: "Mercury.sfb",
      scale: 0.019,
      tilt: 0.03
    }, {
      name: "Venus",
      distance: 0.7,
      orbitSpeed: 35,
      model: "Venus.sfb",
      scale: 0.0475,
      tilt: 2.64
    }, {
      name: "Earth",
      distance: 1.0,
      orbitSpeed: 29,
      model: "Earth.sfb",
      scale: 0.05,
      tilt: 23.4,
      materials: [new Color("Blue")],
      children: [{
        name: "Moon",
        distance: 0.15,
        orbitSpeed: 100,
        model: "Luna.sfb",
        scale: 0.018,
        tilt: 6.68,
        materials: [new Color("Gray")],
      }]
    }, {
      name: "Mars",
      distance: 1.5,
      orbitSpeed: 24,
      model: "Mars.sfb",
      scale: 0.0265,
      tilt: 25.19
    }, {
      name: "Jupiter",
      distance: 2.2,
      orbitSpeed: 13,
      model: "Jupiter.sfb",
      scale: 0.16,
      tilt: 3.13
    }, {
      name: "Saturn",
      distance: 3.5,
      orbitSpeed: 9,
      model: "Saturn.sfb",
      scale: 0.1325,
      tilt: 26.73
    }, {
      name: "Uranus",
      distance: 5.2,
      orbitSpeed: 7,
      model: "Uranus.sfb",
      scale: 0.1,
      tilt: 82.23
    }, {
      name: "Neptune",
      distance: 6.1,
      orbitSpeed: 5,
      model: "Neptune.sfb",
      scale: 0.074,
      tilt: 28.32
    }]
  };

  const fps = 60;

  export default {
    mounted() {
    },

    data() {
      return {
        msg: 'Hello World!',
        arLabel: 'Look for a surface and tap it..',
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
              y: rotationSpeedCompensation * 2 * orbit.speed / fps,
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
          console.log("orbitNode added: " + orbitNode);

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

            ar.addModel({
              parentNode: objectNode,
              scale: solarSystemObject.scale,
              name: solarSystemObject.model,
              onTap: () => {
                console.log("Tapped " + solarSystemObject.model);
                this.arLabel = solarSystemObject.model + " tapped";
                if (solarSystemObject.model === "Sol.sfb") {
                  if (!this.hasControlPanel) {
                    this.hasControlPanel = true;
                    ar.addUIView({
                      position: {x: 0, y: .22, z: 0},
                      parentNode: objectNode,
                      view: this.page.getViewById("controlPanel"),
                      scale: 0.35
                    });
                  }
                }
              }
            }).then(o => {
              console.log("model added: " + o);
            }).catch(e => {
              console.error("error adding model: " + e);
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
    width: 280;
    height: 240;
    padding: 24;
    opacity: 0.8;
    font-size: 24;
    color: white;
    border-radius: 10;
    background-color: cornflowerblue;
  }

  .control-panel Label {
    margin-bottom: 20;
  }
</style>
