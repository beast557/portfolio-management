import React,{  useState } from 'react'
import { connect } from 'react-redux';
import {register} from '../../../actions/auth';
import {Redirect } from 'react-router-dom';

import Button from '../../resueable/button/Button';
import Label from '../../resueable/lable/Label'
import Alert from '../../UIElements/Alert/Alert'

const Register = ({ register, isAuthenticated })=>{
    const [formData, setFormData] = useState({
        username:'',
        password:'',
        confirm_password:'',
        agree:false
        });

        let { confirm_password,username, password, agree} = formData;

        const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const agreeChange = e =>{
            setFormData({...formData, [e.target.name]: !agree });
            
          }
        const onFinish = e => {
          e.preventDefault();
          // console.log("Login")
         
        username = username.toLowerCase().trim()
        register( {username,password, confirm_password,agree } );
        };
        if (isAuthenticated) {
          return <Redirect to='/dashboard' />;
        }
  
    return (
        <form onSubmit={onFinish}>
            <Alert />
            <Label for="username" text ="Username"/>
            <input type="text" name="username" placeholder="username"  value={username} onChange={onChange}/>
            <Label for="password" text ="Password"/>

            <input type="password" name="password" placeholder="password"  value={password} onChange={onChange}/>
            <Label for="confirm password" text ="Confirm Password"/>
            <input type="password" name="confirm_password" placeholder="password"  value={confirm_password} onChange={onChange}/>
            <div>
            <input type="checkbox" name = "agree" value={agree}  onChange={agreeChange}/>
                {/* <InputBox type="checkbox" name="agree" /> */}
                <span>I agree to every this website terms and agreements</span>
            </div>
            <div>
                <Button type="submit" className="btn-primary" text="Sign up"/>
            </div>
        </form>
    )
}



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(
    mapStateToProps,
    {  register }
  )(Register);