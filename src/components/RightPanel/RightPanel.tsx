import React, { SyntheticEvent } from "react"
import styles from "./styles.module.scss"
import Button from "@/components/Button/Button"
import { addMuktaMaheeFont } from "@/helpers/fonts"

interface IProps {
    opened: boolean
    title?: string
    children: React.ReactNode
    onClose: () => void
    className?: string
    submitButton: JSX.Element
}

const RightPanel: React.FC<IProps> = ({
    opened,
    title,
    children,
    onClose,
    className,
    submitButton
}) => {
    const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

    return (
        <>
            <div
                className={`${styles.panelWrapper} ${
                    opened && styles.rightPanelOpened
                }`}
                onClick={onClose}
            >
                <aside
                    className={`${styles.rightPanel} ${className}`}
                    onClick={stopPropagation}
                >
                    {title && (
                        <header className={styles.header}>
                            {addMuktaMaheeFont(<h3>{title}</h3>)}
                        </header>
                    )}
                    <div>{opened && children}</div>
                    <footer className={styles.footer}>
                        <Button type="close" text="Close" onClick={onClose} />
                        {submitButton}
                    </footer>
                </aside>
            </div>
        </>
    )
}

export default RightPanel
