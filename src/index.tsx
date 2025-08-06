import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
