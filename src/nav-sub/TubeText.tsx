import React from 'react'
import { mapping } from './TubeTextMap'

export default ({ word }: { word: string }): React.ReactElement => (
  <>
    {Array.from(word).map((letter, i) => {
      return (
        <div key={i} className="letter">
          {mapping[letter].border}
          {mapping[letter].mask}
        </div>
      )
    })}
  </>
)
