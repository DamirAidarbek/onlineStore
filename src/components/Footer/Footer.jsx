import React from 'react';
import { Link } from "react-router-dom";

import { ROUTES } from '../../utills/routes'
import LOGO from '../../images/logo.svg'
import styles from '../../styles/Footer.module.css'

const Footer = () => {
    return (
        <section className={styles.footer}>

            <div>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="logo"/>
                </Link>
            </div>

            <div className={styles.rights}>
                Developed by{" "}
                <a
                    rel="noreferrer"
                >
                    Damir
                </a>
            </div>

            <div className={styles.socials}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
                    </svg>
                </a>

                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
                    </svg>
                </a>

                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
                    </svg>
                </a>
            </div>

        </section>
    );
};

export default Footer;