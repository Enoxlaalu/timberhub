'use client'

import React, { ChangeEvent, KeyboardEvent } from 'react'
import styles from './styles.module.scss'
import debounce from '@/helpers/debounce'
import Search from 'public/svg/search.svg'

interface IInput {
    id: string
    label?: string
    onChange?: (value: string) => void
    value?: string | number
    withIcon?: boolean
    onlyNumbers?: boolean
    className?: string
    delay?: number
    required?: boolean
    error?: boolean
    placeholder?: string
}

interface IState {
    inputValue: string | number
}

class Input extends React.Component<IInput, IState> {
    constructor(props: Readonly<IInput>) {
        super(props)

        for (const prop in props) {
            this[prop] = prop
        }
    }

    state = {
        inputValue: '',
    }

    debouncedChange = debounce((value) => {
        this.props.onChange?.(value)
    }, this.props.delay)

    componentDidMount() {
        const { value } = this.props

        if (value) {
            this.setState({
                inputValue: value,
            })
        }
    }

    shouldComponentUpdate(
        nextProps: Readonly<IInput>,
        nextState: Readonly<IState>
    ): boolean {
        const newValue = nextProps.value || ''

        return (
            newValue !== nextState.inputValue ||
            nextProps.error !== this.props.error
        )
    }

    componentDidUpdate(prevProps: IInput, prevState: IState) {
        const newValue = this.props.value

        if (prevProps.value !== newValue && newValue !== prevState.inputValue) {
            this.setState({
                inputValue: newValue || '',
            })
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        this.setState({ inputValue: value })

        this.debouncedChange(value)
    }

    handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const { onlyNumbers } = this.props

        if (onlyNumbers) {
            const regExpForTest = /\d/

            if (
                !['Backspace', 'Tab'].includes(event.key) &&
                !regExpForTest.test(event.key)
            ) {
                event.preventDefault()
            }
        }
    }

    render() {
        const { id, className, label, withIcon, required, error, placeholder } =
            this.props

        const { inputValue } = this.state

        return (
            <div className={className}>
                {label && (
                    <label
                        htmlFor={id}
                        className={`${styles.label} ${
                            error && styles.errorLabel
                        }`}
                    >
                        {label}
                        {required && ' *'}
                    </label>
                )}
                <div className={styles.input}>
                    {withIcon && <Search className={styles.icon} />}
                    <input
                        id={id}
                        className={withIcon ? styles.withIcon : ''}
                        type="text"
                        value={inputValue}
                        onChange={this.handleChange}
                        placeholder={placeholder}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
            </div>
        )
    }
}

export default Input
