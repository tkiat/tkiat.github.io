import React from 'react'
import { mapping } from './TextMap'

export default ({ word }: { word: string }): React.ReactElement => (
  <>
    {Array.from(word).map((letter, i) => {
      return (
        <div key={i} className="letter">
          {mapping.border[letter]}
          {mapping.mask[letter]}
        </div>
      )
    })}
  </>
)
