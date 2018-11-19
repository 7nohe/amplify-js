import { Component, OnInit, Input } from '@angular/core';
import { SumerianSceneComponentCore } from './sumerian-scene.component.core';
import { AmplifyService } from '../../../providers';
import * as AmplifyUI from '@aws-amplify/ui';

const template = `
<div id="sumerian-scene-container" [ngClass]="amplifyUI.sumerianSceneContainer">
  <div id='sumerian-scene-dom-id' [class]="amplifyUI.sumerianScene">
    <sumerian-scene-loading-ionic *ngIf="loading" loadPercentage={{loadPercentage}} sceneName={{sceneName}}></sumerian-scene-loading-ionic>
  </div>
  <div *ngIf="!loading" class={{amplifyUI.sceneBar}}>
    <span class={{amplifyUI.sceneActions}}>
      <div [ngClass]="[amplifyUI.tooltip, showEnableAudio ? amplifyUI.autoShowTooltip : '']" [attr.data-text]="showEnableAudio ? 'The scene is muted. Click to unmute.' : (muted ? 'Unmute' : 'Mute')" (click)="muted ? setMuted(false) : setMuted(true)">
        <button class={{amplifyUI.actionButton}}>
          <svg *ngIf="muted" width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icons/minis/volumeOff" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M3.48026899,12.9630494 C3.63825091,12.9630494 3.79237961,13.0108921 3.92264322,13.1003479 L8.77467683,16.8113609 C9.29423971,17.1679383 10,16.7950396 10,16.1637406 L10,3.78619489 C10,3.15489596 9.29423971,2.78199725 8.77467683,3.13857463 L3.92264322,6.84545211 C3.79237961,6.93490793 3.63825091,6.9827506 3.48026899,6.9827506 L1.78294894,6.9827506 C1.3505185,6.9827506 1,7.33409518 1,7.76754476 L1,12.1781306 C1,12.6117048 1.3505185,12.9630494 1.78294894,12.9630494 L3.48026899,12.9630494 Z M17.2118156,7 L15.0918385,9.11997713 L12.9718614,7 L12,7.97174685 L14.1200917,10.091724 L12,12.2118156 L12.9718614,13.1835625 L15.0918385,11.0635854 L17.2118156,13.1835625 L18.1835625,12.2118156 L16.0635854,10.091724 L18.1835625,7.97174685 L17.2118156,7 Z" id="Fill-2" fill="#FFFFFF"></path>
            </g>
          </svg>
          <svg *ngIf="!muted" width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icons/minis/volumeOn" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M3.48026899,12.9630494 L1.78294894,12.9630494 C1.3505185,12.9630494 1,12.6117048 1,12.1781306 L1,7.76754476 C1,7.33409518 1.3505185,6.9827506 1.78294894,6.9827506 L3.48026899,6.9827506 C3.63825091,6.9827506 3.79237961,6.93490793 3.92264322,6.84545211 L8.77467683,3.13857463 C9.29423971,2.78199725 10,3.15489596 10,3.78619489 L10,16.1637406 C10,16.7950396 9.29423971,17.1679383 8.77467683,16.8113609 L3.92264322,13.1003479 C3.79237961,13.0108921 3.63825091,12.9630494 3.48026899,12.9630494 Z M14.9270376,3.03232286 C15.1729267,3.03232286 15.4040399,3.12815658 15.5777627,3.3022351 C17.3699891,5.09889099 18.3570052,7.48235058 18.3570052,10.0135053 C18.3570052,12.54466 17.3699891,14.9281196 15.5777627,16.7247755 C15.4041045,16.898854 15.1729914,16.9947524 14.9270052,16.9947524 C14.6820861,16.9947524 14.4515549,16.899436 14.2777674,16.7263598 C13.9192316,16.3684383 13.9185203,15.7852882 14.2762477,15.4264291 C15.7222893,13.9769926 16.5186727,12.0545954 16.5186727,10.0135053 C16.5186727,7.97241524 15.7222893,6.05001801 14.2762154,4.60058152 C13.9184879,4.24175473 13.9191992,3.65857229 14.277832,3.30065081 C14.4514256,3.1275746 14.6819567,3.03232286 14.9270376,3.03232286 Z M13.5730665,6.11570485 C14.6133991,7.15574642 15.1862998,8.54003279 15.1862998,10.0134924 C15.1862998,11.4892799 14.6113945,12.8741159 13.5675376,13.9128965 C13.3942351,14.0855848 13.1639626,14.1806425 12.9191727,14.1806425 C12.6727016,14.1806425 12.4412975,14.0844531 12.2677039,13.9097926 C12.0944984,13.7358111 11.9994406,13.5047303 11.9999903,13.2592291 C12.0005723,13.0136956 12.096794,12.7831644 12.2708079,12.6100882 C12.9654406,11.9185917 13.3479995,10.996467 13.3479995,10.0134924 C13.3479995,9.03119677 12.966346,8.1086194 12.2733298,7.4157649 C11.9150203,7.05745543 11.9149233,6.47436998 12.2731358,6.11589885 C12.4467617,5.94224065 12.6775838,5.84666559 12.923085,5.84666559 C13.1685538,5.84666559 13.3993436,5.94220831 13.5730665,6.11570485 Z" id="Fill-2" fill="#FFFFFF"></path>
            </g>
          </svg>
        </button>
      </div>
      <div *ngIf="isVRCapable" class={{amplifyUI.tooltip}} data-text="Enter VR" (click)="enterVR()">
        <button class={{amplifyUI.actionButton}}>
        <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="icons/minis/VRon-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group-7-Copy" transform="translate(1.000000, 3.000000)" fill="#FFFFFF">
              <path d="M15.7856977,3.02395184 L17,3.02395184 L17,4.13237842 L17,4.54663675 L17,11.8915038 C17,12.5034193 16.4560011,13 15.7856977,13 L12.0095825,13 C9.98324439,10.1593807 8.80676009,8.741338 8.48012959,8.74587199 C8.16206045,8.75028714 7.01003321,10.1683298 5.02404785,13 L1.21426911,13 C0.543965735,13 3.32031236e-05,12.5034193 3.32031236e-05,11.8915038 L3.32031236e-05,4.54663675 L3.32031236e-05,4.13237842 L3.32031236e-05,3.02395184 L1.21426911,3.02395184 L15.7856977,3.02395184 Z M4.5,9 C5.32842712,9 6,8.32842712 6,7.5 C6,6.67157288 5.32842712,6 4.5,6 C3.67157288,6 3,6.67157288 3,7.5 C3,8.32842712 3.67157288,9 4.5,9 Z M12.5,9 C13.3284271,9 14,8.32842712 14,7.5 C14,6.67157288 13.3284271,6 12.5,6 C11.6715729,6 11,6.67157288 11,7.5 C11,8.32842712 11.6715729,9 12.5,9 Z M2.5486669,0 L14.420089,0 C14.7977406,0 15.1613805,0.149260956 15.4374308,0.417695511 L16.9999668,2.00634766 L0,2.00634766 L1.58537972,0.395493117 C1.84682061,0.141306827 2.19106994,0 2.5486669,0 Z" id="Fill-1"></path>
            </g>
          </g>
        </svg>
        </button>
      </div>
      <div *ngIf="!isFullscreen" class={{amplifyUI.tooltip}} data-text="Fullscreen">
        <button class={{amplifyUI.actionButton}} (click)="maximize()">
          <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icons/minis/screenfull" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M2.04162598,3 L2.04162598,16 L17.0147705,16 L17.0147705,3 L2.04162598,3 Z M1,2 L18,2 L18,17 L1,17 L1,2 Z M3,4 L16,4 L16,15 L3,15 L3,4 Z" id="Rectangle-Copy" fill="#FFFFFF" fill-rule="nonzero"></path>
            </g>
          </svg>
        </button>
      </div>
      <div *ngIf="isFullscreen" class={{amplifyUI.tooltip}} data-text="Exit Fullscreen">
        <button class={{amplifyUI.actionButton}} (click)="minimize()">
          <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icons/minis/screensmall" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M11,16 L17.0147705,16 L17.0147705,3 L2.04162598,3 L2.04162598,10 L11,10 L11,16 Z M1,2 L18,2 L18,17 L1,17 L1,2 Z" id="Rectangle" fill="#FFFFFF" fill-rule="nonzero"></path>
            </g>
          </svg>
        </button>
      </div>
    </span>
  </div>
</div>
`;

@Component({
  selector: 'sumerian-scene-ionic',
  template,
  styleUrls: ['../../../../node_modules/@aws-amplify/ui/dist/style.css']
})
export class SumerianSceneComponentIonic extends SumerianSceneComponentCore {
  amplifyUI: AmplifyUI;
  amplifyService: AmplifyService;

  constructor(amplifyService: AmplifyService) {
    super(amplifyService);
  }
}