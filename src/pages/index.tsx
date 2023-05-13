import * as React from "react"
import type { HeadFC, PageProps} from "gatsby"
import { graphql } from 'gatsby'
import Blog from "../templates/Sidebar"



const IndexPage = ({ data }:PageProps<Queries.File>) => {
  React.useState(()=>{
    console.log(data)
  })
  return (
    <main>
      <h1>Welcome to my Gatsby site!</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </main>
  )
}

export const Head: HeadFC = () => <title>Home Page</title>

export default IndexPage


export const query = graphql`
{
  allFile {
    nodes {
      size
      base
      changeTime
      relativePath
    }
  }
}
`;