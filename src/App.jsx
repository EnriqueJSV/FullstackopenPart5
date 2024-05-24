import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const blogs = await blogService.getAll();
  //     setBlogs(blogs);
  //   };

  //   getData();
  // }, []);

  const getData = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  // handlers

  const handleInputLoginUser = (e) => {
    setUsername(e.target.value);
  };

  const handleInputLoginPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user); //get token
      setPassword("");
      getData();
    } catch (exception) {
      setPassword("");
      console.log("Wrong credentials");
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

          {`${username} logged in`}

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
