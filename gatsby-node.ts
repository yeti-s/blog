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

// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions;

//     // 새로운 노드가 생성 됐을떄 실행 되는 함수 
//   if (node.internal.type === `MarkdownRemark`) {
//       // markdown 노드가 생성 될떄만 콘솔 찍음
//       const fileNode = getNode(node.parent)
//       const slug = createFilePath({ node, getNode, basePath : 'pages' })
//       createNodeField({
//           node,
//           name : `slug`,
//           value : slug,
//       })
//     console.log(createFilePath({ node, getNode, basePath : `pages`}))
//     //파일명으로 정보를y 얻어옴
//     console.log(`\n`, fileNode.relativePath)
//   }
// }


// exports.createPages = async ({ graphql, actions }) => {
//     // **Note:** The graphql function call returns a Promise
//     // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
//     const { createPage } = actions;
    
//     const result = await graphql(`
//       query {
//         allMarkdownRemark {
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     `)
  
//     console.log(JSON.stringify(result, null, 4))

//     result.data.allMarkdownRemark.edges.forEach(({node}) => {
//        createPage({
//            // slug를 만들고 -> page를 만든다
//            path : node.fields.slug,
//            component : path.resolve(`./src/templates/blog-spots.js`),
//            context : {
//                 // Data passed to context is available
//                 // in page queries as GraphQL variables.
//                 slug: node.fields.slug,
//            }
//        })
//     })
//   }  