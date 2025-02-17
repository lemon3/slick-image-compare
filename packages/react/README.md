<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]

# slick image compare react

<p align="center" width="100%">
    <img src="../../_assets/react.svg" alt="react logo" width="80">
    <div style="text-align: center;">this is the react component of the <strong>slick image compare</strong> plugin.</div>
</p>

## tl;dr

```Bash
pnpm install slick-image-compare-react
```

```jsx
import ImageCompare from 'slick-image-compare-react';

// ...

const options = {
  beforeImage: 'path-to/before-image.jpg',
  afterImage: 'path-to/after-image.jpg',
};

// ...

// jsx inside your render function
return (
  <>
    // 1) use with the defined option object
    <ImageCompare options={options} />
    // 2) use with img child nodes, it uses the default setting!
    <ImageCompare>
      <img
        src='path-to/before-image.jpg'
        alt=''
      />
      <img
        src='path-to/after-image.jpg'
        alt=''
      />
    </ImageCompare>
  </>
);
```

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/github/license/lemon3/slick-image-compare?style=for-the-badge
[license-url]: https://github.com/lemon3/slick-image-compare/blob/main/packages/react/LICENSE
