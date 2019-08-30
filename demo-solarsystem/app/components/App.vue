<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"></ActionBar>
    <GridLayout columns="*" rows="*">
      <AR
          debugLevel="FEATURE_POINTS"
          detectPlanes="true"
          showStatistics="true"
          @arLoaded="arLoaded"
          @planeTapped="loadSolarSystem">
      </AR>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { AR } from "nativescript-ar";
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

  const renderSolarsystemObject = (ar, solarSystemObject, parentNode) => {
    ar.addNode({
      parentNode: parentNode,

      rotation: {
        x: 0,
        y: 0,
        z: solarSystemObject.tilt
      }
    }).then(orbitNode => {
      console.log("orbitNode added: " + orbitNode);

      orbitals.push({
        node: orbitNode,
        speed: solarSystemObject.orbitSpeed
      });

      ar.addNode({
        position: {
          x: 0,
          y: 0,
          z: -solarSystemObject.distance
        },
        parentNode: orbitNode,

      }).then(objectNode => {
        ar.addModel({
          parentNode: objectNode,
          scale: solarSystemObject.scale,
          name: solarSystemObject.model
        }).then(o => {
          console.log("model added: " + o);
        }).catch(e => {
          console.error("error adding model: " + e);
        });

        if (solarSystemObject.children) {
          solarSystemObject.children.forEach(child => {
            renderSolarsystemObject(ar, child, objectNode);
          });
        }
      }).catch(e => console.error(e))
    }).catch(e => console.error(e))
  };

  const fps = 60;
  const orbitals = [];
  const animator = setInterval(() => {
    orbitals.forEach(orbit => {
      orbit.node.rotateBy({
        x: 0,
        y: orbit.speed / fps,
        z: 0
      });
    });
  }, 1000 / fps);

  export default {
    mounted() {
    },

    data() {
      return {
        msg: 'Hello World!',
        ar: undefined
      }
    },

    methods: {
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
          renderSolarsystemObject(ar, solarSystemDefinition, solarSystemNode)
        })
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
</style>
