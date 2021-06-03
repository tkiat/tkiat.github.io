import React from 'react'

type Prop = {
  navMainIndex: number
}

const Contact = ({ navMainIndex }: Prop): React.ReactElement => {
  if (navMainIndex !== 2) return <></>
  return (
    <div className="contact">
      <h1 className="contact__header">Contact</h1>
      <p className="contact__paragraph">
        <span role="img" aria-hidden="true">
          {'\u{2709}'}
        </span>{' '}
        tkiat@tutanota.com{' '}
        <span role="img" aria-hidden="true">
          {'\u{260E}'}
        </span>{' '}
        (+66)646468180
      </p>
      <a
        className="contact__link"
        href="https://raw.githubusercontent.com/tkiat/dotfiles-and-configs/master/gpg/public.gpg"
        target="blank">
        GPG Public Key
      </a>
    </div>
  )
}

export default Contact
