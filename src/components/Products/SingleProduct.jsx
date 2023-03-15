import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import Product from './Product'
import Products from './Products'

import { ROUTES } from '../../utills/routes'
import { useGetProductQuery } from '../../features/api/apiSlice'
import { getRelatedProducts } from '../../features/products/productsSlice'

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { list, related } = useSelector(({ products }) => products)

  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id })

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME)
    }
  }, [isLoading, isFetching, isSuccess, navigate])

  useEffect(() => {
    if (!data || !list.length) return

    dispatch(getRelatedProducts(data))
    
  }, [dispatch, data, list.length])

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products 
        title="Related products" 
        products={related} 
        amount={5} 
      />
    </>
  )
}

export default SingleProduct
