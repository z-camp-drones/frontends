<template>
    <div class="basic-drone-control">
        <div class="control-circle">
            <div></div>
            <div class="middle-row">
                <font-awesome-icon
                        v-if="!playing"
                        v-on:click="play()"
                        class="navigation"
                        icon="play"
                />
                <font-awesome-icon
                        v-if="playing"
                        v-on:click="stop()"
                        class="navigation"
                        icon="pause"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {library} from '@fortawesome/fontawesome-svg-core';
  import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
  import {ReplayController} from './ReplayController';


  library.add(faPlay);
  library.add(faPause);
  Vue.component('font-awesome-icon', FontAwesomeIcon);

  @Component
  export default class ReplayControl extends Vue {

    private droneController: ReplayController;
    playing = false;

    constructor() {
      super();
      this.droneController = new ReplayController();
    }

    public play() {

      console.log('Play clicked');
      this.playing = true;
      this.droneController.doFlight()
        .then(() => this.playing = false)
        .catch(() => this.playing = false);
    }

    public stop() {
      console.log('Stop clicked');
      this.playing = false;
      this.droneController.stop();
    }

  }
</script>

<style scoped>
    .basic-drone-control {
        height: 100px;
        width: 100px;
        text-align: center;
    }

    .control-circle {
        background-color: rgba(214, 214, 214, 0.7);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border-color: #6c6c6c;
        border-width: 1px;
    }

    .navigation {
        display: inline-block;
        position: relative;
        width: 25px;
        height: 25px;
        color: #6c6c6c;
    }

    .navigation.active {
        color: #f67373;
    }

    .middle-row {
        text-align: center;
        padding: 35px 5px 8px 5px;
    }
</style>
