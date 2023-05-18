import { GatsbyNode, graphql } from "gatsby";
import {resolve} from 'path'

const createPages: GatsbyNode["createPages"] = async ({graphql, actions}) => {
    const {createPage} = actions;

    const result = await graphql<any>(`
    {
        allMarkdownRemark {
            edges {
                node {
                    id
                    fileAbsolutePath
                }
            }
        }
        allFile {
            edges{
                node {
                    absolutePath
                    name
                    relativeDirectory
                }
            }
        }
    }
    `);
    
    const nodes:any = {};
    result.data.allFile.edges.forEach(({node}:any) => {
        nodes[node.absolutePath] = `${node.relativeDirectory}/${node.name}`;
    })


    result.data.allMarkdownRemark.edges.forEach(({node}: any) => {
        const path:string = nodes[node.fileAbsolutePath];
        createPage({
            path: path,
            component: resolve('./src/templates/MdContents.tsx'),
            context:{
                id: node.id
            }
        })
        
    })

}

export {createPages}