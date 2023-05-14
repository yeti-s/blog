import React, { useState } from 'react'

type Props = {
    title?: string
    href?: string,
    children?: Array<React.ReactElement> | React.ReactElement
}

export default function SidebarItem({title, href, children}: Props): React.ReactElement {


    return (
        <li>
            {
                href ?
                <a href={href}>{title}</a>
                :
                <>{children}</>
            }
        </li>
    )
}
