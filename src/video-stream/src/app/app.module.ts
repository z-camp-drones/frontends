import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [
    AppComponent
  ],
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    // Convert `AppComponent` to a custom element.
    const VideoStreamElement = createCustomElement(AppComponent, {injector: this.injector});
    // Register the custom element with the browser.
    customElements.define('video-stream', VideoStreamElement);
  }
}
