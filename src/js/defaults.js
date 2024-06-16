import { easing } from '@/js/easing';

export const defaults = {
  autoInit: true,

  startPos: 50, // % from left

  beforeImage: null,
  afterImage: null,

  horizontal: true, // true is the default, if false vertical
  ltr: true,

  smooth: true,
  smoothAmount: 250,
  animateOnClick: true,

  followMouse: false, // mouse move interaction (desktop only)

  onlyHandleDraggable: false,
  clickable: false, // only works if onlyHandleDraggable is set to true

  snapToStart: false, // after mouse out or drag stop handle jumps to start position
  snapToStartDelay: 1000,
  snapToStartDuration: 1250, // ms TODO: implement
  snapToStartEasing: easing.Elastic.easeOut, // TODO: implement

  handleMinDistance: 0, // min distance to left and right border in px TODO: also %

  handleAngle: 0, // angle of the parting line

  // animate in
  animateIn: false,
  animateInDuration: 1250, // ms
  animateInEasing: easing.Elastic.easeOut,
  animateInDelay: 100, // in ms
  animateInStartPos: 40, // % from left

  animateDuration: 250, // ms
  animateEasing: easing.Cubic.easeOut,

  // showLabels: false,
  beforeLabel: '', // before Image
  afterLabel: '', // after Image
};
