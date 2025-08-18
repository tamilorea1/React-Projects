import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch} from 'react-redux';
import { uiActions } from './store/Ui-Slice';
import Notification from './components/UI/Notification'
import { cartActions } from './store/cart-slice';

let isInitial = true;

function App() {
  const showCart = useSelector( state => state.ui.cartIsVisibile)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

useEffect(() => {
  const sendCartData = async () => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    }))
    
    const response = await fetch('https://learning-redux-4fb13-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart)
    });

    if (!response.ok) {
      throw new Error('Sending cart data failed')
    }

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Sending cart data successfully!',
    }))
  }

  if (isInitial) {
    isInitial = false;
    return;
  }

  if (cart.changed) {
    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!',
      }))
    })
  }

}, [cart, dispatch])




useEffect(() => {
  const fetchCartData = async () => {
    const response = await fetch('https://learning-redux-4fb13-default-rtdb.firebaseio.com/cart.json');

    if (!response.ok) {
      throw new Error('Could not fetch cart data')
    }

    const data = await response.json();
    return data
  }

  const fetchData = async () => {
    try {
      const cartData = await fetchCartData()
      
      // Fix: Handle case where cartData might be null or doesn't have expected structure
      dispatch(cartActions.replaceCart({
        items: cartData?.items || [], // Use optional chaining and fallback to empty array
        totalQuantity: cartData?.totalQuantity || 0, // Fallback to 0 if undefined
      }))
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Fetching cart data failed!',
      }))
    }
  }

  fetchData();
}, [dispatch])


  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />)}

      <Layout>
      {showCart && <Cart /> }
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;
