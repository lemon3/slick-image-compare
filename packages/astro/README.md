<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]

# slick image compare astro

<p align="center" width="100%">
    <img src="https://raw.githubusercontent.com/lemon3/slick-image-compare/main/_assets/astro.svg" alt="astro logo">
    <br>
    this is the <strong>astro component</strong><br>of the <a href="https://github.com/lemon3/slick-image-compare/" target="_blank">slick image compare</a> plugin.</p>
</p>

## Docs

**[Read the documentation >>](https://slick-image-compare-docs.onrender.com/)**

## tl;dr

install the package

```Bash
pnpm add slick-image-compare-astro
```

use it in your code

```js
---
import ImageCompare from 'slick-image-compare-astro';

// images to be used for the compare slider
import before from '../images/01_before.png';
import after from '../images/01_after.png';
---

<h1>My demo site</h1>

<ImageCompare
  beforeImage={before}
  afterImage={after}
  beforeLabel="before"
  afterLabel="after"
/>
```

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/github/license/lemon3/slick-image-compare?style=for-the-badge
[license-url]: https://github.com/lemon3/slick-image-compare/blob/main/packages/react/LICENSE
