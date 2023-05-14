import React, { SyntheticEvent, memo, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface IDropdown {
    Item: React.ElementType
    Items: React.ElementType
}

interface IState {
    top?: number
    left?: number
    opened: boolean
    width?: number
}

const Dropdown: React.FC<IDropdown> = memo(({ Item, Items }) => {
    const ref = useRef<HTMLUListElement | null>(null)
    const [state, setState] = useState({} as IState)

    const openDropdown = (e: SyntheticEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const listWidth = rect.width

        let top
        let left = rect.left + rect.width - listWidth

        if (
            ref.current &&
            rect.bottom + ref.current.offsetHeight + 8 > window.innerHeight
        ) {
            top = rect.top - ref.current.offsetHeight - 8
        } else top = rect.bottom + 8

        if (listWidth < window.innerWidth && left < 0) {
            left = rect.left
        }

        if (left < 0) {
            left = rect.left
        }

        setState({
            top,
            left,
            opened: true,
            width: listWidth,
        })
    }

    const close = () => setState({ ...state, opened: false })

    const onWrapperClick = (e: SyntheticEvent) => {
        e.stopPropagation()

        if (e.currentTarget === e.target) {
            close()
        }
    }

    const { opened, top, left, width } = state

    return (
        <div
            onClick={openDropdown}
            className={`${styles.container} ${opened && styles.opened}`}
        >
            <Item />
            <div
                data-opened={opened}
                className={`${styles.wrapper} ${opened && styles.opened}`}
                onClick={onWrapperClick}
            >
                <ul
                    ref={ref}
                    className={`${styles.dropdown} ${
                        customElements && styles.withCustomElements
                    }`}
                    style={{ top, left, width }}
                    onClick={close}
                >
                    <Items />
                </ul>
            </div>
        </div>
    )
})

export default Dropdown
