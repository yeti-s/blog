import React, { useState } from 'react'

type Props = {
    id: string,
    title: string,
    children: Array<JSX.Element>
}

export default function SidebarItemMenu({ id, title, children }: Props): React.ReactElement {
    const [collapsed, setCollapsed] = useState(true)

    const collapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <li className="active">
            <a data-toggle="collapse" aria-expanded={!collapsed} onClick={collapse}
                className={collapsed ? "dropdown-toggle" : "dropdown-toggle collapsed"}>{title}</a>
            <ul className={collapsed ? "collapse list-unstyled" : "collapse list-unstyled show"} id={id}>
                {children}
            </ul>
        </li>
    )
}
