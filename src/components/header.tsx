import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './navigation'

interface HeaderProps {
  toggleNavigation: () => void,
  isOpenNavigation: boolean,
  closeNavigation: () => void,
}

export function Header({toggleNavigation, isOpenNavigation, closeNavigation}: HeaderProps) {

  const  dataTestIds = {
    idWindowBooks: 'burger-showcase',
    idAllBooks: 'burger-books',
    idTerms: 'burger-terms',
    idContract: 'burger-contract',
  }

  return (
    <header className='header'>
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

            <div className='header__person person'>
                <span className='person__name'>Привет Иван!</span>
                <div className='person__picture'> </div>
            </div>
        </div> 
        <div data-test-id='burger-navigation' className='header__burger-navigation'>
          <Navigation isOpen={isOpenNavigation} closeNavigation={closeNavigation} dataTestIds={dataTestIds}/>
        </div>
    </header>
  
  )
}
