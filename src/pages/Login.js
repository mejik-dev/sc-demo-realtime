import * as React from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { handleLogin, setEmail, setPassword } = useLogin();

  return (
    <div className="App">
      <h2>Login</h2>
      <p>
        email: <strong>usera@gmail.com</strong> or{" "}
        <strong>userb@gmail.com</strong>
      </p>
      <p>
        ps: <strong>123456</strong>
      </p>
      <form onSubmit={handleLogin}>
        <div className="form">
          <label>Email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="sumbit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
