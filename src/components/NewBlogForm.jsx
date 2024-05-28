const NewBlogForm = ({
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>

      <label>
        title <input type="text" value={title} onChange={handleTitle} />
      </label>
      <br />
      <br />
      <label>
        author <input type="text" value={author} onChange={handleAuthor} />
      </label>
      <br />
      <br />
      <label>
        url <input type="text" value={url} onChange={handleUrl} />
      </label>
      <br />
      <br />

      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;
