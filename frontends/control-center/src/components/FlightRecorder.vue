<template>
    <div class="flight-recorder">
        <button v-if="isRecording" v-on:click="stopRecording()">Stop</button>
        <button v-else v-on:click="startRecording()">Record</button>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {DroneController} from './DroneController';

  @Component
  export default class FlightRecorder extends Vue {
    private droneController: DroneController;
    private isRecording = false;

    constructor() {
      super();
      this.droneController = new DroneController();
    }

    private startRecording() {
      console.log('start recording');
      this.isRecording = true;
      this.droneController.startRecording();
    }

    private stopRecording() {
      console.log('stop recording');
      this.isRecording = false;
      this.droneController.stopRecording();
    }
  }
</script>

<style scoped>

</style>