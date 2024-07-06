# Plaingrid

Plaingrid is a 12 column, mobile first, responsive grid layout built with the CSS `display: grid` property. After executing the script, you'll have a `plaingrid.css` file containing the CSS classes for your grid layout at your current directory.

In Germany we say ["Ohne Schnickschnack"](https://www.deepl.com/de/translator#de/en/Ohne%20Schnickschnack).

## Contents

1. [Installation](#installation)
2. [Usage](#usage)
   1. [Define Widths](#define-widths)
   2. [Define Offsets](#define-offsets)
3. [Why Plaingrid?](#why-plaingrid)
4. [License](#license)

## Installation <a name="installation"></a>

You can install Plaingrid with NPM:

```bash
npx create-plaingrid
```

In the next step, you are prompted to provide some breakpoint values. You can press enter to pick the _default values_ shown in the brackets.

```bash
What are your breakpoint values? (sm, md, lg, xl, 2xl)

? sm (in px): 640px
? md (in px): 768px
? lg (in px): 1024px
? xl (in px): 1280px
? 2xl (in px): (1536px) # <-- cursor is currently here
```

After that, you are prompted to provide your grid gutter (gap) value.

```bash
? Your grid gutter value (in px or rem): (1rem) # <-- cursor is currently here
```

And that's it! You'll have a `plaingrid.css` file containing the CSS classes for your grid layout at your current directory. You can move it to your css files - or whereever you want to have it, just make sure it's in your CSS bundle - and you're good to go.

## Usage <a name="usage"></a>

The system consists of the two main classes `grid-container` and `grid-item`, plus the additional _grid-item-configuration-classes_ `colspan-{breakpoint}-{colspanValue}` and `colstart-{breakpoint}-{colstartValue}`, where

- `breakpoint` can be `base`, `sm`, `md`, `lg`, `xl` and `2xl`,
- `colspanValue` can vary from `1` to `12`,
- `colstartValue` can vary from `1` to `12`.

The _grid-item-configuration-classes_ only work on elements of the class `grid-item`.

### Define Widths <a name="define-widths"></a>

Use the `colspan`-classes to define the width of a grid item.

```html
<div class="grid-container">
  <div class="grid-item colspan-base-12 colspan-md-5">
    <h2>Grid Item 1</h2>

    <p>
      My width is initially 12/12, so full. From the breakpoint md on forward, I
      am 5/12 columns wide.
    </p>
  </div>

  <div class="grid-item colspan-base-12 colspan-md-7">
    <h2>Grid Item 2</h2>

    <p>
      My width is initially 12/12 as well. From the breakpoint md on forward, I
      take up 7/12 columns from the grid container.
    </p>

    <p>
      Since the grid container consists of 12 columns, I am initially below the
      first grid item, and from the breakpoint md on forward, I jump next to it
      because there is enough space for both of us.
    </p>
  </div>
</div>
```

### Define Offsets <a name="define-offsets"></a>

If you want a grid item to have an offset, you need to define where the grid item should start by using the `colstart`-classes.

```html
<div class="grid-container">
  <div class="grid-item colspan-base-12 colspan-md-5">
    <h2>Grid Item 1</h2>

    <p>
      My width is initially 12/12, so full. From the breakpoint md on forward, I
      am 5/12 columns wide.
    </p>
  </div>

  <div class="grid-item colspan-base-12 colspan-md-6 colstart-md-7">
    <h2>Grid Item 2</h2>

    <p>
      My width is initially 12/12 as well. From the breakpoint md on forward, I
      take up 6/12 columns from the grid container, and start at the 7th column
      of the grid container, which means there is one column of space between me
      and Grid Item 1.
    </p>
  </div>
</div>
```

## Why Plaingrid? <a name="why-plaingrid"></a>

I wanted an easy way to realize a 12 column grid layout, which is independent from the rest of the pages styling and therefore reusable. I also did not want to use a flexbox grid system to not deal with manually calculated column widths and/or negative margins, I think it's time to overcome that.

This reason, and the fact that most of the grid systems I found were providing additional stuff I don't want/need, motivated me to make a system myself.

The CSS `display: grid` property is now [widely supported across major browsers](https://caniuse.com/?search=css%20grid) just like [flexbox](https://caniuse.com/?search=css%20flexbox).

If you are using Tailwind CSS, you don't need Plaingrid. Tailwind CSS already comes with classes which can realize what Plaingrid does. But those classes are tied to Tailwind CSS, and can not be used without it, while Plaingrid is **independent from your styling system**.

## License <a name="license"></a>

Copyright (c) 2024 Savas Tireng<br />
Licensed under the [ISC License](./LICENSE).
