import React,{  useState } from 'react'
import { connect } from 'react-redux';
import {login} from '../../../actions/auth';
import {Redirect } from 'react-router-dom';

import Button from '../../resueable/button/Button'
import Label from '../../resueable/lable/Label'
import Alert from '../../UIElements/Alert/Alert'
import './login.css'

const Login =({login,isAuthenticated})=> {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });

    
    const { username, password } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFinish = e => {
        e.preventDefault();
        login(username, password);
        
      };
      if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
      }
    return (
      <>
        <form onSubmit={onFinish}>
          <Alert/>
          
          <Label  for="username" text="Username"/>
          <input type="text" name="username" placeholder="username"  value={username} onChange={onChange}/>
          <Label for="password" text="Password"/>
            <input type="password" name="password" placeholder="password"  value={password} onChange={onChange}/>
            <div>
              <Button
              type="submit" class="btn-primary" text="Login"
              />
                
            </div>
        </form>
      </>    
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);