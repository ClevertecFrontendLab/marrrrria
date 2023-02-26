import { useEffect, useState } from 'react'
import { useActions } from '../hooks/actions'

export function Search() {

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const {setSearchValue} = useActions()


  function toggleSearch() {
    if(document.body.clientWidth < 720) {
      setIsOpen(prev => !prev)
    }
  }

  function close() {
    setIsOpen(false)
  }

  function search(e:React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  useEffect(() => {
    setSearchValue(value)
  }, [value, setSearchValue])

  return (
    <div className={`search search-mobile ${isOpen ? 'search-mobile_open' : ''}`}>
        <span data-test-id='button-search-close' onClick={close} role="presentation" className={`ico ico_search-close ${isOpen ? 'search__close' : 'ico_hidden'}`}> </span>
        <input data-test-id='input-search' className={`search__input ${isOpen ? 'search__input_open' : ''}`} type="text" placeholder='Поиск книги или автора…' onChange={search} value={value}/>
        <span className='ico ico_search' role="presentation" onClick={toggleSearch} data-test-id='button-search-open'> </span>
    </div>
  )
}
