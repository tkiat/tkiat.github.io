const CardsProject = props => {
  return (
    <div className={'cards-project' + (props.isActive ? ' cards-project--active' : '')}>
      {
        props.items.map((item, i) => {
          return (
            <div className={'cards-project__item' + (item.inactive ? ' cards-project__item--inactive' : '')} key={i}>
              <h1 className='cards-project__header'>{item.title}{item.inactive && ' (Inactive)'}</h1>
              {item['image-src'] && <img className='cards-project__img' src={item['image-src']} alt="Broken :(" aria-label={'image for ' + item.title} />}
              <p>{item.description}</p>
              {item.keyword && <p><strong>Keyword: </strong>{item.keyword}</p>}
              {
                (item.src || item.live) &&
                <h4 className='cards-project__footer'>
                  {item.src && <a href={item.src} aria-label={'source code of ' + item.title}>Source</a>}
                  {(item.src && item.live) && <span> - </span>}
                  {item.live && <a href={item.live} aria-label={'go to ' + item.title}>Live</a>}
                </h4>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default CardsProject
