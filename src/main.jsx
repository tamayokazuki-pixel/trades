import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminConsole from './AdminConsole.jsx'
import './styles.css'
import './admin.css'

const Root = window.location.pathname.startsWith('/admin') ? AdminConsole : App
createRoot(document.getElementById('root')).render(<StrictMode><Root /></StrictMode>)
