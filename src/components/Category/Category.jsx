import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, Select, Space, Spin, Typography } from 'antd';
import { useSearchContext } from '../../context/searchContext';
import Book from '../../components/Book/Book';


const { Option } = Select;
const items = [
  {
    label: 'Category',
    key: 'category',
    children: [
      {label: "Fiction",key: "fiction"},
      {label: "Fantasy",key: "fantasy"},
      {label: "Historical",key: "historical"},
      {label: "Philosophy",key: "philosophy"},
      {label: "Sci-Fi",key: "sci"},
      {label: "Computers",key: "computers"},
      {label: "Psychology",key: "psychology"},
      {label: "Business",key: "business"},
      {label: "Politics",key: "politics"},
      {label: "Technology",key: "technology"},
      {label: "Health",key: "health"},
      {label: "Languages",key: "languages"},
    ],
  },
];

function Category() {
  const [current, setCurrent] = useState('category');
  const [sortOrder, setSortOrder] = useState('az');
  const [selectedOrder, setSelectedOrder] = useState('relevance'); // Default order is by relevance
  
  const {books, loading, fetchBooks} = useSearchContext();
  const { category = 'fiction'} = useParams();
  
  useEffect(() => {
    fetchBooks(category,);
  }, [fetchBooks, category, selectedOrder]);

  const handleOrderChange = (value) => setSelectedOrder(value);

  const onMenuClick = (item) => {
    // console.log(item.key);
    setCurrent(item.key);
    fetchBooks('', item.key);
  };
  
  const getSortedBooks = () => {
    const sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === 'az') {
        return titleA.localeCompare(titleB);
      }
      if (sortOrder === 'za') {
        return titleB.localeCompare(titleA);
      }
      if (sortOrder === 'authors') {
        return a.authors.localeCompare(b.authors);
      }
      if (sortOrder === 'lowHigh') {
        return a.price - b.price;
      }
      if (sortOrder === 'highLow') {
        return b.price - a.price;
      }
    });
    return sortedBooks;
  };

  const sortedBooks = getSortedBooks();

  return (
  
  <>
        <Menu onClick={onMenuClick} selectedKeys={[current]} mode="horizontal" items={items} />
        
        <Space size='large'>
          <Space align='baseline' style={{padding: 8}}>
            <Typography.Paragraph>Sort books by:</Typography.Paragraph>
            <Select
            defaultValue="relevance"
            style={{ width: 120 }}
            onChange={handleOrderChange}>
            <Option value="relevance">Relevance</Option>
            <Option value="newest">Newest</Option>
            </Select>
          </Space>
          
          <Space align='baseline' style={{padding: 8}}>
            <Typography.Paragraph>View Books by:</Typography.Paragraph>
            <Select
              onChange={(value) => setSortOrder(value)}
              value={sortOrder}
              defaultValue={'az'}
              options={
              [
                {label:'Title: A-Z', value:'az',},
                {label:'Title: Z-A', value:'za',},
                {label:'Authors', value:'authors',},
                {label:'Price: Low to High', value:'lowHigh'},
                {label:'Price: High to Low', value:'highLow'}
              ]}></Select>
          </Space>
        </Space>

    {loading ? (<Spin className="flex flex-c" spinning/>): 
      (<div>
        {/* <div className='section-title container'>
          <h2>{searchResults}</h2>
        </div> */}
        <section className="book">
        {sortedBooks.map((book, index) => {
          return <Book key={index} book={book}/>
        })}
        </section>
      </div>)}
  </>
  
  );
}

export default Category