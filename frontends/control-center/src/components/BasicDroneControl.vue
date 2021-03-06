<template>
    <div class="basic-drone-control">
        <div class="control-circle">
            <div
                    class="arrow arrow-up"
                    v-bind:class="{ active: controls['38'] }"
            ></div>
            <div class="middle-row">
                <div
                        class="arrow arrow-left"
                        v-bind:class="{ active: controls['37'] }"
                ></div>
                <div
                        class="arrow arrow-right"
                        v-bind:class="{ active: controls['39'] }"
                ></div>
            </div>
            <div
                    class="arrow arrow-down"
                    v-bind:class="{ active: controls['40'] }"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ALL_ALLOWED_BASIC_KEYS, ALL_BASIC_MOVEMENTS, TAKEOFF_LAND} from './keys';
  import {BasicDroneController} from './BasicDroneController';

  interface KeyControls {
    [key: number]: boolean;
  }

  @Component
  export default class BasicDroneControl extends Vue {
    private controls: KeyControls = {
      37: false,
      38: false,
      39: false,
      40: false,
    };
    private droneController: BasicDroneController;

    constructor() {
      super();
      this.droneController = new BasicDroneController();
    }

    public created() {
      window.addEventListener('keydown', this.handleKeyDownEvent);
      window.addEventListener('keyup', this.handleKeyUpEvent);
      document.addEventListener('drone-speed-change-event', this.handleSpeedChangeEvent);
    }

    public beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyDownEvent);
      window.removeEventListener('keyup', this.handleKeyUpEvent);
    }

    private handleKeyDownEvent(event: KeyboardEvent) {
      if (ALL_ALLOWED_BASIC_KEYS.includes(event.key)) {
        if (!event.shiftKey) {
          this.setControlState(event.keyCode, true);
          this.sendMovementCommand(event.keyCode, this.droneController.getCurrentSpeed());
        }
      }
    }

    private handleKeyUpEvent(event: KeyboardEvent) {
      if (ALL_ALLOWED_BASIC_KEYS.includes(event.key)) {
        if (event.shiftKey) {
          this.sendFlipCommand(event.keyCode);
        } else {
          this.setControlState(event.keyCode, false);
          this.sendMovementCommand(event.keyCode, 0);
        }
      }
    }

    private handleSpeedChangeEvent(event: Event) {
      this.droneController.sendSpeedChangeCommand((event as CustomEvent).detail);
    }

    private setControlState(keyCode: number, active: boolean) {
      this.controls[keyCode] = active;
    }

    private sendMovementCommand(keyCode: number, value: number) {
      const movement = ALL_BASIC_MOVEMENTS.find(mov => mov.keyCode === keyCode);
      if (movement) {
        this.droneController.sendMovementCommand(movement, value);
      }
    }

    private sendFlipCommand(keyCode: number) {
      const movement = ALL_BASIC_MOVEMENTS.find(mov => mov.keyCode === keyCode);
      if (movement) {
        this.droneController.sendFlipCommand(movement.flipDirection);
      }
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
        border-color: #a8a4a4;
        border-width: 1px;
    }

    .arrow {
        display: inline-block;
        position: relative;
        opacity: 0.7;
        width: 25px;
        height: 25px;
        background: #6c6c6c;
    }

    .arrow.active {
        background: #f67373;
    }

    .arrow-up {
        margin-left: auto;
        margin-right: auto;
        top: 5px;
        clip-path: polygon(50% 0, 0 100%, 100% 100%);
    }

    .arrow-down {
        margin-left: auto;
        margin-right: auto;
        top: 9px;
        clip-path: polygon(100% 0, 0 0, 50% 100%);
    }

    .middle-row {
        display: flex;
        justify-content: space-between;
        padding: 7px 5px 0 5px;
    }

    .arrow-left {
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    .arrow-right {
        clip-path: polygon(0 0, 100% 50%, 0 100%);
    }
</style>
