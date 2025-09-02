import {NavLink} from 'react-router-dom'

//This component will render on every page due to our root component
//so that means on every page,
//the navigation bar will be present.


//We're using NavLink which give us the property isActive
//This acts similar to a state,
//checking if the list item was clicked
function MainNavigation() {
  return (
    <header>
        <nav>
            <ul className='list'>
                <li>
                    <NavLink 
                    to='/' 
                    className={({isActive} ) => 
                    (isActive ? 'active' : undefined) }
                    end
                    >Home</NavLink>
                </li>

                <li>
                    <NavLink 
                    to='/products'
                    className={({isActive} ) => 
                    (isActive ? 'active' : undefined) }
                    >Products</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation
