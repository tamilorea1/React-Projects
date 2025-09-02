import {Outlet} from 'react-router-dom'
import MainNavigation from './MainNavigation';
function RootLayout(){

    //In <Outlet/>, it will insert the current pages content
    return(
        <>
            <MainNavigation/>
            <Outlet/>
        </>
    )
}
export default RootLayout;