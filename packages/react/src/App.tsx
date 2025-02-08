import { ImageCompare } from './components/ImageCompare';
import './App.css';

function App() {
  const options = {
    beforeImage: '01_before.png',
    afterImage: '01_after.png',
  };

  return (
    <>
      <div className='card'>
        <ImageCompare options={options}></ImageCompare>
      </div>
    </>
  );
}

export default App;
