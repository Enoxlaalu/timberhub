import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'

const Header = () => {
    return (
        <header className={styles.header}>
            <Image
                src="/logo.png"
                width={159}
                height={44}
                alt="Timberhub logo"
            />
        </header>
    )
}

export default Header
