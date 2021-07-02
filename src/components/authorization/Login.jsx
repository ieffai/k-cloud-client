import React from 'react';
import './authorization.scss';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import { login } from '../../actions/user';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  return (
    <div className="authorization">
      <div className="authorization__header">Login</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Type your email here" />
      <Input value={password} setValue={setPassword} type="password" placeholder="Password" />
      <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>
        Sign In
      </button>
    </div>
  );
}

export default Login;
