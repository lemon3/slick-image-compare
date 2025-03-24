import { useEffect, useRef, useState } from 'react';
import SlickImageCompare from 'slick-image-compare';
import 'slick-image-compare/dist/slick-image-compare.css';

export interface ImageCompareProps extends React.ComponentProps<'div'> {
  options?: object;
  animateTo?: string | number;
  onViewchange?: (evt: CustomEvent) => void;
  onUpdate?: (evt: CustomEvent) => void;
  init?: (obj: SlickImageCompare) => void;
}

const isEqual = (
  obj1: object | null | undefined,
  obj2: object | null | undefined
): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// const ImageCompare = ({ options, init, ...props }: ImageCompareProps) => {
const ImageCompare: React.FC<ImageCompareProps> = ({
  options,
  init,
  ...props
}) => {
  const el = useRef<HTMLDivElement>(null);
  const prevOptionsRef = useRef<SlickImageCompare['options'] | null>(null);
  const sicInit = useRef<boolean>(false);
  const updated = useRef<number>(0);
  const [sic, setSic] = useState<SlickImageCompare | null>(null);

  const inlineEvents = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('on')) acc.push([key, value]);
      return acc;
    },
    [] as [string, () => CustomEvent][]
  );

  const allDom = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (!key.startsWith('on')) acc.push([key, value]);
      return acc;
    },
    [] as [string, string][]
  );

  useEffect(() => {
    if (!sicInit.current) {
      sicInit.current = true;
      const opt = Array.isArray(options) ? options[0] : options;
      if (!el.current) return;
      const obj: SlickImageCompare = new SlickImageCompare(el.current, opt);
      setSic(obj);

      if (init && typeof init === 'function') init(obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (el && el.current) {
      inlineEvents.forEach(([eventName, fun]) => {
        // sic.addEventListener(eventName.substring(2).toLowerCase(), fun);
        el.current?.addEventListener(eventName.substring(2).toLowerCase(), fun);
      });
    }

    if (sic) {
      if (!isEqual(prevOptionsRef.current, options)) {
        if (updated.current > 0) {
          sic.destroy();
          const opt = Array.isArray(options) ? options[0] : options;
          sic.init(opt);

          // Store a COPY of the object to track changes properly
          prevOptionsRef.current = { ...options };
        }
        updated.current += 1;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, sic, options]);

  return (
    <div
      {...Object.fromEntries(allDom)}
      ref={el}
      role='presentation'
    ></div>
  );
};

export { ImageCompare };
