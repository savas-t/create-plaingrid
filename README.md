# Plaingrid

Plaingrid is a 12 column grid layout built with the CSS `display: grid` property. After executing the script, you'll have a `plaingrid.css` file containing the CSS classes for your grid layout at the root of your project.

In Germany we say ["Ohne Schnickschnack"](https://www.deepl.com/de/translator#de/en/Ohne%20Schnickschnack).

## Installation

```bash
npx plaingrid-init
```

In the next step, you are prompted to provide the breakpoint values. You can press enter to pick the default values shown in the brackets

```bash
What are your breakpoint values? (sm, md, lg, xl, 2xl)

? sm: 640px
? md: 768px
? lg: 1024px
? xl: 1280px
? 2xl: (1536px) # <-- cursor is currently here
```

you'll have a `plaingrid.css` file containing the CSS classes for your grid layout at the root of your project. You can move it to your css files - or whereever you want to have it, just make sure it's in your CSS bundle - and you're good to go!

## Usage

```html
@TBA
```

## Why Plaingrid?

I wanted an easy way to realize a 12 column grid layout, which is independent from the rest of the pages styling and therefore reusable. I also did not want to use a flexbox grid system to not deal with manually calculated column widths and/or negative margins, I think it's time to overcome that.

This reason, and the fact that most of the grid systems I found were providing additional stuff I don't want/need, motivated me to make a system myself.

The CSS `display: grid` property is now [widely supported across major browsers](https://caniuse.com/?search=css%20grid) just like [flexbox](https://caniuse.com/?search=css%20flexbox).

## License

**ISC License**

Copyright (c) 2024, Savas Tireng

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
