import { Route, Routes } from 'react-router-dom'

import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import Cart from '../Cart/Cart'
import Profile from '../Profile/Profile'
import SingleCategory from '../Categories/SingleCategory'

import { ROUTES } from '../../utills/routes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
    </Routes>
  )
}

export default AppRoutes