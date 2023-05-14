"use client"

import CreateProductPanel from "@/app/CreateProductPanel/CreateProductPanel"
import Button from "@/components/Button/Button"
import { addMuktaMaheeFont } from "@/helpers/fonts"
import Plus from "public/svg/plus.svg"
import React, { useState } from "react"

const CreateProductButton = () => {
    const [togglePanel, setTogglePanel] = useState(false)

    const openPanel = () => setTogglePanel(true)
    const closePanel = () => setTogglePanel(false)

    return (
        <>
            {addMuktaMaheeFont(
                <Button
                    type="secondary"
                    text="Create Product"
                    startIcon={Plus}
                    onClick={openPanel}
                />
            )}
            <CreateProductPanel opened={togglePanel} onClose={closePanel} />
        </>
    )
}

export default CreateProductButton
