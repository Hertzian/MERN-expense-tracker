import { createContext, useReducer } from 'react'
import axios from 'axios'
// import AppReducer from './AppReducer'

// initial state
const initialState = {
  // transactions: [
  //   { id: 1, text: 'Flower', amount: -20 },
  //   { id: 2, text: 'Salary', amount: 300 },
  //   { id: 3, text: 'Book', amount: -10 },
  //   { id: 4, text: 'Camera', amount: 150 },
  // ],
  transactions: [],
  error: null,
  loading: true,
}

// create context
export const GlobalContext = createContext(initialState)

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // actions
  // delete
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`)

      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    } catch (err) {
      dispatch({ type: 'FAIL_TRANSACTION', payload: err.response.data.error })
    }
  }

  // add
  async function addTransaction(transaction) {
    try {
      const config = { headers: { 'Content-Type': 'Application/json' } }

      const res = await axios.post('/api/v1/transactions', transaction, config)

      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data })
    } catch (err) {
      dispatch({ type: 'FAIL_TRANSACTION', payload: err.response.data.error })
    }
  }

  // get all
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions')

      console.log(res.data)

      dispatch({ type: 'GET_ALL_TRANSACTIONS', payload: res.data.data })
    } catch (err) {
      dispatch({ type: 'FAIL_TRANSACTION', payload: err.response.data.error })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

// reducer
export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (trans) => trans._id !== action.payload
        ),
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }
    case 'GET_ALL_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      }
    case 'FAIL_TRANSACTION':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
