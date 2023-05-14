import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from 'gatsby'
import { Provider } from "react-redux";

import '../styles.css';

import SidebarContainer from "../sidebar/SidebarContainer";
import SidebarItemContainer from "../sidebar/SidebarItemContainer";
import SidebarItemMenu from "../sidebar/SidebarItemMenu";
import SidebarItem from "../sidebar/SidebarItem";
import ContentsView from "../sidebar/ContemtView";
import store from "../redux/store";

type QueryProps = {
    markdownRemark: {
        html: string,
        frontmatter: {
            title: string,
            date: string,
            categories: Array<string>,
            summary: string,
            // thumbnail: string,
            path: string
        }
    },
    allMarkdownRemark: {
        nodes: {
            id: string,
            frontmatter: {
                title: string,
                date: string,
                menu: string,
                path: string,
            }
        }[]
    }
};

const IndexPage = ({ data }: PageProps<QueryProps>) => {
    const node = data.markdownRemark

    // create sidebar components
    const createSidebarItems = ():Array<React.ReactElement> => {
        let components = Array<React.ReactElement>();
        let dirs = new Map<string, any[]>();
        // create 
        data.allMarkdownRemark.nodes.map(node => {
            let file = {
                id: node.id,
                title: node.frontmatter.title,
                changeTime: node.frontmatter.date,
                dir: node.frontmatter.menu,
                path: node.frontmatter.path
            }
            if (!dirs.hasOwnProperty(file.dir))
                dirs.set(file.dir, [])
            dirs.get(file.dir)?.push(file);
        })
        // create components
        dirs.forEach((files, key, obj) => {
            let children = Array<React.ReactElement>();
            files.forEach((file, index, arr) => {
                children.push(
                    <SidebarItem key={file.id}>
                        <Link to={file.path}>{file.title}</Link>
                    </SidebarItem>
                )
            })
            if (key === '') components = children.concat(components)
            else components.push(<SidebarItemMenu id={key} title={key} children={children} key={key}/>)
        })
        return components;
    }

    return (
        <main>
            <Provider store={store}>
                <div className="wrapper d-flex align-items-stretch">
                    <SidebarContainer>
                        <SidebarItemContainer name="yeti's blog">
                            {createSidebarItems()}
                        </SidebarItemContainer>
                    </SidebarContainer>
                    <ContentsView html={node.html} title={node.frontmatter.title} date={node.frontmatter.date} categories={node.frontmatter.categories} />
                </div>
            </Provider>
        </main>
    )
}

export const Head: HeadFC = () => <title>Home Page</title>

export default IndexPage


export const query = graphql`
query($id: String!) {
    markdownRemark(id:{ eq: $id }) {
            html
            frontmatter {
                title
                date
                categories
                summary
            }
    }
    allMarkdownRemark {
        nodes {
            id
            frontmatter {
                title
                date
                menu
                path
            }
        }
    }
}
`;