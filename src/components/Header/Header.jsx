import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../utills/routes'
import { toggleShow } from '../../features/user/userSlice'

import styles from '../../styles/Header.module.css'

import LOGO from '../../images/logo.svg'
import AVATAR from '../../images/avatar.jpg'
import { useDebounce } from '../../hooks/debounce'
import { useSearchProductQuery } from '../../features/api/apiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const title = useDebounce(searchValue)

  const [values, setValues] = useState({
    name: 'Guest',
    avatar: AVATAR
  })

  const { currentUser } = useSelector(({ user }) => user)

  const { data, isError, isLoading } = useSearchProductQuery({ title }, {
    skip: title.length < 2
  })

  const handleClick = () => {
    if (!currentUser) dispatch(toggleShow(true))
    else navigate(ROUTES.PROFILE)
  }

  const searchHandle = ({ target: { value } }) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (!currentUser) return

    setValues(currentUser)
  }, [currentUser])

  useEffect(() => {
    console.log(data)
  }, [title])

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='logo' />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.icon}>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            type='search'
            name='search'
            placeholder='Search for anything...'
            autoComplete='off'
            value={searchValue}
            onChange={searchHandle}
          />
        </div>

        {title && (
          <div className={styles.box}>
            {isLoading && <span>Loading...</span>}
            {data && data.map(({ title, images, id }) => (
              <Link
                key={id}
                to={`/products/${id}`}
                className={styles.item}
                onClick={() => setSearchValue('')}
              >
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />
                <div className={styles.title}>{title}</div>
              </Link>
            ))}
          </div>
        )}

      </form>

      <div className={styles.account}>
        <Link to={ROUTES.HOME} className={styles.favourites}>
          <svg className={styles['icon-fav']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
        </Link>

        <Link to={ROUTES.CART} className={styles.cart}>
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          <span className={styles.count}>2</span>
        </Link>
      </div>
    </div>
  )
}

export default Header
