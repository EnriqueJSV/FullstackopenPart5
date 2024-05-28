import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setUsername(user.username);
      blogService.setToken(user.token);
      getData();
    }
  }, []);

  const getData = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  // handlers login inputs

  const handleInputLoginUser = (e) => {
    setUsername(e.target.value);
  };

  const handleInputLoginPassword = (e) => {
    setPassword(e.target.value);
  };

  // handlers blogs inputs

  const handleInputBlogTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputBlogAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleInputBlogUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user); //user = token, username, name
      setPassword("");
      getData();
    } catch (exception) {
      setPassword("");
      console.log("Wrong credentials");
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      {user === null ? (
        <>
          <h2>Login</h2>

          <LoginForm
            user={username}
            handlerUser={handleInputLoginUser}
            password={password}
            handlerPassword={handleInputLoginPassword}
            handleSubmit={handleLoginSubmit}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>

          {`${username} logged in `}
          <button onClick={logOut}>Logout</button>

          <NewBlogForm
            title={title}
            handleTitle={handleInputBlogTitle}
            author={author}
            handleAuthor={handleInputBlogAuthor}
            url={url}
            handleUrl={handleInputBlogUrl}
            handleSubmit={handleBlogSubmit}
          />

          <br />
          <br />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
