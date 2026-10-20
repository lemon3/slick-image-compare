import './app.css';
import { DemoSimple } from './demo-simple';
import { DemoImage } from './demo-image';
import { DemoAdvanced } from './demo-advanced';
import { DemoWithTwoComponents } from './demo-with-two-components';

import { ImageCompare } from '../src/components/ImageCompare';

export default function App() {
  return (
    <>
      <h1>React Component Test</h1>
      <h2>Simple Demo</h2>
      <DemoSimple className='demo-simple' />

      <h2>Simple Demo</h2>
      <p>with images (&lt;img /&gt;) attached as children</p>
      <DemoImage className='demo-image' />

      <h2>Advanced Demo</h2>
      <DemoAdvanced className='demo-advanced' />

      <h2>Demo with two components</h2>
      <div style={{ display: 'flex' }}>
        <DemoWithTwoComponents
          className='demo-with-two-components'
          style={{ maxWidth: '320px' }}
        />
      </div>

      <h2>Just the Component</h2>
      <ImageCompare style={{ maxWidth: '640px' }}>
        <img src='02_before.png' />
        <img src='02_after.png' />
      </ImageCompare>
    </>
  );
}
