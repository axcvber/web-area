import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from './theme/Theme'
import { Provider } from 'react-redux'
import store from './store'
import { ModalWrapper } from './components/ModalWrapper '

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Theme>
          <>
            <App />
            <ModalWrapper />
          </>
        </Theme>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
