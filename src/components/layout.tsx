import { useNavigation } from '../hooks/navigation-hook';
import { Footer } from './footer';
import { Header } from './header';
import { Navigation } from './navigation';

export interface StandardComponentProps {
    content: React.ReactNode,
}

export function Layout({content}:StandardComponentProps) {

	const { isOpenNavigation, toggleNavigation, closeNavigation } = useNavigation()

	const  dataTestIds = {
    idWindowBooks: 'navigation-showcase',
    idAllBooks: 'navigation-books',
    idTerms: 'navigation-terms',
    idContract: 'navigation-contract',
  }

	return (
	<div className='layout'>
		<Header toggleNavigation={toggleNavigation} isOpenNavigation={isOpenNavigation} closeNavigation={closeNavigation}/>
		<div className="wrapper layout__wrapper">
			<div className='layout__navigation'>
				<Navigation isOpen={isOpenNavigation} closeNavigation={closeNavigation} dataTestIds={dataTestIds}/>
			</div>
			<div className="layout__content">
				{content}
			</div>
		</div> 
		<Footer/>
	</div>
	)
}
