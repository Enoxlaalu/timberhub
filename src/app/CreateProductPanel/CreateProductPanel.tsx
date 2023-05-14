import {
    selectSections,
    dimensionsSection,
} from '@/app/CreateProductPanel/sections'
import CreateProductSection from '@/app/CreateProductSection/CreateProductSection'
import { addProduct } from '@/app/api'
import { IDimensions, IProduct } from '@/app/types'
import Input from '@/components/Input/Input'
import RightPanel from '@/components/RightPanel/RightPanel'
import Select from '@/components/Select/Select'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import Plus from 'public/svg/plus.svg'
import Icon from '@/components/Icon/Icon'
import { addMuktaMaheeFont } from '@/helpers/fonts'
import Button from '@/components/Button/Button'

interface ICreateProductPanel {
    opened: boolean
    onClose: () => void
}

const CreateProductPanel: React.FC<ICreateProductPanel> = ({
    opened,
    onClose,
}) => {
    const router = useRouter()
    const [newProduct, setNewProduct] = useState<IProduct>({
        dimensions: [{}],
    } as IProduct)
    const [errors, setErrors] = useState<string[]>([])

    const validate = () => {
        const requiredSelectFields = [
            'usage',
            'species',
            'drying_method',
            'grade',
            'treatment',
        ]
        const requiredInputFields = ['thickness', 'width', 'length']
        let errors: string[] = []

        requiredSelectFields.forEach((id) => {
            if (!newProduct[id]) {
                errors.push(id)
            }
        })

        requiredInputFields.forEach((id) => {
            if (!newProduct.dimensions[0][id]) {
                errors.push(id)
            }
        })

        if (errors.length) {
            setErrors(errors)
            return false
        }

        return true
    }

    const onSubmit = async () => {
        if (validate()) {
            await addProduct(newProduct)
            setNewProduct({
                dimensions: [{}],
            } as IProduct)
            onClose()
            router.refresh()
            setErrors([])
        }
    }

    const addSet = () => {
        setNewProduct({
            ...newProduct,
            dimensions: [...newProduct.dimensions, {} as IDimensions],
        })
    }

    return (
        <RightPanel
            opened={opened}
            onClose={onClose}
            title="Create product"
            submitButton={<Button text="Create product" onClick={onSubmit} />}
        >
            {selectSections.map((section) => (
                <CreateProductSection
                    key={section.id}
                    name={section.name}
                    icon={section.icon}
                >
                    <div className={styles.dataWrapper}>
                        {section.data.map((el) => {
                            const {
                                id,
                                label,
                                required,
                                options,
                                description,
                            } = el

                            if (options) {
                                const onChangeSelect = useCallback(
                                    (value: string) => {
                                        setNewProduct((old) => {
                                            return {
                                                ...old,
                                                [id]: value,
                                            }
                                        })
                                    },
                                    []
                                )

                                return (
                                    <Select
                                        key={id}
                                        label={label}
                                        options={options}
                                        onChange={onChangeSelect}
                                        value={newProduct[id]}
                                        required={required}
                                        description={description}
                                        error={errors.includes(id)}
                                    />
                                )
                            }
                        })}
                    </div>
                </CreateProductSection>
            ))}
            <CreateProductSection
                name={dimensionsSection.name}
                icon={dimensionsSection.icon}
                actionComponent={addMuktaMaheeFont(
                    <span className={styles.addSet} onClick={addSet}>
                        <Icon icon={Plus} />
                        Add another set
                    </span>
                )}
            >
                {newProduct.dimensions.map((_, index) => {
                    const { data } = dimensionsSection

                    return (
                        <div key={index} className={styles.dataWrapper}>
                            {data.map(
                                ({ id, label, required, onlyNumbers }) => {
                                    const onChangeInput = (value: string) => {
                                        const newDimensions = [
                                            ...newProduct.dimensions,
                                        ]
                                        const current = newDimensions[index]
                                        current[id] = value

                                        setNewProduct({
                                            ...newProduct,
                                            dimensions: newDimensions,
                                        })
                                    }

                                    return (
                                        <Input
                                            key={id}
                                            id={id}
                                            label={label}
                                            onChange={onChangeInput}
                                            value={
                                                newProduct.dimensions[index][id]
                                            }
                                            required={index === 0 && required}
                                            error={
                                                index === 0 &&
                                                errors.includes(id)
                                            }
                                            onlyNumbers={onlyNumbers}
                                        />
                                    )
                                }
                            )}
                        </div>
                    )
                })}
            </CreateProductSection>
        </RightPanel>
    )
}

export default CreateProductPanel
