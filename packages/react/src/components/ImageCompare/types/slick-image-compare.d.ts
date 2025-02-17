declare module 'slick-image-compare' {

  interface SlickImageCompareOptions {
    combineDataset?: boolean,
    autoInit?: boolean,
    startPos?: number,
    beforeImage?: null | string | HTMLImageElement,
    afterImage?: null | string | HTMLImageElement,
    horizontal?: boolean,
    ltr?: boolean,
    smooth?: boolean,
    smoothAmount?: string | number,
    animateOnClick?: boolean,
    followMouse?: boolean,
    onlyHandleDraggable?: boolean,
    clickable?: boolean,
    snapToStart?: boolean,
    snapToStartDelay?: number,
    snapToStartDuration?: number,
    snapToStartEasing?: (value: number) => number,
    handleMinDistance?: number,
    handleAngle?: number,
    animateIn?: boolean,
    animateInDuration?: number,
    animateInEasing?: (value: number) => number,
    animateInDelay?: number,
    animateInStartPos?: number,
    animateDuration?: number,
    animateEasing?: (value: number) => number,
    beforeLabel?: string,
    afterLabel?: string,
    // Define other options you expect to be passed
  }

  class SlickImageCompare {
    constructor(element: string | HTMLDivElement | null, options?: SlickImageCompareOptions);
    addEventListener(eventName: string, listener: (evt: CustomEvent) => void): this;
    animateTo(position: number): void;

    defaults: SlickImageCompareOptions = {
    };

    options = { ...defaults };

    init: (options: SlickImageCompareOptions) => void;

    destroy: () => void;

    error: boolean | undefined = undefined;

    _snapTimeout: number;
  }

  export default SlickImageCompare;
}
