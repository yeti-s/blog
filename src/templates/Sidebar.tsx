import React, { FunctionComponent, useState } from 'react'
import { PageProps, graphql } from 'gatsby'

const Blog = ({ data }:PageProps<Queries.File>) => {
    console.log(data);
    /*
    allFile: 
      nodes: Array(2)
        0: {name: 'Hello'}
        1: {name: 'ByeBye'}
    */
    return (
      <div/>
    );
  };
  
  export default Blog;
  
  export const query = graphql`
    query BlogTitles {
      allFile {
        nodes {
          name
        }
      }
    }
  `;