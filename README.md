# beforeafter
before after slider
tbd ...

## options
list of the available options:

```js
options = {
  // if the app should automatically initialize
  // possible values: true, false
  // default: true
  autoInit: true,

  // the initial start position in percent (from the left)
  // possible values: 0 - 100
  // default: 50
  startPos: 50,

  // the image src of the first image
  // possible values: all regular image urls
  // default: null
  beforeImage: null,

  // the image src of the first image
  // possible values: all regular image urls
  // default: null
  afterImage: null,

  // defines the orientation of the slider
  // true: horizontal, false: vertical
  // possible values: true, false
  // default: true
  horizontal: true,

  // defines the direction of the slider
  // ltr: true,
  // means the "after" images is shown, when the slider is on
  // the right side (100%)
  // ltr: false,
  // means the "after" images is shown, when the slider is on
  // the left side (0%)
  // possible values: true, false
  // default: true
  ltr: true,

  // if the slider should smoothly follow the interaction
  // possible values: true, false
  // default: false
  smooth: false,

  // the smoothness amount
  // possible values: 100 - 500 (are good values)
  // default: 250
  smoothAmount: 250,

  // animate to the clicked/tapped position
  // if true it animates to, if false it jumps to the position
  // possible values: true, false
  // default: true
  animateOnClick: true,

  // for desktop devices
  // follow the mouse movement instead click-and-drag
  // possible values: true, false
  // default: false
  followMouse: false,

  // possible values: true, false
  // default: false
  onlyHandleDraggable: false,

  // only works if onlyHandleDraggable is set to true
  // possible values: true, false
  // default: false
  clickable: false,

  // if the handle should snap back to the start position
  // after user-interaction ends
  // possible values: true, false
  // default: false
  snapToStart: false,

  // the delay
  // possible values: 0 - 10000 (in ms)
  // default: 1000 (1 sec)
  snapToStartDelay: 1000,
  snapToStartDuration: 1250, // ms
  snapToStartEasing: easing.Elastic.easeOut,

  // min distance to left and right border
  handleMinDistance: 0,

  // animate in
  animateIn: false,
  animateInDuration: 1250, // ms
  animateInEasing: easing.Elastic.easeOut,
  animateInDelay: 100, // in ms
  animateInStartPos: 40, // % from left

  animateDuration: 250, // ms
  animateEasing: easing.Cubic.easeOut,

  beforeLabel: '', // before Image
  afterLabel: '', // after Image
};
```
