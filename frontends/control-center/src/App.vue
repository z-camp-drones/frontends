<template>
    <div id="app">
        <BasicDroneControl></BasicDroneControl>
        <FlightRecorder></FlightRecorder>
        <AdvancedDroneControl></AdvancedDroneControl>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import wrap from '@vue/web-component-wrapper';
  import BasicDroneControl from './components/BasicDroneControl.vue';
  import AdvancedDroneControl from './components/AdvancedDroneControl.vue';
  import FlightRecorder from './components/FlightRecorder.vue';

  @Component({
    components: {
      BasicDroneControl,
      AdvancedDroneControl,
      FlightRecorder,
    },
  })
  export default class App extends Vue {
  }

  const BasicDroneControlCustomElement = wrap(Vue, BasicDroneControl);
  window.customElements.define(
    'basic-drone-control',
    BasicDroneControlCustomElement,
  );

  const AdvancedDroneControlCustomElement = wrap(Vue, AdvancedDroneControl);
  window.customElements.define(
    'advanced-drone-control',
    AdvancedDroneControlCustomElement,
  );

  const FlightRecorderCustomElement = wrap(Vue, FlightRecorder);
  window.customElements.define(
    'flight-recorder',
    FlightRecorderCustomElement,
  );
</script>

<style></style>
