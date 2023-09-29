/* eslint-disable react/prop-types */
import { useState, useContext, createContext, useCallback, memo } from 'react';
import axios from 'axios';

const SearchContext = createContext();

const SearchProvider = memo(function SearchProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const apiKey = 'AIzaSyAmvdp_v29Vghsrulv8MBlZancnLdXQWuU'

  const fetchBooks = useCallback(
    async (
      searchQuery = 'JavaScript',
      category = '',
      order = 'relevance', // Default order is by relevance
      maxResults = 20 // Default maximum number of results
    ) => {
      setLoading(true);

      try {
        let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

        // If a category is provided, add it to the API request
        if (category) {
          apiUrl += `+subject:${category}`;
        }

        apiUrl += `&orderBy=${order}`;
        apiUrl += `&maxResults=${maxResults}`;
        apiUrl += `&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const data = response.data.items;
        if (data) {
          const newBooks = data.map((bookSingle) => {
            const { id, volumeInfo } = bookSingle;
            const amount = Math.floor(Math.random() * 50) + 1;
            return {
              id: id,
              authors: volumeInfo.authors?.join(', '),
              averageRating: volumeInfo.averageRating,
              pageCount: volumeInfo.pageCount,
              publishedDate: volumeInfo.publishedDate,
              title: volumeInfo.title,
              description: volumeInfo.description,
              category: volumeInfo.categories, 
              image: volumeInfo.imageLinks?.thumbnail && volumeInfo.imageLinks?.smallThumbnail || `/cover_not_found.jpg`,
              price: amount,
              quantity: 1,
              total: amount * 1
            };
          });

        setBooks(newBooks);

        if (newBooks.length > 0) {
          setSearchResults('Your Search Result');
        } else {
          setSearchResults('No Search Result Found!');
        }
      } else {
        setBooks([]);
        setSearchResults('No Search Result Found!');
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [apiKey]);

  const value = {
    loading,
    books,
    searchResults,
    setSearchResults,
    fetchBooks,
    setLoading,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
});

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchContext, SearchProvider };
SearchProvider.displayName = 'SearchProvider';