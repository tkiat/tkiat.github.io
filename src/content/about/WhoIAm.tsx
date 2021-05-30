import React from 'react'
import {useImmer} from 'use-immer'

import Cards           from 'src/content/utils/Cards'
import MarkdownContent from 'src/content/utils/MarkdownContent'
import Nav             from 'src/content/utils/Nav'

const goal_purpose = [`
# Life Purpose

I'd like to become a person who respect freedom for himself and others.

And convince others to do the same.

Nothing makes sense to be born without ability to lead one's own life.

Or to be exploited by somebody else.

The life of least impact is the best life ever one can achieve.
`, `
### Goal 1: Become a Web Artisan

Web allows freedom of expression.

To convey what I care about.

Without living a confined, strict life.

With no way out.
`, `
### Goal 2: Become a Competent User

A user of everything: Linux, food, bags, appliance.

An ignorant person cannot go far.
`, `
### Goal 3: Eat Less Meat and Produce Less Wate

Currently, I only eat meat when dining with others.

And I already use reusable containers.

Still, there are room for improvements.

I'd like to become a gardener, with knowledge and space.
`,]

const personality = [`
### MBTI Test
##### 31 Mar 2021 on [16personalities.com](https://www.16personalities.com/)
  - **I**ntroverted (79%) - **E**xtraverted
  - I**N**tuitive (52%) - Ob**S**ervant
  - **T**hinking (51%) - **F**eeling
  - **J**udging (58%) - **P**rospecting
  - **A**ssertive (65%) - **T**erbulent
`, `
### Big 5 Personalities Test
##### 31 Mar 2021 on [openpsychometrics.org](https://openpsychometrics.org/)
  - Extroversion: **11** (percentile)
  - Emotional Stability: **57**
  - Agreeableness: **7**
  - Conscientiousness: **95**
  - Intellect/Imagination: **46**
`, `
### Others
- Early Riser
- Eat Simple Food
- Quiet
- Zodiac Sign - Cancer
`
]

const preferences = [`
### Food & Drink
- Simple > Tasty
- Fruit & Veg > Meat
- No packaging
- From local > Overseas
`, `
### Hardware
- Old > New laptop
- Laptop > Desktop
- Thinkpoint > Mouse > Wacom > Touch bar
- Any Libre OS > Linux > *BSD > Windows > macOS
- Replicant > LinageOS > AOSP > Android > iOS
`, `
### Software
  - FOSS for critical software installed on my devices
  - Open source for any software installed on my devices
  - The rest can be closed source
`, `
### Service
- Bicycle > Public Transport
- Public Transport > Car
- 5 Min Walk > Motorbike
`, `
### Accommodation
- Small home with large area > Tiny home in city
- Ducks & Pigs (edible) > Cats & Dogs
- Grow edible plant > Decorative plant
`, `
### Others
- **Prospective Job**: Driven by compassion.
- **Prospective Wife**: Values freedom more than convenience.
- **Superpower**: I want none. With great power comes great responsibilities.
`
]
const opinion = `
- **Animal**: Carnivores suck.
- **Anime**: No ugly women and not realistic. The voice is also annoying.
- **Apple**: The hardware is good but their proprietary and closed-source ecosystem sucks. I bought around 30 movies (only finished half of them) from iTunes and then promptly deleted my account after realizing how suck it is.
- **Computer Keyboard**: The best includes [a pointing stick](https://en.wikipedia.org/wiki/Pointing_stick) and integrated mouse buttons. The rest sucks.
- **CPU**: Modern Intel and AMD suck (for stuffs like Intel Management Engine). Long live Power9!
- **IKEA**: Cupboard/drawer/cabinet made of cheap woody stuff suck. The rest seems good though.
- **Laptop vs Desktop**: If you don't need very high spec and cooling (they go hand in hand) then you need a laptop. Don't be a loser who buy Mac Pro and use it for iTunes only.
- **MOOC**: The one with free content and optional paid certificates is the best (think of many edX, Coursera courses).
- **Nvidia GPU**: You never know how suck it is until you try using it in Linux.
- **Social Media**: Lack in essence and therefore suck. Of course, it can be good if you are selective enough.
- **Tea**: Tea bag sucks. The quality is abysmal and also doesn't respect environment but it is still much less worse than sweetened green tea in a plastic bottle. Pu-erh tea is the best because it often comes with a natural package in a condensed space.
`

const storage = 'tab-index-about-whoiam'

const WhoIAm = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return(
    <>
      <Nav items={['Personality', 'Goal & Purpose', 'Preferences', 'Opinion']} storage={storage} cur={cur} setCur={setCur} />

      <Cards           isActive={cur === 0} items={personality} />
      <Cards           isActive={cur === 1} items={goal_purpose} />
      <Cards           isActive={cur === 2} items={preferences} />
      <MarkdownContent isActive={cur === 3} content={opinion} />
    </>
  )
}

export default WhoIAm
