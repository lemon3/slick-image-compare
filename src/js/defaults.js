import easing from '@/js/easing';

export const defaults = {
  autoInit: true,

  // silder: true, // show slider true, false

  beforeImage: null,
  afterImage: null,

  followMouse: false, // mouse move interaction instead of drag (on desktop)

  // todo: if onlyHandleDraggable and clickable = true => same as if both are false
  onlyHandleDraggable: false,
  clickable: false, // only works if onlyHandleDraggable is set to true

  // todo: desktop and mobile snap values(!!!)
  snapToStart: false, // after moveout or dragfinish handle jumps to start position
  snapToStartDelay: 250,
  // snapToStartDelayTap: 10, // todo

  afterOnTheRight: false,

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

  // showInfo: false,
  beforeLabel: '', // before Image
  afterLabel: '', // after Image

  beforeDescription: '', // before Image
  afterDescription: '', // after Image

  showToggleButton: false,
  toggleBeforeText: 'show before',
  toggleAfterText: 'show after',
};
