import React, { useEffect, useState } from 'react'

import styles from '../../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, minusItem, removeItem } from '../../features/user/userSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(({user}) => user)
  const [totalPrice, setTotalPrice] = useState()

  const deleteItem = (id) => {
    dispatch(removeItem(id))
  }

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return item.price * item.quantity + acc
    }, 0)
    setTotalPrice(total)
  }, [cart])

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() => dispatch(minusItem(id))}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() => dispatch(addItemToCart({ id }))}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => deleteItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {totalPrice}$
              </span>
            </div>

            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart