import { useState } from 'react'

export function Search() {

  const [isOpen, setIsOpen] = useState(false)

  function toggleSearch() { 
    if(document.body.clientWidth < 720) {
      setIsOpen(prev => !prev)
    }
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <div className={`search search-mobile ${isOpen ? 'search-mobile_open' : ''}`}>
        <span className='ico ico_search' role="presentation" onClick={toggleSearch} data-test-id='button-search-open'> </span>
        <input data-test-id='input-search' className={`search__input ${isOpen ? 'search__input_open' : ''}`} type="text" placeholder='Поиск книги или автора...'/>
        <span data-test-id='button-search-close' onClick={close} role="presentation" className={`ico ico_search-close ${isOpen ? 'search__close' : 'ico_hidden'}`}> </span>
    </div>
  )
}
