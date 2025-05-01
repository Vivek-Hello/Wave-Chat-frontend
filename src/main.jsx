import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import App from './App.jsx'
import store from "./Store/store.js"
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  <Toaster />
    <App />
  </BrowserRouter>
  </Provider>,
)
