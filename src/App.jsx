// import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import BookList from "./pages/BookList/BookList"
import BookDetails from "./pages/BookDetails/BookDetails"
import Cart from "./pages/Cart/Cart"
import SearchResult from "./pages/SearchResult/SearchResult"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/:searchTerm" element = {<SearchResult />} />
        <Route path = "/book" element = {<BookList />} />
        <Route path = "/book/:id" element = {<BookDetails />} />
        <Route path = "/cart" element = {<Cart/>} />
      </Routes>
    </>
  )
}

export default App
