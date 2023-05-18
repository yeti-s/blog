import * as React from "react"
import {useState, useEffect} from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from "gatsby"
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
        fileAbsolutePath: string,
        frontmatter: {
            title: string,
            categories: Array<string>,
            // date: string,
            // summary: string,
            // thumbnail: string,
            // path: string
        }
    },
    allMarkdownRemark: {
        nodes: {
            id: string,
            fileAbsolutePath: string,
            frontmatter: {
                title: string,
                // date: string,
            }
        }[]
    },
    allFile: {
        nodes: {
            name: string,
            // birthTime: string,
            ctime: string,
            relativeDirectory: string,
            absolutePath: string
        }[]
    }
};

const IndexPage = ({ data }: PageProps<QueryProps>) => {
    const [fileInfos, setFileInfos] = useState(new Map<string, any>());
    const [sidebarItems, setSidebarItems] = useState(new Array<React.ReactElement>());
    const [md, setMd] = useState({
        html: '',
        date: '',
        title: '',
        categories: Array<string>()
    })

    // create file infos
    useEffect(() => {
        const infos = new Map<string, any>(); // key = absolutePath, value = file metadata
        data.allFile.nodes.forEach(node => {
            infos.set(node.absolutePath, {
                path: `/${node.relativeDirectory}/${node.name}`.replaceAll("//", '/'),
                menu: node.relativeDirectory.replaceAll('_', ' '),
                date: node.ctime,
                filename: node.name
            });
        })
        setFileInfos(infos);
    },[data.allFile])

    // get .md file metadata from file infos
    useEffect(() => {
        let node = data.markdownRemark;
        if (!fileInfos.has(node.fileAbsolutePath)) return;
        
        let info = fileInfos.get(node.fileAbsolutePath);
        const mdInfo = {
            html: node.html,
            date: info.date,
            title: node.frontmatter.title,
            categories: node.frontmatter.categories
        }
        setMd(mdInfo);
    },[fileInfos, data.markdownRemark])

    // create components
    useEffect(() => {
        if (fileInfos.size == 0) return;

        let components = Array<React.ReactElement>();
        // nodes for creating components
        const nodes = new Map<string, Array<any>>(); // key = menu, value = md metadata
        data.allMarkdownRemark.nodes.forEach(node => {
            let file:any = fileInfos.get(node.fileAbsolutePath);
            file['id'] = node.id;
            file['title'] = node.frontmatter.title;
            if (!nodes.has(file.menu)) {
                nodes.set(file.menu, []);
            }
            nodes.get(file.menu)?.push(file);
        })
        // create components
        nodes.forEach((files, key, obj) => {
            console.log(files)
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
        setSidebarItems(components);
    },[fileInfos, data])


    return (
        <main>
            <Provider store={store}>
                <div className="wrapper d-flex align-items-stretch">
                    <SidebarContainer>
                        <SidebarItemContainer name="yeti's blog">
                            {sidebarItems}
                        </SidebarItemContainer>
                    </SidebarContainer>
                    <ContentsView html={md.html} title={md.title} date={md.date} categories={md.categories} />
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
            fileAbsolutePath
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
            fileAbsolutePath
            frontmatter {
                title
                date
                menu
                path
            }
        }
    }
    allFile {
        nodes {
          name
          birthTime(formatString: "YYYY-MM-DD hh:mm:ss")
          ctime(formatString: "YYYY-MM-DD hh:mm:ss")
          relativeDirectory
          absolutePath
        }
    }
}
`;