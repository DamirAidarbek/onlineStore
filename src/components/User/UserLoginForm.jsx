import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from '../../styles/User.module.css'

import { toggleShow, toggleFormType, loginUser } from '../../features/user/userSlice'

const UserSignupForm = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        password: '',
        email: '',
    })

    const closeForm = () => {
        dispatch(toggleShow(false))
    }

    const handleChange = ({ target: { value, name } }) => {
        setValues({...values, [name]: value })
    }

    const handleFormType = () => {
        dispatch(toggleFormType('signUp'))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        dispatch(loginUser(values))
        closeForm()
    }

    return (
        <div className={styles.wrapper}>

            <div onClick={closeForm} className={styles.close}>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>

            <div className={styles.title}>Login</div>

            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={styles.group}>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.link} onClick={handleFormType}>
                    Create an account
                </div>

                <button type="submit" className={styles.submit}>
                    Login
                </button>

            </form>

        </div>
    )
}

export default UserSignupForm
