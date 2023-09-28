import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';
import { useSearchContext } from '../../context/searchContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const { fetchBooks } = useSearchContext();
  const navigate = useNavigate();

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = async () => {
    const tempSearchTerm = searchTerm.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
      message.error('Please enter something ...')
    } else {
      await fetchBooks(searchTerm);
      searchRef.current?.focus();
      setTimeout(() => {
        searchRef.current?.blur();
      }, 1);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    navigate(`/${searchTerm}`)
  };

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="Search your favorite book"
                value={searchTerm}
                onChange={handleChange}
                ref={searchRef}
              />
              <button type="submit" className="flex flex-c">
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
