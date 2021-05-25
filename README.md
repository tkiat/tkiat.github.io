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
This is perhaps the most time consuming part of making this website. The water flow represents the interconnection of (meaning of) each tab.

#### Words and Valves
Letters are grouped as a word, connected by a valve. A word and a valve (always located at the right of a word) form a node. A node represents a tab, i.e. an item in a navigation bar. A valve not only functions as a passageway from one node to another, but its expandability also enables all nodes to flexibly expand to the full width of the viewport. The last node contains only a word without a valve.

#### Letters
A letter consists of two SVGs: one for displaying border, another acts as a mask to hide water outside of a letter shape. I import a Raleway Font (taken from Google Font) into Inkscape and edit each letter one by one to become a water container.

Two pipes are added to the top and bottom of each letter to ensure consistency across different letters. This conistency is the key to make water flow possible and more realistic. The width of each letter is minimal except the one having a vertical line at the edge (e.g. H, L, P) where 1px space is added to make them a little more separated from an adjacent letter.

#### Water Flow Animation
Upon clicking a node, water flow to it from the previous node. This takes many animations, one per node. For water to flow from left node to the right node, three steps are required:
1. Water drains from the starting node, i.e. water drains downwards from the text, and at the same time, water drains upwards from the valve.
2. Water then (optionally) pass each intermediary node, i.e. water passes downwards through the text, then water passes upwards through the valve.
3. Water finally reachs the destination node, i.e. water pass downwards to fill the text and then upwards to fill the valve.

A total of (3 steps above) * (2 separate steps for text and valve) * (2 directions: left and right) = 12 animations are required. I use a simple rectangular shape of any background color with lower z-index to make the water flow. It only move in y axis only for the sake of simplicity. [This document](doc/water-animation.md) describes the logical steps of how to animate water flow.

## Others
### Accessibility
- Moving waves and containerized water are disabled when [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) is set. Alternatively, a user can turn off the movement in Settings.
- Dark theme is available in settings and becomes default if "prefers-color-scheme: dark" is set.

### Performance
<!--- 99 Lighthouse performance score (using production build in incognito mode)-->
- Use more lightweight libraries
  - Use hookrouter library for routing (much lighter than react-router)
  - react-colorful (much lighter than react-color)
- Parsed size is around 1.2MB (using webpack-bundle-analyzer)

### Potential Improvements
- Wave speed is not consistent across devices since Window.requestAnimationFrame() API depends on the refresh rate of the screen.
- It is more performant to render canvas not in the main thread to not distract the user. [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) + Web Worker already works fin ebut then I cannot trigger the Web Worker update when the wave colors (using useRef hook) change because that don't update the DOM. This will lead to much code change. I cannot find simple solution so I skip it. Anyway, OffscreenCanvas is experimental feature.
