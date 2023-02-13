import React from 'react'

export interface PropI {
  changeHandler: (value:string) => void,
  view: string,
}

export function View({view, changeHandler}:PropI) {
  return (
    <div className='view'>
        <button data-test-id='button-menu-view-window' onClick={() => changeHandler('block')} className={`view__button ${view === 'block' ? 'view__button_active' : ''}`} type="button"><span className='ico ico_block'> </span></button>
        <button data-test-id='button-menu-view-list' onClick={() => changeHandler('list')} className={`view__button ${view === 'list' ? 'view__button_active' : ''}`} type="button"><span className='ico ico_list'> </span></button>
    </div>
  )
}
