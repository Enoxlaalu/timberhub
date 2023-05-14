import React from "react"
import styles from "./styles.module.scss"
import Header from "@/components/Header/Header"

interface ILayout {
    children: React.ReactNode
}

const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            {children}
        </div>
    )
}

export default Layout
