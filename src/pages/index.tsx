import React from "react";
import { Link } from "gatsby";

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to my Gatsby site!</h1>
      <p>This is the home page.</p>
      <p>Go to the <Link to="intro">Blog</Link></p>
    </div>
  );
};

export default IndexPage;