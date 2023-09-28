/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Button, Card, Image, Rate, Typography, message } from "antd";
import './Book.css'
import { useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const { Meta } = Card;

function Book({book}) {
  const [loading, setLoading] = useState(false)
  const {addToCart} = useCartContext();

  const addBookToCart = () => {
    setLoading(true);
    addToCart(book);
    message.success(`${book.title} has been added to cart`);
    setLoading(false);
  }

  return (
      <Card className="card"
        cover={<Image height={300} className="bookImg" src={book?.image?.thumbnail && book?.image?.smallThumbnail || `/cover_not_found.jpg`}/>}
        actions={[<Rate disabled allowHalf value={book.averageRating} />, <Button 
          loading={loading} type="link"
          onClick={addBookToCart}>Add to cart</Button>]}
        >
        <Link to={`/book/${book.id}`}>
          <Meta title={book.title}/>
            <Typography.Paragraph ellipsis={{rows:1, expandable:true, symbol:'more'}}>Authors: {book.authors}</Typography.Paragraph>
          <p>Category: {book.category}</p>
          <p>Published Date: {book.publishedDate}</p>
          <Meta description={`$${book.price}`}/>
        </Link>
      </Card>

  )
}

export default Book