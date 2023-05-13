import React, { useState } from 'react'

type Props = {
    name:string
    children: Array<JSX.Element>
}

export default function SidebarItemContainer({ name, children }: Props): React.ReactElement {
    return (
        <div className="p-4 pt-5">
            <h1><a href="/" className="logo">{name}</a></h1>
            <ul className="list-unstyled components mb-5">
                {children}
            </ul>

            {/* <div className="mb-5">
                <h3 className="h6">Subscribe for newsletter</h3>
                <form action="#" className="colorlib-subscribe-form">
                    <div className="form-group d-flex">
                        <div className="icon"><span className="icon-paper-plane"></span></div>
                        <input type="text" className="form-control" placeholder="Enter Email Address" />
                    </div>
                </form>
            </div> */}

        </div>
    )
}




