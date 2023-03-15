import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../styles/User.module.css'

import { toggleShow } from '../../features/user/userSlice'
import UserSignupForm from './UserSignupForm'

const UserForm = () => {
  const dispatch = useDispatch()
  const { showForm } = useSelector(({ user }) => user)

  const closeForm = () => {
    dispatch(toggleShow(false))
  }

  return showForm ? (
    <>
      <div 
        onClick={closeForm} 
        className={styles.overlay} 
      />
      <UserSignupForm />
    </>
  ) : (
    <></>
  )
}

export default UserForm
