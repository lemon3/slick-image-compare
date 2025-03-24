<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]

# slick image compare
Is a modern image comparison slider written in vanilla JavaScript and has no dependencies on other libraries. Best for comparing images, image retouching, color adjustments, renderings, etc...

[![demo](https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/image-compare.gif)](https://lemon3.github.io/slick-image-compare/)

## Docs
**[Read the documentation >>](https://slick-image-compare-docs.onrender.com/)**

## tl;dr
### Module
install the package
```Bash
pnpm add slick-image-compare
```
html code
```html
<div id="my-div"></div>
```
use it in your code
```js
import SlickImageCompare from 'slick-image-compare';
import 'slick-image-compare/style';

const options = {
  beforeImage: 'before.jpg',
  afterImage: 'after.jpg',
};

const sic = new SlickImageCompare('#my-div', options);
```

### Classic
```html
<link rel="stylesheet" href="https://unpkg.com/slick-image-compare/dist/slick-image-compare.css">
<script src="https://unpkg.com/slick-image-compare"></script>

<div id="my-div" style="max-width:640px">
  <img src="before.jpg" alt="before image" />
  <img src="after.jpg" alt="after image" />
</div>

<script>
  const sic = new SlickImageCompare('#my-div');
</script>
```

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/github/license/lemon3/slick-image-compare?style=for-the-badge
[license-url]: https://github.com/lemon3/slick-image-compare/blob/main/LICENSE
