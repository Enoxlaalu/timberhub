import React, { FunctionComponent, SVGAttributes } from 'react'
import styles from './styles.module.scss'
import { addMuktaMaheeFont } from '@/helpers/fonts'
import Icon from '@/components/Icon/Icon'

interface ICreateProductSection {
    name: string
    icon: FunctionComponent<SVGAttributes<SVGElement>>
    children: React.ReactNode
    actionComponent?: JSX.Element
}

const CreateProductSection: React.FC<ICreateProductSection> = ({
    name,
    icon,
    children,
    actionComponent,
}) => {
    return (
        <section className={styles.section}>
            <Icon icon={icon} />
            <div className={styles.sectionHeader}>
                {addMuktaMaheeFont(<h4>{name}</h4>)}
                {actionComponent}
            </div>
            {children}
        </section>
    )
}

export default CreateProductSection
