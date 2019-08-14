import Vue from 'nativescript-vue';

// @ts-ignore
import App from './components/App.vue';

// Prints Vue logs when --env.production is *NOT* set while building
// @ts-ignore
(<any>Vue).config.silent = (TNS_ENV === 'production');

(<any>Vue).registerElement('AR', () => require('nativescript-ar').AR);

new (<any>Vue)({
  render: h => h('frame', [h(App)])
}).$start();
