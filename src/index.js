import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <main className='flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6 sm:px-6 box-border'>
      <div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    </main>
  </React.StrictMode>
)

reportWebVitals()
