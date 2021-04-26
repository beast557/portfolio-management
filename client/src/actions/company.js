import axios from 'axios';
import { setAlert } from './alert';

import {FETCH_COMPANIES, FETCH_COMPANY} from './types'

export const get_companies = ()=> async dispatch=>{
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const res = await axios.get('/api/v1/stock/show_stocks',config);
      dispatch({
        type: FETCH_COMPANIES,
        payload:res.data
      }); 
    }catch(err){
      const errors = err.response.data.errors;
    
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
 
    }
 
  }


  export const get_company = (companyId)=> async dispatch=>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try{
        const res = await axios.get(`/api/v1/stock/show_stock/${companyId}`,config);
        dispatch({
          type: FETCH_COMPANY,
          payload:res.data
        }); 
      }catch(err){
        const errors = err.response.data.errors;
      
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
   
      }
   
    }