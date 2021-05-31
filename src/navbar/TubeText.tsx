import React from 'react'

import {ReactComponent as UpperABorder} from './letters/_A-border.svg'
import {ReactComponent as UpperAMask}   from './letters/_A-mask.svg'
import {ReactComponent as UpperCBorder} from './letters/_C-border.svg'
import {ReactComponent as UpperCMask}   from './letters/_C-mask.svg'
import {ReactComponent as UpperDBorder} from './letters/_D-border.svg'
import {ReactComponent as UpperDMask}   from './letters/_D-mask.svg'
import {ReactComponent as UpperEBorder} from './letters/_E-border.svg'
import {ReactComponent as UpperEMask}   from './letters/_E-mask.svg'
import {ReactComponent as UpperFBorder} from './letters/_F-border.svg'
import {ReactComponent as UpperFMask}   from './letters/_F-mask.svg'
import {ReactComponent as UpperIBorder} from './letters/_I-border.svg'
import {ReactComponent as UpperIMask}   from './letters/_I-mask.svg'
import {ReactComponent as UpperMBorder} from './letters/_M-border.svg'
import {ReactComponent as UpperMMask}   from './letters/_M-mask.svg'
import {ReactComponent as UpperOBorder} from './letters/_O-border.svg'
import {ReactComponent as UpperOMask}   from './letters/_O-mask.svg'
import {ReactComponent as UpperPBorder} from './letters/_P-border.svg'
import {ReactComponent as UpperPMask}   from './letters/_P-mask.svg'
import {ReactComponent as UpperQBorder} from './letters/_Q-border.svg'
import {ReactComponent as UpperQMask}   from './letters/_Q-mask.svg'
import {ReactComponent as UpperRBorder} from './letters/_R-border.svg'
import {ReactComponent as UpperRMask}   from './letters/_R-mask.svg'
import {ReactComponent as UpperSBorder} from './letters/_S-border.svg'
import {ReactComponent as UpperSMask}   from './letters/_S-mask.svg'
import {ReactComponent as UpperUBorder} from './letters/_U-border.svg'
import {ReactComponent as UpperUMask}   from './letters/_U-mask.svg'
import {ReactComponent as UpperVBorder} from './letters/_V-border.svg'
import {ReactComponent as UpperVMask}   from './letters/_V-mask.svg'
import {ReactComponent as UpperWBorder} from './letters/_W-border.svg'
import {ReactComponent as UpperWMask}   from './letters/_W-mask.svg'

import {ReactComponent as LowerABorder} from './letters/a-border.svg'
import {ReactComponent as LowerAMask}   from './letters/a-mask.svg'
import {ReactComponent as LowerBBorder} from './letters/b-border.svg'
import {ReactComponent as LowerBMask}   from './letters/b-mask.svg'
import {ReactComponent as LowerCBorder} from './letters/c-border.svg'
import {ReactComponent as LowerCMask}   from './letters/c-mask.svg'
import {ReactComponent as LowerDBorder} from './letters/d-border.svg'
import {ReactComponent as LowerDMask}   from './letters/d-mask.svg'
import {ReactComponent as LowerEBorder} from './letters/e-border.svg'
import {ReactComponent as LowerEMask}   from './letters/e-mask.svg'
import {ReactComponent as LowerGBorder} from './letters/g-border.svg'
import {ReactComponent as LowerGMask}   from './letters/g-mask.svg'
import {ReactComponent as LowerHBorder} from './letters/h-border.svg'
import {ReactComponent as LowerHMask}   from './letters/h-mask.svg'
import {ReactComponent as LowerIBorder} from './letters/i-border.svg'
import {ReactComponent as LowerIMask}   from './letters/i-mask.svg'
import {ReactComponent as LowerKBorder} from './letters/k-border.svg'
import {ReactComponent as LowerKMask}   from './letters/k-mask.svg'
import {ReactComponent as LowerLBorder} from './letters/l-border.svg'
import {ReactComponent as LowerLMask}   from './letters/l-mask.svg'
import {ReactComponent as LowerMBorder} from './letters/m-border.svg'
import {ReactComponent as LowerMMask}   from './letters/m-mask.svg'
import {ReactComponent as LowerNBorder} from './letters/n-border.svg'
import {ReactComponent as LowerNMask}   from './letters/n-mask.svg'
import {ReactComponent as LowerOBorder} from './letters/o-border.svg'
import {ReactComponent as LowerOMask}   from './letters/o-mask.svg'
import {ReactComponent as LowerPBorder} from './letters/p-border.svg'
import {ReactComponent as LowerPMask}   from './letters/p-mask.svg'
import {ReactComponent as LowerRBorder} from './letters/r-border.svg'
import {ReactComponent as LowerRMask}   from './letters/r-mask.svg'
import {ReactComponent as LowerSBorder} from './letters/s-border.svg'
import {ReactComponent as LowerSMask}   from './letters/s-mask.svg'
import {ReactComponent as LowerTBorder} from './letters/t-border.svg'
import {ReactComponent as LowerTMask}   from './letters/t-mask.svg'
import {ReactComponent as LowerUBorder} from './letters/u-border.svg'
import {ReactComponent as LowerUMask}   from './letters/u-mask.svg'
import {ReactComponent as LowerVBorder} from './letters/v-border.svg'
import {ReactComponent as LowerVMask}   from './letters/v-mask.svg'
import {ReactComponent as LowerYBorder} from './letters/y-border.svg'
import {ReactComponent as LowerYMask}   from './letters/y-mask.svg'

