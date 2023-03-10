import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { Book } from '../models/models'
import { useGetCategoriesQuery } from '../store/library/library.api'

interface NavigationProps {
  isOpen: boolean,
  closeNavigation: () => void,
  dataTestIds: {
    idWindowBooks: string,
    idAllBooks: string,
    idTerms: string,
    idContract: string,
    prefix: string,
  }

}

export function Navigation({isOpen, closeNavigation, dataTestIds}: NavigationProps) {

  const {isLoading, isError, data} = useGetCategoriesQuery()
  const { addCategories, logOut } = useActions()
	const { allBooks } = useAppSelector(state => state.library)
  const categoryCount = calculateBooks(allBooks)


  function calculateBooks(books:Book[]) {
    const categoryCount: Record<string,number> = {}

    books.forEach(book => {
      book.categories.forEach(category => {
        if (categoryCount[category]) {
          categoryCount[category]+=1
        }
        else {
          categoryCount[category] = 1
        }
      });
    });

    return categoryCount
  }


  useEffect(() => {
    addCategories(data || [])
  }, [addCategories, data])

  const navigationItems = [
    {
      id: 0,
      name: 'Все книги',
      path: 'all',
      count: ' ',
    },
    ...data || [],
  ]

  const {category} = useParams()
  const [activeItem, setActiveItem] = useState(!!category)

  const { currentBooks } = useAppSelector(state => state.library)

  const items = navigationItems.map(item =>
  <li  role="presentation" onClick={closeNavigation} key={`navigation-item-${item.id}`} className='subnavigation__item'>
    <NavLink to={`/books/${item.path}`}>
      {({ isActive }) => (
      <React.Fragment>
        <span data-test-id={item.name === 'Все книги' ? dataTestIds.idAllBooks : `${dataTestIds.prefix}${item.path}`} className={` ${isActive ? 'subnavigation__item_active' : undefined}`}>
          {item.name}
        </span><span data-test-id={`${dataTestIds.prefix}book-count-for-${item.path}`} className='navigation__item-count'>&nbsp; {categoryCount[item.name] || item.count || 0} &shy;</span>
      </React.Fragment>
      )}
    </NavLink>
  </li>)

  return (
    <React.Fragment>
      { isOpen && <div className='navigation__background' onClick={closeNavigation} role="presentation"/>}

    <nav data-test-id='burger-navigation' className={`navigation navigation-bar ${isOpen? 'navigation_open' : 'navigation_hidden'}`}>
      <ul className='navigation__wrapper'>
      <li className='navigation__item'>
          <NavLink data-test-id={dataTestIds.idWindowBooks} onClick={() => setActiveItem(prev => !prev)} to={`/books/${category || 'all'}`} className={({ isActive }) => isActive ? 'navigation__item_active' : 'navigation__item_passive'}>
            Витрина Книг
            {items.length === 1 ? null : <span className={`ico ico_arrow-navigation ${activeItem ? 'navigation__arrow_opened' : 'navigation__arrow_closed'}`}> </span>}
          </NavLink>
          </li>
          <ul className={activeItem ? 'navigation__sub subnavigation subnavigation_active' : 'navigation__sub subnavigation'}>
              {items.length === 1 ? null : items}
          </ul>
          <li className='navigation__item'>
            <NavLink data-test-id={dataTestIds.idTerms} to="/rules" className={({ isActive }) => isActive ? 'navigation__item_active' : undefined}>
              Правила пользования
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink data-test-id={dataTestIds.idContract} to="/contract" className={({ isActive }) => isActive ? 'navigation__item_active' : undefined}>
                Договор оферты
            </NavLink>
          </li>
      </ul>

      <ul className='navigation__profile-items'>
        <li className='navigation__item'>Профиль</li>
        <li role="presentation" onClick={() => logOut()} className='navigation__item'>Выход</li> 
      </ul>
    </nav>
    </React.Fragment>
  )
}
