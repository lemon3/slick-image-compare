import './app.css';
import { DemoSimple } from './demo-simple';
import { DemoImage } from './demo-image';
import { DemoAdvanced } from './demo-advanced';

export default function App() {
  return (
    <>
      <h1>React Component Test</h1>
      <h2>Simple Demo</h2>
      <DemoSimple />

      <h2>Simple Demo</h2>
      <p>with images (&lt;img /&gt;) attached as children</p>
      <DemoImage />

      <h2>Demo2</h2>
      <DemoAdvanced />
    </>
  );
}
