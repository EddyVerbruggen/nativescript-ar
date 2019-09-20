import { Injectable } from '@angular/core';
import { isIOS } from "tns-core-modules/platform";

const prefix = isIOS ? "Models.scnassets/" : "";
const postfix = isIOS ? ".dae" : ".glb";

const models = [
  {
    name: `${prefix}glasses-vv-1${postfix}`,
    position: {
      x: 0.001,
      y: 0.01,
      z: 0
    },
    scale: .8
  },
  {
    name: `${prefix}glasses-vv-2${postfix}`,
    position: {
      x: 0,
      y: 0.037,
      z: 0.035
    },
    scale: 1.13
  },
  {
    name: `${prefix}glasses-vv-3${postfix}`,
    position: {
      x: 0,
      y: 0.02,
      z: -0.02
    },
    scale: 1.11
  },
  {
    name: `${prefix}glasses-vv-4${postfix}`,
    position: {
      x: 0,
      y: 0.02,
      z: -0.02
    },
    scale: 1.11
  },
  {
    name: `${prefix}glasses-vv-5${postfix}`,
    position: {
      x: 0.0005,
      y: 0.023,
      z: -0.02
    },
    scale: 1.15
  },
  {
    name: `${prefix}glasses-vv-6${postfix}`,
    position: {
      x: 0.0005,
      y: 0.021,
      z: -0.03
    },
    scale: 1.15
  }
];

const items = [
  {
    title: 'Dexter',
    description: 'Popular cartoon show inspired frames',
    image: '~/images/glasses-vv-1.png',
    price: 249,
    model: models[0]
  },
  {
    title: 'Catty Bordeaux',
    description: 'Women glasses in stylish bordeaux',
    image: '~/images/glasses-vv-2.png',
    price: 159,
    model: models[1]
  },
  {
    title: 'Springers Wayfarer',
    description: 'Unisex Wayfarer transparent eyeglasses',
    image: '~/images/glasses-vv-3.png',
    price: 210,
    model: models[2]
  },
  {
    title: 'Catty two-color',
    description: 'Womens two-color frame',
    image: '~/images/glasses-vv-4.png',
    price: 239,
    model: models[3]
  },
  {
    title: 'Catty',
    description: 'High quality plastic eyeglasses',
    image: '~/images/glasses-vv-5.png',
    price: 149,
    model: models[4]
  },
  {
    title: 'Goldies',
    description: 'Unisex two-material frames made with style',
    image: '~/images/glasses-vv-6.png',
    price: 190,
    model: models[5]
  }
];

@Injectable({
  providedIn: 'root'
})
export class GlassesService {
  constructor() {
  }

  public getGlasses() {
    return items;
  }
}
