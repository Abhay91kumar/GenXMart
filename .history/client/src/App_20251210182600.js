import React from 'react'
import Header from './Components/Headers/Header'
import Page from './Components/MainPages/Page'
import {BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import AdminDetail from './Components/MainPages/AdminDetail'
import Footer from './Components/Headers/Footer'



const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className='App'>
      <Header/>
      <Page/>
      <AdminDetail />
      <Footer />
    </div>
    </Router>
    </DataProvider>
  )
}

export default App
