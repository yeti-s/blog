import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { open, close } from '../redux/duxes/siderbar'

type Props = {
    id: string,
    title: string,
    children: Array<JSX.Element>
}

export default function SidebarItemMenu({ id, title, children }: Props): React.ReactElement {
    const dispatch = useDispatch()
    const collapsed = useSelector((state:any) => {
        if (state.sidebar[title]) return state.sidebar[title]
        return false
    })

    const openMenu = () => {
        dispatch(open(title))
    }

    const closeMenu = () => {
        dispatch(close(title))
    }

    return (
        <li className="active">
            <a data-toggle="collapse" aria-expanded={!collapsed} onClick={collapsed ? openMenu : closeMenu}
                className={collapsed ? "dropdown-toggle" : "dropdown-toggle collapsed"}>{title}</a>
            <ul className={collapsed ? "collapse list-unstyled" : "collapse list-unstyled show"} id={id}>
                {children}
            </ul>
        </li>
    )
}
