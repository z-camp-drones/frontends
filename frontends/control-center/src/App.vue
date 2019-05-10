<template>
    <div id="app">
        <BasicDroneControl></BasicDroneControl>
        <AdvancedDroneControl></AdvancedDroneControl>
        <ReplayControl></ReplayControl>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import wrap from '@vue/web-component-wrapper';
  import BasicDroneControl from './components/BasicDroneControl.vue';
  import AdvancedDroneControl from './components/AdvancedDroneControl.vue';
  import ReplayControl from './components/ReplayControl.vue';

  @Component({
    components: {
      ReplayControl,
      BasicDroneControl,
      AdvancedDroneControl,
    },
  })
  export default class App extends Vue {
  }

  const BasicDroneControlCustomElement = wrap(Vue, BasicDroneControl);
  window.customElements.define('basic-drone-control', BasicDroneControlCustomElement);

  const AdvancedDroneControlCustomElement = wrap(Vue, AdvancedDroneControl);
  window.customElements.define('advanced-drone-control', AdvancedDroneControlCustomElement);

  const ReplayControlCustomElement = wrap(Vue, ReplayControl);
  window.customElements.define('replay-control', ReplayControlCustomElement);
</script>

<style></style>
