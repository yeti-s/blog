import React, { ReactElement } from "react";

type Props = {
    title: string,
    date: string,
    categories: Array<string>
    html: string
}

export default function ContentsView({ title, date, html }: Props): ReactElement {
    return (
        <div id="content" className="p-4 p-md-5 pt-5">
            <h1>{title}</h1>
            {date}
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
    )
}