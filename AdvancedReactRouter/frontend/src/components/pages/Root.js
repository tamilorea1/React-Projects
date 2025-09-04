import MainNavigation from "../MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";
function RootLayout() {
    return (<>
    <MainNavigation/>
    <Outlet/>
    </>)
}

export default RootLayout;