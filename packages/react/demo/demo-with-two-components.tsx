import { ImageCompare } from '../src/components/ImageCompare';

export function DemoWithTwoComponents({ ...props }) {
  const options = {
    beforeImage: '01_before.png',
    afterImage: '01_before.png',
  };

  return (
    <>
      {/* 1) use with the defined option object */}
      <ImageCompare
        options={options}
        {...props}
      />

      {/* 2) use with img child nodes and default settings */}
      <ImageCompare {...props}>
        <img
          src='01_before.png'
          alt='before'
        />
        <img
          src='01_after.png'
          alt='after'
        />
      </ImageCompare>
    </>
  );
}
