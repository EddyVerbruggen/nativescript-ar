import { Observable, Page, isIOS } from "@nativescript/core";
import { HelloWorldModel } from './main-view-model';

const flashlight = require("nativescript-flashlight");

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: Observable.EventData) {
  // Get the event sender
  const page = <Page>args.object;
  let model = new HelloWorldModel();
  model.screenshot = page.getViewById("screenshot");
  page.bindingContext = model;
  model.page = page;

  if (isIOS) {
    const flashlightSwitch = page.getViewById("flashlightSwitch");
    flashlightSwitch.on("checkedChange", (args: any) => {
      args.value ? flashlight.on() : flashlight.off();
    });
  }
}