const mapping: {[index: string]: React.ReactFragment} = {
  'A': <><UpperABorder /><UpperAMask /></>,
  'C': <><UpperCBorder /><UpperCMask /></>,
  'D': <><UpperDBorder /><UpperDMask /></>,
  'E': <><UpperEBorder /><UpperEMask /></>,
  'F': <><UpperFBorder /><UpperFMask /></>,
  'I': <><UpperIBorder /><UpperIMask /></>,
  'P': <><UpperPBorder /><UpperPMask /></>,
  'Q': <><UpperQBorder /><UpperQMask /></>,
  'M': <><UpperMBorder /><UpperMMask /></>,
  'O': <><UpperOBorder /><UpperOMask /></>,
  'R': <><UpperRBorder /><UpperRMask /></>,
  'S': <><UpperSBorder /><UpperSMask /></>,
  'U': <><UpperUBorder /><UpperUMask /></>,
  'V': <><UpperVBorder /><UpperVMask /></>,
  'W': <><UpperWBorder /><UpperWMask /></>,

  'a': <><LowerABorder /><LowerAMask /></>,
  'b': <><LowerBBorder /><LowerBMask /></>,
  'c': <><LowerCBorder /><LowerCMask /></>,
  'd': <><LowerDBorder /><LowerDMask /></>,
  'e': <><LowerEBorder /><LowerEMask /></>,
  'g': <><LowerGBorder /><LowerGMask /></>,
  'h': <><LowerHBorder /><LowerHMask /></>,
  'i': <><LowerIBorder /><LowerIMask /></>,
  'k': <><LowerKBorder /><LowerKMask /></>,
  'l': <><LowerLBorder /><LowerLMask /></>,
  'm': <><LowerMBorder /><LowerMMask /></>,
  'n': <><LowerNBorder /><LowerNMask /></>,
  'o': <><LowerOBorder /><LowerOMask /></>,
  'p': <><LowerPBorder /><LowerPMask /></>,
  'r': <><LowerRBorder /><LowerRMask /></>,
  's': <><LowerSBorder /><LowerSMask /></>,
  't': <><LowerTBorder /><LowerTMask /></>,
  'u': <><LowerUBorder /><LowerUMask /></>,
  'v': <><LowerVBorder /><LowerVMask /></>,
  'y': <><LowerYBorder /><LowerYMask /></>,
}

const TubeText = ({word}: {word: string}): React.ReactElement => {
  return (
    <>
    {
      Array.from(word).map((letter, i) => {
        return <div key={i} className='letter'>{mapping[letter]}</div>
      })
    }
    </>
  )
}

export default TubeText
