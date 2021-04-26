import React,{useEffect} from 'react'

import { connect } from 'react-redux';

import {stock_name_only,display_transaction} from '../../actions/transaction'

import Sidenav from '../UIElements/sidenav/Sidenav'
import TransactionContent from '../Transaction/Transaction'

import Spinner from '../UIElements/spinner/Spinner'

const Transaction = ({
    stocknames,stock_name_only,
    display_transaction,stockname_loading,
    transaction_loading,transaction
})=> {
    useEffect(()=>{
        stock_name_only();
        display_transaction();
    },[display_transaction,stock_name_only])

    return (
        <>
        <Sidenav/>
        <div className="main">
            {stockname_loading || transaction_loading? <Spinner/>:
            <TransactionContent 
            stocknames = {stocknames}
            transactions={transaction}
            />
            }

        </div>
        </>
    )
}

const mapStateToProps = state => ({
    stocknames: state.transaction.stocknames,
    stockname_loading: state.transaction.stockname_loading,
    transaction_loading:state.transaction.transaction_list_loading,
    transaction: state.transaction.transaction
    });
      
    export default connect(
    mapStateToProps,
    {stock_name_only ,display_transaction}
    )(Transaction);