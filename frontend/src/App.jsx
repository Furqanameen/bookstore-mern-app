import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateBook from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import Home from './pages/Home'
import DeleteBook from './pages/DeleteBook'
import EditeBook from './pages/EditBook'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/details/:id' element={ <ShowBook /> } />
      <Route path='/books/delete/:id' element={ <DeleteBook />} />
      <Route path='/books/edit/:id' element={ <EditeBook />} />
    </Routes>
  )
}

export default App