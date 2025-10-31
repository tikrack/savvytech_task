import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/app.css'
import HomePage from './pages/HomePage'

createRoot(document.getElementById('root')).render(<HomePage />)
