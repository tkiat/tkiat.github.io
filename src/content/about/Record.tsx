import React from 'react'

import Cards from 'src/content/utils/Cards'
import MarkdownContent from 'src/content/utils/MarkdownContent'
import Tabs from 'src/content/utils/Tabs'

const gadgets = [
  `
### Laptop
- Lenovo T400
- Lenovo X200 (with Libreboot) x 2
`,
  `
### Phone
- HTC One M7
- Samsung Note 2 N7100 x 2
- True 4G Superhero x 2
`,
  `
### Tablet
- Samsung Tab 2 P3100 7.0 Inch
- Samsung Tab 2 P5100 10.1 Inch
`,
  `
### Sound
- **DAC/AMP**: FiiO E10K
- **Earphone**: Cheap No Brand x 2
- **Headphone**: Beyerdynamic DT770pro 250 Ohm
`,
  `
### Storage
- **External HDD**: WD Passport 1TB
- **Internal SSD**:
  - Samsung 850EVO 250GB
  - Intenso 120GB
  - Apacer Panther 120GB
- **USB Stick**
  - Intenso speedline 16GB
  - Sandisk Cruzer Slice 8GB
`,
  `
### Peripheral
  - **Controller**: Xbox one Wireless Controller
  - **Drawing Tablet**: Wacom Intuos 3D M
  - **Mouse**: Roccat Pure Kone
  - **Webcam**: Logitech c310 720p
  - **Wireless USB Adapter**: Atheros AR9271 x 3
`,
]
const software = [
  `
### OS
  - **Desktop (main)**: GNU Guix, Debian
  - **Desktop (testing)**: Ubuntu, Windows 7
  - **Mobile**: Replicant and Android 5
`,
  `
### Desktop
  - **Window Manager**: dwm
  - **Desktop Environment**: anything, I don't care
  - **Shell**: Bash
  - **Email Client**: Tutanota (Web), Neomutt
  - **Terminal**: st, xterm
`,
  `
### Web Browser
  - **Login Only**: Firefox, Icecat
  - **Just browse**: Ungoogled Chromium, w3m
`,
  `
### Documents
  - **Editor**: Vim, VSCode
  - **File Manager**: mc, ranger, vim
  - **Office**: LibreOffice suite
`,
  `
### Content Create
  - **Image**: GIMP, Inkscape
  - **Video**: Kdenlive, simplescreenrecorder
`,
  `
### Content Consume
  - **Music**: Cmus
  - **Reading**: MuPDF
  - **Video**: VLC
`,
  `
### Security
  - **Password Manager**: [password-store](https://www.passwordstore.org/)
`,
]
const hygiene = `
- **Nose Hair Scissor**: Dove
- **Razor**: 1$ safety razor and 3$ shavette
- **Razor Blade**: mostly Dorco ST300, others include Feather DE blades
- **Shaving Creme**: A cheap Barbasol can
- **Soap**: I prefer bar soap, mostly Asepso
`
const drinks = `
- **Coffee**: NONE
- **Tea**: Currently cheap green tea (with branches!) and cheap powder black tea
- **Herbal Tea**: Red Roibos, Chrysanthemum, Yerba Mate, and anything else adventurous
`

const Record = (): React.ReactElement => {
  return (
    <Tabs
      storage={'tab-index-about-record'}
      titles={['Gadgets', 'Software', 'Hygiene', 'Drinks']}
      contents={[
        <Cards items={gadgets} />,
        <Cards items={software} />,
        <MarkdownContent content={hygiene} />,
        <MarkdownContent content={drinks} />,
      ]}
    />
  )
}

export default Record
