import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from 'gatsby'

import '../styles.css';

import SidebarContainer from "../sidebar/SidebarContainer";
import SidebarItemContainer from "../sidebar/SidebarItemContainer";
import SidebarItemMenu from "../sidebar/SidebarItemMenu";
import SidebarItem from "../sidebar/SidebarItem";
import ContentsView from "../sidebar/ContemtView";

type AllFiles = {
    allFile: {
        nodes: {
            id: string,
            name: string,
            changeTime: string,
            relativeDirectory: string
        }[]
    }
};

const IndexPage = ({ data }: PageProps<AllFiles>) => {
    React.useState(() => {
        console.log(data.allFile.nodes)
    })

    const createSidebarItems = ():Array<React.ReactElement> => {
        let components = Array<React.ReactElement>();
        let dirs = new Map<string, any[]>();
        // create map
        data.allFile.nodes.map(node => {
            let file = {
                name: node.name,
                changeTime: node.changeTime,
                dir: node.relativeDirectory,
                id: node.id
            }
            if (!dirs.hasOwnProperty(file.dir))
                dirs.set(file.dir, [])
            dirs.get(file.dir)?.push(file);
        })
        // create components
        dirs.forEach((files, key, obj) => {
            let children = Array<React.ReactElement>();
            files.forEach((file, index, arr) => {
                children.push(<SidebarItem name={file.name} href={`${file.id}`} key={file.id}/>)
            })
            if (key === '') components = components.concat(children)
            else components.push(<SidebarItemMenu id={key} name={key} children={children} key={key}/>)
        })
        return components;
    }

    return (
        <main>
            <div className="wrapper d-flex align-items-stretch">
                <SidebarContainer>
                    <SidebarItemContainer name="yeti's blog">
                        {createSidebarItems()}
                    </SidebarItemContainer>
                </SidebarContainer>
                <ContentsView contents="1" />
            </div>
        </main>
    )
}

export const Head: HeadFC = () => <title>Home Page</title>

export default IndexPage


export const query = graphql`
{
  allFile {
    nodes {
      id
      name
      changeTime
      relativeDirectory
    }
  }
}
`;