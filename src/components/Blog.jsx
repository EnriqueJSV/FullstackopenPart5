import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hidden = <>
  {blog.title} by {blog.author}{" "}
  <button onClick={toggleVisibility}>view</button>
  </>

  const notHidden = <>
  {blog.title} by {blog.author}{" "}
  <button onClick={toggleVisibility}>hide</button>
  <br />
  {blog.url}
  <br />
  likes: {blog.likes} <button>like</button>
  <br />
  {blog.author}
  </>

  return (
    <div className="blog">
      {visible ? notHidden : hidden}
    </div>
  );
};

export default Blog;
