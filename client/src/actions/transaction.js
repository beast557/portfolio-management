import axios from 'axios';
import { setAlert } from './alert';

import {CREATE_TRANSACTION_FAILED, FETCH_SHARE_NAME,FETCH_TRANSACTION} from './types'

export const stock_name_only = ()=> async dispatch=>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.get('/api/v1/stock/show_stock_name_only',config);    
     
      dispatch({
        type: FETCH_SHARE_NAME,
        payload:res.data
      });
}
export const create_transaction = ({
    stockId,transaction_type,price,quantity
}) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
if(transaction_type==="default" ||
        price===0 || quantity ===0 || !Number.isInteger(parseInt(stockId))){
            dispatch(setAlert('Every field is required','danger'))
    }
    else{
        const body = JSON.stringify({
            stockId,transaction_type,price,quantity
        })

        try{
            const res = await axios.post('/api/v1/transaction/create_transaction',body,config);
            
            const data = res.data.msg
            if (data) {
                data.forEach(datum => dispatch(setAlert(datum.msg, 'success')));
                dispatch(display_transaction())
              }
        }
     catch (err) {
        const errors = err.response.data.errors;
    
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: CREATE_TRANSACTION_FAILED
        });
      }
    }
}

export const display_transaction = ()=> async dispatch=>{
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const res = await axios.get('/api/v1/transaction/show_user_transaction',config);
      dispatch({
        type: FETCH_TRANSACTION,
        payload:res.data
      }); 
    }catch(err){
      const errors = err.response.data.errors;
    
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
 
    }
 
  }
