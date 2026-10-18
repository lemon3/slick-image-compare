import { useState } from 'react';
import { ImageCompare } from './components/ImageCompare';
import SlickImageCompare from 'slick-image-compare'; // for type definition
import './App.css';

function App() {
  const [compare, setCompare] = useState<SlickImageCompare | null>(null);
  const [message, setMessage] = useState<string>('');
  const [currentPercent, setCurrentPercent] = useState<string>('');
  const [currentSetId, setCurrentSetId] = useState<string>('set1');

  const imageSets: Record<
    'set1' | 'set2',
    { beforeImage: string; afterImage: string }
  > = {
    set1: {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    },
    set2: {
      beforeImage: '03_before.png',
      afterImage: '03_after.png',
    },
  };

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

  const animateToPercent = (percent: number) => {
    compare?.animateTo?.(percent);
  };

  const update = (setId: keyof typeof imageSets) => {
    setCurrentSetId(setId);
    const newOptions = imageSets[setId];
    setOptions({ ...defaultOptions, ...newOptions });
  };

  const viewchange = (evt: CustomEvent) => {
    setMessage(evt.detail.afterShown ? 'After' : 'Before');
  };

  const updatePercent = (evt: CustomEvent) => {
    const percent = parseFloat(evt.detail.percent.toFixed(2));
    setCurrentPercent(percent.toString());
  };

  return (
    <>
      <div
        className='card'
        style={{ padding: '2em' }}
      >
        <h1>React Component Test</h1>
        <div style={{ marginBottom: '1em' }}>{currentPercent}</div>

        <ImageCompare
          init={setCompare}
          onUpdate={updatePercent}
          onViewchange={viewchange}
          options={options}
          style={{
            maxWidth: '480px',
            border: '2px solid black',
            margin: '0 auto',
          }}
        />
        <div>
          <h2>{message}</h2>
        </div>

        <div style={{ paddingBottom: '20px' }}>
          <button onClick={() => animateToPercent(10)}>goto 10</button>
          <button onClick={() => animateToPercent(90)}>goto 90</button>
        </div>

        <div>
          {Object.keys(imageSets).map((key) => (
            <button
              key={`button-${key}`}
              className={currentSetId === key ? 'active' : ''}
              onClick={() => update(key as keyof typeof imageSets)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
