import React, { useState } from 'react'

type Props = {
    children:JSX.Element
}

export default function SidebarContainer({children}:Props):React.ReactElement{

    const [collapsed, setCollapsed] = useState(true)

    const collapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <nav id="sidebar" className={collapsed ? '':'active'}>
            <div className="custom-menu">
                <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={collapse}>
                    <i className="fa fa-bars"></i>
                    <span className="sr-only">Toggle Menu</span>
                </button>
            </div>
            {children}
        </nav>
    )
}
