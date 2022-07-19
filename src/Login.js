import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER_LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
      user {
        id
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [login, { data, loading, error }] = useMutation(REGISTER_LOGIN);
  const handleRegister = async (e) => {
    e.preventDefault();

    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((res) => {
        localStorage.setItem('mgtoken', res.data.login.token);
        localStorage.setItem('mguserid', res.data.login.user.id);
        navigate('/home');
      })
      .catch(() => {
        alert('cant login');
      });
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button className="button button-primary" type="sumbit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
