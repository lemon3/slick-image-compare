import { useRef, useState } from 'react';
import { ImageCompare } from '../src/components/ImageCompare';
import { type SlickImageCompare } from '../src/components/ImageCompare';

const imageSets: Record<
  'set1' | 'set2',
  { beforeImage: string; afterImage: string }
> = {
  set1: {
    beforeImage: '01_before.png',
    afterImage: '01_after.png',
  },
  set2: {
    beforeImage: '02_before.png',
    afterImage: '02_after.png',
  },
};

const simpleStyle = {
  maxWidth: '640px',
  border: '2px solid black',
  margin: '0 auto',
  aspectRatio: 3 / 2,
};

export function DemoAdvanced({ ...props }) {
  const sic = useRef<SlickImageCompare | null>(null);
  const currentSetId = useRef<string>('set1');
  const [message, setMessage] = useState<string>('');
  const [currentPercent, setCurrentPercent] = useState<string>('');

  const defaultOptions = {
    beforeLabel: 'before',
    afterLabel: 'after',
  };

  const [options, setOptions] = useState<{
    beforeLabel: string;
    afterLabel: string;
    beforeImage?: string;
    afterImage?: string;
  }>({
    ...defaultOptions,
    ...imageSets.set1,
  });

  const mounted = (instance: SlickImageCompare) => {
    console.log('mounted');
    sic.current = instance;
  };

  const animateToPercent = (percent: number) => {
    sic.current?.animateTo(percent);
  };

  const update = (setId: keyof typeof imageSets) => {
    currentSetId.current = setId;
    setOptions({ ...defaultOptions, ...imageSets[setId] });
  };

  const onViewchange = (evt: CustomEvent) => {
    const settings = evt.detail.instance.settings;
    setMessage(
      evt.detail.afterShown ? settings.afterLabel : settings.beforeLabel
    );
  };

  const onInit = () => {
    console.log('onInit');
  };

  const onUpdate = (evt: CustomEvent) => {
    console.log('update');
    const percent = parseFloat(evt.detail.percent.toFixed(2));
    setCurrentPercent(percent.toString());
  };

  return (
    <>
      <div style={{ marginBottom: '1em' }}>{currentPercent}</div>

      <ImageCompare
        mounted={mounted}
        onInit={onInit}
        onUpdate={onUpdate}
        onViewchange={onViewchange}
        options={options}
        useDomEvents={true}
        style={simpleStyle}
        {...props}
      ></ImageCompare>

      <div style={{ marginBottom: '1em' }}>{message}</div>

      <div style={{ paddingBottom: '20px' }}>
        <button onClick={() => animateToPercent(10)}>goto 10%</button>
        <button onClick={() => animateToPercent(90)}>goto 90%</button>
      </div>

      <div>
        {Object.keys(imageSets).map((key) => (
          <button
            key={`button-${key}`}
            className={currentSetId.current === key ? 'active' : ''}
            onClick={() => update(key as keyof typeof imageSets)}
          >
            {key}
          </button>
        ))}
      </div>
    </>
  );
}
