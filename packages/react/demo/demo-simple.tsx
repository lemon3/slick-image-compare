import { ImageCompare } from '../src/components/ImageCompare';

const options = {
  beforeImage: '01_before.png',
  afterImage: '01_after.png',
  beforeLabel: 'Pink',
  afterLabel: 'Blue',
};

const style = {
  maxWidth: '640px',
  border: '2px solid black',
  margin: '0 auto',
};

export function DemoSimple() {
  return (
    <ImageCompare
      options={options}
      style={style}
    />
  );
}
