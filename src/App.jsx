import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

const App = () => {
  // blogs
  const [blogs, setBlogs] = useState([]);
  // login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // blogs post
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // notification
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState("notification");

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
      setNotifType("error");
      setNotification("Wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
      setNotifType("notification");
      setNotification(
        `a new blog "${newBlog.title}" by ${newBlog.author} added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      {user === null ? (
        <>
          <h2>Login</h2>

          <Notification message={notification} notifType={notifType} />

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

          <Notification message={notification} notifType={notifType} />

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
