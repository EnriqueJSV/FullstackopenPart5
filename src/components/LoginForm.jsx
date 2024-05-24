const LoginForm = ({
  user,
  handlerUser,
  password,
  handlerPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username: <input value={user} onChange={handlerUser} />
      </div>
      <br />
      <div>
        Password:
        <input value={password} onChange={handlerPassword} type="password" />
      </div>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
