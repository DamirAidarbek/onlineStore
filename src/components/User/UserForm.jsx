import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserSignupForm from './UserSignupForm'
import UserLoginForm from './UserLoginForm'

import styles from '../../styles/User.module.css'

import { toggleShow } from '../../features/user/userSlice'

const UserForm = () => {
  const dispatch = useDispatch()
  const { showForm, formType } = useSelector(({ user }) => user)

  const closeForm = () => {
    dispatch(toggleShow(false))
  }

  return showForm ? (
    <>
      <div 
        onClick={closeForm} 
        className={styles.overlay} 
      />
      {formType === 'signUp' ? <UserSignupForm /> : <UserLoginForm />}
    </>

  ) : (
    <></>
  )
}

export default UserForm
