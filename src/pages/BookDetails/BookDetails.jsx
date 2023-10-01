import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Descriptions, Rate, Spin, Typography, message } from 'antd';
import { useSearchContext } from '../../context/searchContext';
import { useCartContext } from '../../context/cartContext';

function BookDetails() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const { books, loading, setLoading } = useSearchContext();
  const {addToCart, isBookInCart} = useCartContext();

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

  const addBookToCart = () => {
    setLoading(true);
    addToCart(bookDetails);
    message.success(`${bookDetails.title} has been added to cart`);
    setLoading(false);
  }

  const bookInCart = isBookInCart(bookDetails.id)

  return (
    <div style={{padding: 10}}>
      <h1>Book Details</h1>
      <div className='flex'>
        <img src={bookDetails?.image}/>
        <div style={{padding: 10}}>
          <Descriptions title={bookDetails.title} layout='vertical'>
            <Descriptions.Item label="Authors">{bookDetails.authors}</Descriptions.Item>
            <Descriptions.Item label="Description">
            <Typography.Paragraph ellipsis={{rows:4, expandable:true, symbol:'more'}}>{bookDetails.description}</Typography.Paragraph></Descriptions.Item>
            <Descriptions.Item label="Category">{bookDetails.category}</Descriptions.Item>
            <Descriptions.Item label="Published Date">{bookDetails.publishedDate}</Descriptions.Item>
            <Descriptions.Item label="Price">{`$${bookDetails.price}`}</Descriptions.Item>
            <Descriptions.Item label="Ratings"><Rate disabled allowHalf value={bookDetails.averageRating}/></Descriptions.Item>
          </Descriptions>
          {!bookInCart ? (<Button 
          loading={loading} type="primary"
          onClick={addBookToCart}>Add to cart</Button>) : 
          <Link to='/cart'>
            <Button type='link'>Go to Cart</Button>
          </Link>}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
