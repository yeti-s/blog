import React, { useState } from 'react'

type Props = {
    name: string
    href: string
}

export default function SidebarItem({name, href}: Props): React.ReactElement {


    return (
        <li>
            <a href={href}>{name}</a>
        </li>
    )
}
