import React from 'react'

type Props = { className: string }
export default ({ className }: Props): React.ReactElement => {
  return (
    <div className={className}>
      <div>
        Content not found but no worry we have <a href="/">HOME</a>
      </div>
    </div>
  )
}
