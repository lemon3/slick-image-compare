import { useState } from 'react';
import { ImageCompare } from './components/ImageCompare';
import SlickImageCompare from 'slick-image-compare'; // for type definition
import './App.css';

function App() {
  const [compare, setCompare] = useState<SlickImageCompare | null>(null);
  const [message, setMessage] = useState<string>('');
  const [currentPercent, setCurrentPercent] = useState<string>('');
  const [currentSetNumber, setCurrentSetNumber] = useState<number>(0);

  const images = [
    {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    },
    {
      beforeImage: '02_before.png',
      afterImage: '02_after.png',
    },
  ];

  const defaultOptions = {
    beforeLabel: 'before',
    afterLabel: 'after',
  };

  const [options, setOptions] = useState({ ...defaultOptions, ...images[0] });

  const animateToPercent = (percent: number) => {
    compare?.animateTo?.(percent);
  };

  const update = (setNumber: number) => {
    setCurrentSetNumber(setNumber);
    const newOptions = images[setNumber];
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
      <div className='card'>
        <h1>React Component Test</h1>
        <input
          readOnly
          type='text'
          onInput={(evt) =>
            setCurrentPercent(evt.currentTarget.value.toString())
          }
          value={currentPercent}
          id=''
        />

        <ImageCompare
          init={setCompare}
          onUpdate={updatePercent}
          onViewchange={viewchange}
          options={options}
          style={{ maxWidth: '640px' }}
        />
        <div>
          <h2>{message}</h2>
        </div>

        <button onClick={() => animateToPercent(10)}>goto 10</button>
        <button onClick={() => animateToPercent(10)}>goto 90</button>

        <div>
          <button
            className={currentSetNumber == 0 ? 'active' : ''}
            onClick={() => update(0)}
          >
            set 1
          </button>
          <button
            className={currentSetNumber == 1 ? 'active' : ''}
            onClick={() => update(1)}
          >
            set 2
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
