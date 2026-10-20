declare module 'slick-image-compare' {
  export class SlickImageCompare {
    /**
     * Creates a new image slider instance
     * @param element The DOM element or selector to attach to
     * @param options Configuration options
     */
    constructor(
      element: string | HTMLDivElement | null,
      options?: SlickImageCompareOptions
    );

    /**
     * Adds an event listener to component
     * This is not stored to the DOM element
     * @param eventName Event name (e.g., 'init', 'update')
     * @param listener The callback function
     */
    addEventListener(
      eventName: string,
      listener: (evt: CustomEvent) => void
    ): this;

    /**
     * Remove event listener from the component
     * This is not stored to the DOM element
     * @param eventName Event name (e.g., 'init', 'update')
     * @param listener The callback function
     */
    removeEventListener(
      eventName?: string,
      listener?: (evt: CustomEvent) => void
    ): this;

    /**
     * Animates the slider to a specific position
     * @param position The position (0 to 100) to animate to
     */
    animateTo(position: number): void;

    /**
     * Re-initializes the slider with new options
     * @param options The new configuration options
     */
    init(options: SlickImageCompareOptions): void;

    /**
     * Destroys the slider instance
     */
    destroy(): void;

    /**
     * The current slider options
     */
    options: SlickImageCompareOptions;

    /**
     * The default options
     */
    readonly defaults: SlickImageCompareOptions = {};

    error: boolean | undefined = undefined;

    _snapTimeout: number;
  }

  export type SlickImageCompareOptions = {
    combineDataset?: boolean;
    autoInit?: boolean;
    startPos?: number;
    beforeImage?: null | string | HTMLImageElement;
    afterImage?: null | string | HTMLImageElement;
    horizontal?: boolean;
    ltr?: boolean;
    smooth?: boolean;
    smoothAmount?: string | number;
    animateOnClick?: boolean;
    followMouse?: boolean;
    onlyHandleDraggable?: boolean;
    clickable?: boolean;
    snapToStart?: boolean;
    snapToStartDelay?: number;
    snapToStartDuration?: number;
    snapToStartEasing?: (value: number) => number;
    handleMinDistance?: number;
    handleAngle?: number;
    animateIn?: boolean;
    animateInDuration?: number;
    animateInEasing?: (value: number) => number;
    animateInDelay?: number;
    animateInStartPos?: number;
    animateDuration?: number;
    animateEasing?: (value: number) => number;
    beforeLabel?: string;
    afterLabel?: string;
    // Define other options you expect to be passed
  };

  export default SlickImageCompare;
}
