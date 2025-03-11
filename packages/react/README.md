<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]

# slick image compare react

<p align="center" width="100%">
    <img src="https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/react.svg" alt="react logo">
    <br>
    this is the <strong>react component</strong><br>of the <a href="https://github.com/lemon3/slick-image-compare/" target="_blank">slick image compare</a> plugin.</p>
</p>

## Docs
**[Read the documentation >>](https://slick-image-compare-docs.onrender.com/)**

## tl;dr

install the package
```Bash
pnpm install slick-image-compare-react
```

use it in your code
```jsx
import React from 'react';
import SlickImageCompare from 'slick-image-compare-react';
import 'slick-image-compare/dist/slick-image-compare.css';

function App() {
  const options = {
    beforeImage: '01_before.png',
    afterImage: '01_before.png',
  };

  return (
    <>
      {/* 1) use with the defined option object */}
      <SlickImageCompare options={options} />

      {/* 2) use with img child nodes and default settings */}
      <SlickImageCompare>
        <img src="01_before.png" alt="before" />
        <img src="01_after.png" alt="after" />
      </SlickImageCompare>
    </>
  );
}

export default App;
```

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/github/license/lemon3/slick-image-compare?style=for-the-badge
[license-url]: https://github.com/lemon3/slick-image-compare/blob/main/packages/react/LICENSE
