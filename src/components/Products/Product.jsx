import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utills/routes'

import styles from '../../styles/Product.module.css'

const sizes = [4, 4.5, 5]

const Product = ({ images, title, price, description }) => {
  const [currentImage, setCurrentImage] = useState()
  const [currentSize, setCurrentSize] = useState(null)

  useEffect(() => {
    if (!images) return
    setCurrentImage(images[0])
  }, [images])

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.price}>{price}$</div>
          <div className={styles.color}>
            <span>Color:</span> Green
          </div>
          <div className={styles.sizes}>
            <span>Sizes:</span>
            <div className={styles.list}>
              {sizes.map(size => (
                <div
                  key={size}
                  className={`${styles.size} ${
                    currentSize === size ? `${styles.active}` : ''
                  }`}
                  onClick={() => setCurrentSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button className={styles.add} disabled={!currentSize}>
            Add to cart
          </button>
          <button className={styles.favourite}>Add to favourites</button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  )
}

export default Product
