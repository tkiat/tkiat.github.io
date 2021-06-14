import React from 'react'

type Props = { onclick: () => void }
export default ({ onclick }: Props): React.ReactElement => {
  return (
    <>
      <p>
        Sorry I have no MacBook and therefore cannot test on Safari browser.{' '}
        <span role="img" aria-hidden="true">
          {'\u{1F622}'}
        </span>
      </p>
      <p>
        Switch to Chrome or Firefox or <button onClick={onclick}> proceed anyway.</button>
      </p>
      <p>Proudly made using ThinkPad X200.</p>
    </>
  )
}
