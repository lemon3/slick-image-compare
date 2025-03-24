<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]

# slick image compare
Is a modern image comparison slider written in vanilla JavaScript and has no dependencies on other libraries. Best for comparing images, image retouching, color adjustments, renderings, etc... It uses the requestAnimationFrame api for rendering.

_(Started as a jQuery-Plugin back in the days (2013) and was used for a custom WordPress-Plugin)_

## Use it with

|                 Vanilla JS                  |               React                |               Astro                |
| :-----------------------------------------: | :--------------------------------: | :--------------------------------: |
| [![vanilla js][logo-vanilla]][link-vanilla] | [![react][logo-react]][link-react] | [![astro][logo-astro]][link-astro] |
|         [vanilla JS][link-vanilla]          |   [react component][link-react]    |   [astro component][link-astro]    |
|             The core JS library             |          A React wrapper           |          An Astro wrapper          |


## Docs
**[Read the documentation >>](https://slick-image-compare-docs.onrender.com/)**

## Preview
[![demo](https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/image-compare.gif)](https://lemon3.github.io/slick-image-compare/)

## Example
### Vanilla js
![vanilla js][logo-vanilla]

**module:**
```Bash
pnpm add slick-image-compare
```

```html
<div id="my-div"></div>
```

```js
import SlickImageCompare from 'slick-image-compare';
import 'slick-image-compare/style';

const options = {
  beforeImage: 'before.jpg',
  afterImage: 'after.jpg',
};

const sic = new SlickImageCompare('#my-div', options);
```

**classic:**
```html
<link rel="stylesheet" href="https://unpkg.com/slick-image-compare/dist/slick-image-compare.css">
<script src="https://unpkg.com/slick-image-compare"></script>

<div id="my-div" style="max-width=640px">
  <img src="before.jpg" alt="before image" />
  <img src="after.jpg" alt="after image" />
</div>

<script>
  const sic = new SlickImageCompare('#my-div');
</script>
```

more info goto [core package (vanilla js)][link-vanilla]!

### React
![react js][logo-react]

```Bash
pnpm add slick-image-compare-react
```

```jsx
import React from 'react';
import SlickImageCompare from 'slick-image-compare-react';
import 'slick-image-compare/style';

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

more info goto [the react component package][link-react]!

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/github/license/lemon3/slick-image-compare?style=for-the-badge
[license-url]: https://github.com/lemon3/slick-image-compare/blob/main/LICENSE

[logo-vanilla]: https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/vanilla-js.svg
[link-vanilla]: https://github.com/lemon3/slick-image-compare/tree/main/packages/core

[logo-react]: https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/react.svg
[link-react]: https://github.com/lemon3/slick-image-compare/tree/main/packages/react

[logo-astro]: https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/astro.svg
[link-astro]: https://github.com/lemon3/slick-image-compare/tree/main/packages/astro
