import Banner from "../../components/Banner/Banner";
import { useSearchContext } from "../../context/searchContext";
import Book from '../../components/Book/Book';
import { useEffect } from "react";
import { Spin } from "antd";

function Home() {
  const {books, fetchBooks, loading, setLoading} = useSearchContext()

  useEffect(()=>{
    setLoading(true);
    fetchBooks();
    setLoading(false);
}, [fetchBooks, setLoading])

  if(loading) <Spin spinning/>

  return (
    <>
      <Banner pageTitle="Home"/>
      <section className="book">
        {books.map((book, index) => {
          return (loading ? ( <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>): <Book key={index} book={book}/>)
        })}
      </section>
    </>
  )
}

export default Home