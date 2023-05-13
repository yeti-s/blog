import React, { useState } from 'react'

type Props = {
    id: string,
    name: string,
    children: Array<JSX.Element>
}

export default function SidebarItemMenu({ id, name, children }: Props): React.ReactElement {
    const [collapsed, setCollapsed] = useState(true)

    const collapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <li className="active">
            <a href={"#"+id} data-toggle="collapse" aria-expanded={!collapsed} onClick={collapse}
                className={collapsed ? "dropdown-toggle" : "dropdown-toggle collapsed"}>{name}</a>
            <ul className={collapsed ? "collapse list-unstyled" : "collapse list-unstyled show"} id={id}>
                {children}
            </ul>
        </li>
    )
}
