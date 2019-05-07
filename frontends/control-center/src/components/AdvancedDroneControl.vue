<template>
	<div class="basic-drone-control">
		<div class="control-circle">
            <font-awesome-icon class="navigation flight-up" icon="angle-double-up" v-bind:class="{ active: controls['87'] }"/>
			<div class="middle-row">
				<font-awesome-icon class="turn-right" icon="undo" v-bind:class="{ active: controls['65'] }"/>
				<font-awesome-icon class="turn-left" icon="redo" v-bind:class="{ active: controls['68'] }"/>
			</div>
            <font-awesome-icon class="navigation flight-up" icon="angle-double-down" v-bind:class="{ active: controls['83'] }"/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ALL_ALLOWED_ADVANCED_KEYS, ALL_ADVANCED_MOVEMENTS, TAKEOFF_LAND, EMERGENCY } from "./keys";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo, faUndo, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DroneController } from "./DroneController";

interface KeyControls {
	[key: number]: boolean;
}

library.add(faRedo);
library.add(faUndo);
library.add(faAngleDoubleDown);
library.add(faAngleDoubleUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class AdvancedDroneControl extends Vue {
	private controls: KeyControls = {
		65: false,
		68: false,
		83: false,
		87: false
    };
    private droneController: DroneController;
    
    constructor() {
        super();
        this.droneController = new DroneController();
    }

	public created() {
		window.addEventListener("keydown", this.handleKeyDownEvent);
		window.addEventListener("keyup", this.handleKeyUpEvent);
	}

	public beforeDestroy() {
		window.removeEventListener("keydown", this.handleKeyDownEvent);
		window.removeEventListener("keyup", this.handleKeyUpEvent);
	}

	private handleKeyDownEvent(event: KeyboardEvent) {
		if (ALL_ALLOWED_ADVANCED_KEYS.includes(event.key)) {
            this.setControlState(event.keyCode, true);
            this.sendMovementCommand(event.keyCode, 100);
		}
	}

	private handleKeyUpEvent(event: KeyboardEvent) {
		if (ALL_ALLOWED_ADVANCED_KEYS.includes(event.key)) {
            this.setControlState(event.keyCode, false);
            this.sendMovementCommand(event.keyCode, 0);
		} else if (TAKEOFF_LAND.keyCode === event.keyCode) {
            this.droneController.sendTakeOffOrLandCommand();
        } else if (EMERGENCY.keyCode === event.keyCode) {
			this.droneController.sendEmergencyCommand();
		}
    }
    
    private setControlState(keyCode: number, active: boolean) {
        this.controls[keyCode] = active;
    }

    private sendMovementCommand(keyCode: number, value: number) {
        const movement = ALL_ADVANCED_MOVEMENTS.find(mov => mov.keyCode === keyCode);
        if (movement) {
            this.droneController.sendMovementCommand(movement, value);
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
	background-color: rgba(214, 214, 214, 0.4);
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border-color: #a8a4a4;
	border-width: 1px;
}

.navigation {
	display: inline-block;
	position: relative;
	width: 25px;
    height: 25px;
    color: #a8a4a4;
}

.navigation.active {
    color: #f67373;
}

.flight-up {
	margin-left: auto;
	margin-right: auto;
	top: 5px;
}

.flight-down {
	margin-left: auto;
	margin-right: auto;
	top: 9px;
	clip-path: polygon(100% 0, 0 0, 50% 100%);
}

.middle-row {
	display: flex;
	justify-content: space-between;
	padding: 8px 5px 8px 5px;
}

.turn-right,
.turn-left {
	width: 20px;
    height: 20px;
    color: #a8a4a4;
}

.turn-right.active, .turn-left.active {
    color: #f67373;
}
</style>
