import { useEffect, useRef } from 'react';
import SlickImageCompare, {
  type SlickImageCompareOptions,
} from 'slick-image-compare';
import 'slick-image-compare/style';

export interface ImageCompareProps {
  //extends React.ComponentProps<'div'> {
  options?: SlickImageCompareOptions;
  mounted?: (obj: SlickImageCompare) => void;
  onInit?: (evt: CustomEvent) => void;
  onDrag?: (evt: CustomEvent) => void;
  onUpdate?: (evt: CustomEvent) => void;
  onViewchange?: (evt: CustomEvent) => void;
  onBeforeshown?: (evt: CustomEvent) => void;
  onAftershown?: (evt: CustomEvent) => void;
  onInteractionstart?: (evt: CustomEvent) => void;
  onInteractionend?: (evt: CustomEvent) => void;
  useDomEvents?: boolean;
}

const isEqual = (
  obj1: object | null | undefined,
  obj2: object | null | undefined
): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// const ImageCompare = ({ options, init, ...props }: ImageCompareProps) => {
//const ImageCompare: React.FC<ImageCompareProps> = ({
const ImageCompare = ({
  options,
  mounted,
  onInit,
  onDrag,
  onUpdate,
  onViewchange,
  onBeforeshown,
  onAftershown,
  onInteractionstart,
  onInteractionend,
  useDomEvents = false,
  children,
  ...props
}: ImageCompareProps & React.ComponentProps<'div'>) => {
  // all available events
  const events = {
    onInit,
    onDrag,
    onUpdate,
    onViewchange,
    onBeforeshown,
    onAftershown,
    onInteractionstart,
    onInteractionend,
  };

  const el = useRef<HTMLDivElement>(null);
  const isMounted = useRef<boolean>(false); // track if component is mounted
  const sicRef = useRef<SlickImageCompare | null>(null);
  const prevOptions = useRef<SlickImageCompare['options'] | null>(null);
  const eventsSet = useRef<boolean>(false);

  const domEvents = Object.entries(events)
    .filter(([, value]) => typeof value === 'function')
    .map(([eventName, fun]) => [eventName.slice(2).toLowerCase(), fun]);

  const callbacks = Object.fromEntries(domEvents);

  useEffect(() => {
    if (!el.current || isMounted.current) return;
    isMounted.current = true;
    let finalOptions = Array.isArray(options) ? options[0] : options;

    if (!useDomEvents) {
      finalOptions = { ...finalOptions, ...callbacks };
    }
    sicRef.current = new SlickImageCompare(el.current, finalOptions);
    if (mounted && typeof mounted === 'function') mounted(sicRef.current);
    prevOptions.current = { ...finalOptions };
  }, [el, options]);

  useEffect(() => {
    if (el && el.current && useDomEvents && !eventsSet.current) {
      domEvents.forEach(([key, value]) => {
        el.current?.addEventListener(key as string, value as EventListener);
      });
      eventsSet.current = true;
    }

    if (sicRef && !isEqual(prevOptions.current, options)) {
      sicRef.current?.destroy();
      let finalOptions = Array.isArray(options) ? options[0] : options;

      if (!useDomEvents) {
        finalOptions = { ...finalOptions, ...callbacks };
      }
      sicRef.current?.init(finalOptions);
      // store a copy of the options to track changes
      prevOptions.current = { ...options };
    }

    // cleanup listeners
    return () => {
      if (el && el.current) {
        sicRef.current?.removeEventListener();
        if (useDomEvents) {
          domEvents.forEach(([key, value]) => {
            el.current?.removeEventListener(
              key as string,
              value as EventListener
            );
          });
          eventsSet.current = false;
        }
      }
    };
  }, [el, options]);

  return (
    <div
      role='presentation'
      ref={el}
      {...props}
    >
      {children}
    </div>
  );
};

export { ImageCompare, SlickImageCompare };
