import {Link} from 'react-router-dom'

//This component will render on every page due to our root component
//so that means on every page,
//the navigation bar will be present.

function MainNavigation() {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>

                <li>
                    <Link to='/products'>Products</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation
