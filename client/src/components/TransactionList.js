import React, { useContext, useEffect } from 'react'
import Transaction from './Transaction'
import { GlobalContext } from '../context/GlobalState'

const TransactionList = () => {
  // const context = useContext(GlobalContext)
  const { transactions, getTransactions } = useContext(GlobalContext)

  useEffect(()=> {
    getTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // console.log(context)

  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {transactions.map((trans) => (
          <Transaction key={trans._id} transaction={trans} />
        ))}
      </ul>
    </>
  )
}

export default TransactionList
