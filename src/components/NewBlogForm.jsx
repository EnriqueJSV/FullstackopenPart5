import { useState } from "react";

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>

      <label>
        title{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label>
        author{" "}
        <input
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label>
        url{" "}
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </label>
      <br />
      <br />

      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;
