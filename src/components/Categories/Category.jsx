import React, { useEffect, useState } from 'react'

import Products from '../Products/Products'

import styles from '../../styles/Category.module.css'
import { useParams } from 'react-router-dom'
import { useSearchProductQuery } from '../../features/api/apiSlice'

const Category = () => {
  const { id } = useParams()
  const [items, setItems] = useState([])
  const [values, setValues] = useState({
    id,
    title: '',
    price_min: '',
    price_max: ''
  })

  const handleChange = ({ target: { value, name } }) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const { data, isLoading, isSuccess } = useSearchProductQuery(values)

  useEffect(() => {
    setItems(data)
  }, [data, values])
  const resetResults = () => {
    setValues({
      ...values,
      title: '',
      price_min: '',
      price_max: ''
    })
  }

  return (
    <div>
      <section className={styles.wrapper}>
        <h2 className={styles.title}></h2>

        <form className={styles.filters}>
          <div className={styles.filter}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Product name"
              value={values.title}
            />
          </div>
          <div className={styles.filter}>
            <input
              type="number"
              name="price_min"
              onChange={handleChange}
              placeholder="0"
              value={values.price_min}
            />
            <span>Price from</span>
          </div>
          <div className={styles.filter}>
            <input
              type="number"
              name="price_max"
              onChange={handleChange}
              placeholder="0"
              value={values.price_max}
            />
            <span>Price to</span>
          </div>

          {/*<button type="submit" hidden />*/}
        </form>

        {isLoading ? (
          <div className="preloader">Loading...</div>
        ) : !isSuccess || !data.length ? (
          <div className={styles.back}>
            <span>No results</span>
            <button onClick={resetResults}>Reset</button>
          </div>
        ) : (
          <Products
            title=""
            products={items}
            style={{ padding: 0 }}
            amount={data.length}
          />
        )}
      </section>
    </div>
  )
}

export default Category