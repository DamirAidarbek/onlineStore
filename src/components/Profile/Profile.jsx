import React, { useEffect, useState } from 'react'

import styles from '../../styles/Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(({ user }) => user)

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    if(!currentUser) return

    setValues(currentUser)
  }, [currentUser])

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUser(values))
  }

  return (
    <section className={styles.profile}>
      {!currentUser ? <span>You need to log in</span> : (
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.group}>
            <input
              type='email'
              placeholder='Your email'
              name='email'
              value={values.email}
              autoComplete='off'
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type='name'
              placeholder='Your name'
              name='name'
              value={values.name}
              autoComplete='off'
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type='password'
              placeholder='Your password'
              name='password'
              value={values.password}
              autoComplete='off'
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type='avatar'
              placeholder='Your avatar'
              name='avatar'
              value={values.avatar}
              autoComplete='off'
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit'>
            Update
          </button>

        </form>
      )}
    </section>
  )
}

export default Profile