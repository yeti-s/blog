import React, { useState } from 'react'

type Props = {
    title: string
    href: string
}

export default function SidebarItem({title, href}: Props): React.ReactElement {


    return (
        <li>
            <a href={href}>{title}</a>
        </li>
    )
}
