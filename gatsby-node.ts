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
                    frontmatter {
                        path
                    }
                }
            }
        }
    }
    `);

    result.data.allMarkdownRemark.edges.forEach(({node}: any) => {
        createPage({
            path: node.frontmatter.path,
            component: resolve('./src/templates/MdContents.tsx'),
            context:{
                id: node.id
            }
        })
        
    })

}

export {createPages}