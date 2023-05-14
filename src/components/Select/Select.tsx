import React, { memo } from 'react'
import styles from './styles.module.scss'
import Dropdown from '@/components/Dropdown/Dropdown'
import Icon from '@/components/Icon/Icon'
import Arrow from 'public/svg/arrow-dropdown.svg'
import { addMuktaMaheeFont } from '@/helpers/fonts'

interface ISelect {
    label: string
    description?: string
    options: string[]
    onChange: (value: string) => void
    value: string
    required?: boolean
    error?: boolean
}

const Select: React.FC<ISelect> = React.memo(
    ({ options, onChange, value, label, description, required, error }) => {
        const Item = memo(() => {
            return (
                <div>
                    {label && (
                        <label
                            className={`${styles.label} ${
                                error && styles.errorLabel
                            }`}
                        >
                            {label}
                            {required && ' *'}
                        </label>
                    )}
                    <div className={styles.select}>
                        <p className={value && styles.value}>
                            {value || 'Select'}
                        </p>
                        <Icon id="dropdownArrow" icon={Arrow} />
                    </div>
                    {description && (
                        <p className={styles.description}>{description}</p>
                    )}
                </div>
            )
        })

        const Items = memo(() => {
            return (
                <>
                    {options.map((option) => {
                        const onClick = () => onChange(option)

                        return (
                            <li
                                key={option}
                                className={styles.item}
                                onClick={onClick}
                            >
                                {option}
                            </li>
                        )
                    })}
                </>
            )
        })

        return <Dropdown Item={Item} Items={Items} />
    }
)

export default Select
