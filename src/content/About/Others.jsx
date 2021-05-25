import React from 'react'
import {useImmer} from 'use-immer'

import Cards         from '@/content/utils/Cards'
import Nav           from '@/content/utils/Nav'

const credits = [`
# Google Fonts
  - **Lato**: by tyPoland Lukasz Dziedzic (team@latofonts.com) - SIL Open Font License, Version 1.1
  - **Raleway**: by The Raleway Project Authors (impallari@gmail.com) - SIL Open Font License, Version 1.1
`, `
# SVG
<strong><a href="https://www.vecteezy.com/free-vector/nature">Vecteezy</a></strong>
- [Sea background](https://www.vecteezy.com/vector-art/229917-high-seas-vector-illustration), [Desert background](https://www.vecteezy.com/vector-art/192739-stone-gate-in-the-desert-landscape-vector), [Cheery blossom background](https://www.vecteezy.com/vector-art/271238-cherry-blossoms-background-illustration), [Snow background](https://www.vecteezy.com/vector-art/2395226-snow-mountain-background-vector)

<strong>https://freesvg.org</strong>
- [duck](https://freesvg.org/duck), [party hat](https://freesvg.org/green-party-hat), [necktie](https://freesvg.org/necktie), [balloon](https://freesvg.org/orange-balloon), [Stop Sign](https://freesvg.org/raemi-stop-sign), [Sunglasses](https://freesvg.org/sunglasses-black-silhouette), [Camera](https://freesvg.org/usb-video-camera-symbol-vector-drawing), [Cogwheel](https://freesvg.org/vector-drawing-of-cogwheel-gear), [Geek sign](https://freesvg.org/vector-clip-art-of-man-geek-warning-road-sign)
`]

const FAQs = () => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem('tab-index-about-others') ?? 0))
  const click = index => {
    localStorage.setItem('tab-index-about-others', index)
    setCur(index)
  }
  return(
    <>
      <Nav items={['Credits']} storage='tab-index-about-others' cur={cur} onclick={click} />
      <Cards isActive={cur === 0} items={credits} />
    </>
  )
}

export default FAQs
