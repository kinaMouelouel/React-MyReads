import * as BooksAPI from '../api/BooksAPI';

import React, { useEffect, useState } from "react";

import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';

const ListBooks = () => {
    //local state
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        BooksAPI.getAll().then(books => {
            setBooks(books)
        });
        setIsLoading(false)

    }, []);

    const updateShelf = (book, shelf) => {
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(shelves => {
                book.shelf = shelf;
                setBooks(books.filter(each => each.id !== book.id).concat([book]))

            });
        }
    };
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {!isLoading ? <div><BookShelf books={books.filter(book => book.shelf === "currentlyReading")} bookshelfTitle="Currently Reading" updateShelf={updateShelf} shelf={"currentlyReading"} />
                    <BookShelf books={books.filter(book => book.shelf === "wantToRead")} bookshelfTitle="Want to Read" updateShelf={updateShelf} shelf={"wantToRead"} />
                    <BookShelf books={books.filter(book => book.shelf === "read")} bookshelfTitle="Read" updateShelf={updateShelf} shelf={"Read"} />
                </div> :
                    <div><h3>Loading data...</h3> </div>

                }

            </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
    </div>);
};

export default ListBooks;