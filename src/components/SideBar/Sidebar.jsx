import React from 'react';
import { useSelector } from "react-redux";

import styles from '../../styles/Sidebar.module.css'
import { NavLink } from "react-router-dom";

function Sidebar() {
    const { list } = useSelector(state => state.categories)

    return (
        <section className={styles.sidebar}>

            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    {
                        list.map(({ id, name }) => (
                            <li key={id}>
                                <NavLink
                                    to={`/categories/${id}`}
                                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>

            <div className={styles.footer}>
                <a className={styles.link}>
                    Help
                </a>
                <a className={styles.link} style={{textDecoration: 'underline'}}>
                    Terms & Conditions
                </a>
            </div>

        </section>
    );
}

export default Sidebar;