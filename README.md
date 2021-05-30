# My Personal Website

## Background
At first I built the website from the ground up (front-end and back-end) but I soon realised life is too short to make anything from scratch. I decided to use React.js and hosted it on GitHub Pages. I put my playful and unopinionated personality into this website by providing animation and multiple settings for users.

## Designs
### Duck
I took many SVGs from [https://freesvg.org](https://freesvg.org) and mix and match them to create the outfit of each duck representing each topic.

### Wave
The wave represents my journey and the oscillated waves portray the hustle of modern life. This [Youtube video](https://www.youtube.com/watch?v=LLfhY4eVwDY) gave me inspiration - a wave is actually a curve connecting a few moving points evenly distributed along the horizontal axis. I heavily modify it so that its properties are adjustable on the fly. Changing its physical property, unlike colors, will trigger a page re-rendering because any abrupt physical change should reflect a new location.

### Settings
Putting all settings in a new page is not a good idea since a user should interactively know how the change goes live. As a result, I put it in the sidebar.

#### Themes
I divided a theme into two parts: base and supplement. A predefined theme has its own base and supplement parts whereas a custom theme takes a base part from predefined ones while its supplemental part is left for a user to customize.

The hsl color system I am using makes it very convenient to make themes and the codebase to be short. One theme only has two values: hue and saturation. I firstly use these two values to generate the wave color, which in turn generate all other colors in my website.
  - The colors of three waves are monochromatic. This gives a sense of oneness since there is only one ocean.
  - All the interactive elements have complementary color to the wave color to make it easier to be spotted.
  - The 'day' and 'dark' time differs in only lightness. The problem of hsl is that the l in hsl is not the same as [lightness perceived by human](https://lea.verou.me/2021/03/inverted-lightness-variables) so I rely on manual adjustment until I feel right.

### Navbar Water Flow (Desktop Only)
This is perhaps the most time consuming part of making this website.

#### Letters
A letter consists of two SVGs: one for displaying border, another acts as a mask to hide water outside of a letter shape. I import a Raleway Font (taken from Google Font) into Inkscape and edit each letter one by one to become a water container. Two pipes are added to the top and bottom of each letter to ensure consistency across different letters. I add one 1px space to the width of a letter whose vertical line is at the edge (e.g. H, L, P) to give it a sense of separation.

#### Water Flow Animation
A total of = 12 animations are required. Take a look at [this document](doc/water-animation.md) for details.

## Others
### Accessibility
- Animations are disabled when [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) is set. Alternatively, a user can turn off the movement in Settings.
- Dark theme is available in settings and becomes default if "prefers-color-scheme: dark" is set.

### Potential Improvements
- Wave speed is not consistent across devices since Window.requestAnimationFrame() API depends on the refresh rate of the screen.
- It is more performant to render canvas not in the main thread to not distract the user. [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) + Web Worker already works fine but that should lead to much code change in order to give user ability to change themes. Anyway, OffscreenCanvas is currently an experimental feature.
