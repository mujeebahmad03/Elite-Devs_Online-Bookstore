import Banner from "../../components/Banner/Banner"
import { useSearchContext } from "../../context/searchContext"
import Book from "../../components/Book/Book";
import { Spin } from "antd";


function SearchResult() {
  const {books, loading, searchResults} = useSearchContext()
  
  return (
    <>
      <Banner /> 
      {loading ? ( <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>): 
      (<div>
        <div className='section-title container'>
          <h2>{searchResults}</h2>
        </div>
        <section className="book">
        {books.map((book, index) => {
          return <Book key={index} book={book}/>
        })}
        </section>
      </div>)}
    </>
  )
}

export default SearchResult