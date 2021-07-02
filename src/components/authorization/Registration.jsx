import React from 'react';
import './authorization.scss';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

function Registration() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className="authorization">
      <div className="authorization__header">Registration</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Type your email here" />
      <Input value={password} setValue={setPassword} type="password" placeholder="Password" />
      <button className="authorization__btn" onClick={() => registration(email, password)}>
        Create account
      </button>
    </div>
  );
}

export default Registration;
