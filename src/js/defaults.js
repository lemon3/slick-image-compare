import easing from '@/js/easing';

export const defaults = {
  autoInit: true,

  horizontal: true, // true is the default, if false vertical

  beforeImage: null,
  afterImage: null,

  followMouse: false, // mouse move interaction (desktop only)
  onlyHandleDraggable: false,
  clickable: false, // only works if onlyHandleDraggable is set to true
  snapToStart: false, // after mouse out or drag stop handle jumps to start position
  snapToStartDelay: 250,
  // snapToStartDelayTap: 10, // todo

  ltr: true,

  handleMinDistance: 0, // min distance to left and right border in px
  dragElementClass: 'beforeafter-handle',
  dragCallback: null, // todo

  // animateIn: true,
  animateInDuration: 1250, // ms
  animateInEasing: easing.Elastic.easeOut,
  animateInDelay: 100, // in ms
  animateStartPos: 40, // % from left
  startPos: 50, // % from left

  // clickAnimate: true,
  animateDuration: 250, // ms
  animateEasing: easing.Cubic.easeOut,

  // showLabels: false,
  beforeLabel: '', // before Image
  afterLabel: '', // after Image

  beforeDescription: '', // before Image
  afterDescription: '', // after Image

  showToggleButton: false,
  toggleBeforeText: 'show before',
  toggleAfterText: 'show after',
};
