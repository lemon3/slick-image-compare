import { useEffect, useRef, useState } from 'react';
import SlickImageCompare from 'slick-image-compare';
import 'slick-image-compare/dist/slick-image-compare.css'; // Import core package CSS

interface ImageCompareProps extends React.ComponentProps<'div'> {
  options?: object;
  init?: (obj: object) => object;
}

function ImageCompare({ options, init, ...props }: ImageCompareProps) {
  // check props here

  const el = useRef<HTMLDivElement>(null);
  const [sic, setSic] = useState<null | {
    error: boolean;
    addEventListener: (eventName: string, callback: () => void) => void;
  }>(null);

  // const { options, init, ...other } = props
  const inlineEvents = Object.entries(props).filter((prop) => {
    const [key] = prop;
    if ('on' === key.substring(0, 2).toLowerCase()) {
      return prop;
    }
  });
  const allDom = Object.entries(props).filter((prop) => {
    const [key] = prop;
    if ('on' !== key.substring(0, 2).toLowerCase()) {
      return prop;
    }
  });

  const sicInit = useRef(false);

  useEffect(() => {
    if (sicInit.current) return;
    sicInit.current = true;
    const obj = new SlickImageCompare(el.current, options);
    setSic(obj);
  }, [options]);

  useEffect(() => {
    if (!sic || sic.error) return;

    // register inline events
    inlineEvents.forEach((inlineEvent) => {
      const [eventName, fun] = inlineEvent;
      sic.addEventListener(eventName.substring(2).toLocaleLowerCase(), fun);
    });

    if (init && 'function' === typeof init) {
      init(sic);
    }
  }, [sic, init, inlineEvents]);

  return (
    <div
      {...Object.fromEntries(allDom)}
      ref={el}
    ></div>
  );
}

export { ImageCompare };
