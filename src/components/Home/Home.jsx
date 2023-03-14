import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";

import { filterByPrice } from "../../features/products/productsSlice";

const Home = () => {
    const { products: { list, filtered }, categories } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!list.length) return;

        dispatch(filterByPrice(100))
    }, [dispatch, list.length])

  return (
      <>
          <Poster />
          <Products
              title="Trending"
              products={list}
              amount={5}
          />
          <Categories
              title="Worth Seeing"
              products={categories.list}
              amount={5}
          />
          <Banner />
          <Products
              title="Less than 100$"
              products={filtered}
              amount={5}
          />
      </>
  )
}

export default Home