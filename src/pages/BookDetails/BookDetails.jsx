import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Descriptions, Rate, Spin, Typography, message } from 'antd';
import { useSearchContext } from '../../context/searchContext';
import { useCartContext } from '../../context/cartContext';

function BookDetails() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const { books, loading } = useSearchContext();
  const {addToCart} = useCartContext();

  useEffect(() => {
    // Find the book with the matching id in the books data
    const selectedBook = books.find(book => book.id === id);

    // If the book is found, set it as the bookDetails
    if (selectedBook) {
      setBookDetails(selectedBook);
    } else {
      // If the book is not found, you can handle it accordingly  
      message.error('Book not found')
    }
  }, [id, books]);

  if (!bookDetails) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <div style={{padding: 10}}>
      <h1>Book Details</h1>
      <div className='flex'>
        <img src={bookDetails?.image?.thumbnail && bookDetails?.image?.smallThumbnail || `/cover_not_found.jpg`}/>
        <div style={{padding: 10}}>
          <Descriptions title={bookDetails.title} layout='vertical'>
            <Descriptions.Item label="Authors">{bookDetails.authors}</Descriptions.Item>
            <Descriptions.Item label="Description">
            <Typography.Paragraph ellipsis={{rows:4, expandable:true, symbol:'more'}}>{bookDetails.description}</Typography.Paragraph></Descriptions.Item>
            <Descriptions.Item label="Category">{bookDetails.category}</Descriptions.Item>
            <Descriptions.Item label="Published Date">{bookDetails.publishedDate}</Descriptions.Item>
            <Descriptions.Item label="Price">{`$${bookDetails.price}`}</Descriptions.Item>
            <Descriptions.Item label="Ratings"><Rate disabled allowHalf value={bookDetails.averageRating}/></Descriptions.Item>
            {/* Add more book details here */}
          </Descriptions>
          <Button 
          loading={loading} type="primary"
          onClick={() => addToCart(bookDetails)}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;