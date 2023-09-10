import * as BooksAPI from '../api/BooksAPI';

import React, { useState } from 'react';

import Book from './Book';
import { Link } from 'react-router-dom';

const Search = () => {
    //local state

    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);


    const onInputChange = (event) => {
        setQuery(event.target.value);

        fetchSearchResult(event.target.value);
    }

    const fetchSearchResult = async (query) => {
        if (query.length > 0) {
            setIsLoading(true);
            try {
                const data = await BooksAPI.search(query, 20);
                setSearchResult(Array.isArray(data) ? data : [])
                setNoResult(Array.isArray(data) ? false : true)


            } catch (err) {

                setSearchResult([]);
                setNoResult(true);
                setIsLoading(false);

            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {

            setSearchResult([]);
            setNoResult(false);
        }

    }

    const updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf)
    }

    return (

        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={onInputChange} value={query} />
                </div>
            </div>
            <div className="search-books-results">
                {isLoading ? (
                    <div><h3>Please Wait...</h3><h4> While We are searching for data related to you input {query}.</h4></div>
                ) : noResult ? (
                    <div><h3>Sorry!!! No Results Found For {query}.</h3> </div>
                ) : (
                    <ol className="books-grid">

                        {searchResult.map(bookshelf => (
                            <li key={bookshelf.id}>
                                <Book updateShelf={updateShelf} bookshelf={bookshelf} shelf={bookshelf.shelf} searchBook="true" />
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );

}

export default Search;