export interface SlickImageCompareOptions {
  beforeLabel?: string;
  afterLabel?: string;
  startPos?: number | string;
  horizontal?: boolean;
  ltr?: boolean;
  animateOnClick?: boolean;
  followMouse?: boolean;
  onlyHandleDraggable?: boolean;
  clickable?: boolean;
  snapToStart?: boolean;
  snapToStartDelay?: number;
  snapToStartDuration?: number;
  snapToStartEasing?: string | Function;
  handleAngle?: 0;
  handleMinDistance?: 0;
  animateIn?: boolean;
  animateInDuration?: number;
  animateInEasing?: string | Function;
  animateInDelay?: number;
  animateInStartPos?: number; // % from left
  animateDuration?: number; // ms
  animateEasing?: string | Function;
}

export interface Props extends Temp {
  beforeImage: any;
  afterImage: any;
  [key: string]: any;
}
