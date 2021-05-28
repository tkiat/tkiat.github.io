import React     from 'react'
import {useImmer} from 'use-immer'

import MarkdownContent from '@/content/utils/MarkdownContent'
import Nav             from '@/content/utils/Nav'

const content = `
# Blog
[**My personal blog**](https://tkiat.github.io/freedom-oriented-blog/) is hosted on a small, unknown GitHub pages. The theme of the blog is directed towards freedom with the following sections: **Environment**, **FOSS**, **Media**, **Personal**, **Web**. I am planning to separate each topic into a dedicate site, which should be super fun but also very ambitious.

# Youtube
I did a small [**gaming channel**](https://www.youtube.com/channel/UC89LAwZdhzEAQWOjLFLcbWg) of around 5 videos but already stopped long ago. I just created a [**new channel**](https://www.youtube.com/channel/UCgCypxL_GouQb_kpDrHOIyQ) focusing on open-source software. Currently, it only has one SuperTux video available but I plan to add some reviews or tutorials down the road.
`

const courses = `
# Online
- **2020** - Coursera Course - [**Introduction to Personal Branding**](https://www.coursera.org/learn/personal-branding) - <a href='https://coursera.org/verify/AZD6S5JVYEG8' aria-label='Certificate for Introduction to Personal Branding Course'>**Verified Certificate**</a>
- **2018-2019** - freeCodeCamp - Completed 5 web-related courses
- **2018** - Coursera Specialization - [**Data Structures and Algorithms**](https://www.coursera.org/specializations/data-structures-algorithms) - <a href='https://coursera.org/verify/specialization/MHRFWABPYTJU' aria-label='Certificate for Data Structures and Algorithms Specialization'>**Verified Certificate**</a>
- **2018** - Coursera Specialization - [**Algorithms**](https://www.coursera.org/specializations/algorithms) - <a href='https://coursera.org/verify/specialization/LP2AXJ7TUNRV' aria-label='Certificate for Algorithms Specialization'>**Verified Certificate**</a>
`

const others = `
* **Tea**. My first love with tea began when I was in Germany where a selection of high-quality tea was available there. Now in Thailand I can't taste tea any longer.
* **Shaving**. I have tried new blades from time to time but still haven't tried a real straight razor, a shaving brush, and fancy soaps.
* **Gardening**. I don't like the pesticide and also plastic packages so I am growing some plants (ผักบุ้ง, ผักกาดหอม, ตั้งโอ๋).
* **Reading Technical Blogs**. The freedom provided by web and Linux is an eye-opener for me.
* **Reading Books**. Currently not so active as I am reading only blogs now.
`

const archive = `
* **Cycling**. I used to regularly cycle between cities in Germany and the Netherlands. Unfortunately, the road in Thailand is not as bicycler-friendly. I am still riding it to buy food from markets.
* **Video Games**. I used to play a lot of collectible card games and RPGs but now I find coding more fun, more useful, and totally liberating.
* **Travelling**. I currently don't have both time and money for that. I am currently busy in front of my computer.
* **Collecting TCG Cards**. Inactive since high school.
`

const storage = 'tab-index-hobby-others'

const Others = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['Content', 'Courses','Others','Archive']} storage='storage' cur={cur} setCur={setCur} />

      <MarkdownContent isActive={cur === 0} content={content} />
      <MarkdownContent isActive={cur === 1} content={courses} />
      <MarkdownContent isActive={cur === 2} content={others} />
      <MarkdownContent isActive={cur === 3} content={archive} />
    </>
  )
}

export default Others
