import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Navigation } from './navigation'
import { useActions } from '../hooks/actions';

interface HeaderProps {
  toggleNavigation: () => void,
  isOpenNavigation: boolean,
  closeNavigation: () => void,
}

export function Header({toggleNavigation, isOpenNavigation, closeNavigation}: HeaderProps) {

  const {logOut} = useActions()

  const [isOpenProfileSettings, setIsOpenProfileSettings] = useState(false)

  const className = isOpenProfileSettings ? 'shadow' : ''

  const  dataTestIds = {
    idWindowBooks: 'burger-showcase',
    idAllBooks: 'burger-books',
    idTerms: 'burger-terms',
    idContract: 'burger-contract',
    prefix: 'burger-',
  }

  return (
    <header className={`header ${className}`}>
        <div className='wrapper header__wrapper'>
            <Link to="/" className='header__logo logo'>
              <span className='icon-square icon-square_lilium'>
                <span className='ico ico_logo'> </span>
              </span>
              <span className="logo-object"> </span>
            </Link>
            <div className='hamburger-title-line'>
                <span onClick={toggleNavigation}  data-test-id="button-burger" role="presentation" className={`hamburger ${isOpenNavigation ? 'hamburger_active' : ''}`}><span className='hamburger__line'> </span></span>
                <h1 className='header__title'>Библиотека</h1>
            </div>

            <div role="presentation" className='header__person person' onClick={() => setIsOpenProfileSettings(prev => !prev)}>
                <span className='person__name'>Привет Иван!</span>
                <div className='person__picture'> </div>

                {isOpenProfileSettings && <div className='person__functions'>
                  <p><Link to="/">Профиль</Link></p>
                  <p role="presentation" onClick={() => logOut()}>Выход</p>
                </div>}
            </div>



        </div>
        <div data-test-id='burger-navigation' className='header__burger-navigation'>
          <Navigation isOpen={isOpenNavigation} closeNavigation={closeNavigation} dataTestIds={dataTestIds}/>
        </div>
    </header>

  )
}
