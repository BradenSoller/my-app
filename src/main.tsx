import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts' // Import your Redux store

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
    <App />
    </StrictMode>,
  </Provider>
)
