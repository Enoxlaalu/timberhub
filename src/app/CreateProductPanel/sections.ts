import Timber from 'public/svg/timber_big.svg'
import Specifications from 'public/svg/specifications.svg'
import Dimensions from 'public/svg/dimensions.svg'
import { IProductSection } from '@/app/types'

const timberSection = {
    id: 'timber',
    name: 'Sawn Timber',
    icon: Timber,
    data: [
        {
            id: 'usage',
            label: 'Usage',
            required: true,
            options: ['Pallet/Packaging'],
            description: 'This will help us find what fits best to your needs.',
        },
        {
            id: 'species',
            label: 'Wood species',
            required: true,
            options: ['Spruce', 'Pine', 'Apple Tree'],
        },
    ],
}

const specsSection = {
    id: 'specs',
    name: 'Specifications',
    icon: Specifications,
    data: [
        {
            id: 'drying_method',
            label: 'Drying',
            required: true,
            options: ['KD', 'Fresh'],
        },
        {
            id: 'grade',
            label: 'Grade',
            required: true,
            options: [
                'Nordic Blue',
                'Southern Brown',
                'Eastern Red',
                'Western Green',
            ],
        },
        {
            id: 'treatment',
            label: 'Treatment',
            required: true,
            options: ['Treatment 1', 'Treatment 2'],
        },
    ],
}

export const dimensionsSection: IProductSection = {
    id: 'dimensions',
    name: 'Dimensions',
    icon: Dimensions,
    data: [
        {
            id: 'thickness',
            label: 'Thickness',
            required: true,
            onlyNumbers: true,
        },
        {
            id: 'width',
            label: 'Width',
            required: true,
            onlyNumbers: true,
        },
        {
            id: 'length',
            label: 'Length',
            required: true,
            onlyNumbers: true,
        },
    ],
}

export const selectSections: IProductSection[] = [timberSection, specsSection]
