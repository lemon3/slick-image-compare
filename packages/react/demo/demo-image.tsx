import { ImageCompare } from '../src/components/ImageCompare';

const options = {
  beforeLabel: 'before',
  afterLabel: 'after',
};

const style = {
  maxWidth: '640px',
  border: '2px solid black',
  margin: '0 auto',
};

export function DemoImage({ ...props }) {
  return (
    <ImageCompare
      options={options}
      style={style}
      {...props}
    >
      <img src='02_before.png' />
      <img src='02_after.png' />
    </ImageCompare>
  );
}
