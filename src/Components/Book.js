import * as BooksAPI from '../api/BooksAPI';

import React, { useEffect, useState } from "react";

const Book = (props) => {

    const { updateShelf, bookshelf } = props;
    //local state
    const [value, setValue] = useState(props.bookshelf.shelf || 'none');
    const getBookData = async () => {
        const data = await BooksAPI.get(props.bookshelf.id);
        setValue(data.shelf)

    };
    useEffect(() => {
        if (props.searchBook) {
            getBookData();
        }
    });
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${bookshelf.imageLinks ? bookshelf.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'}')` }}></div>
                <div className="book-shelf-changer">
                    <select value={value}
                        onChange={event => updateShelf(bookshelf, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{bookshelf.title}</div>
            <div className="book-authors">{bookshelf.authors ? bookshelf.authors.join(', ') : ''}</div>
        </div>)
}
export default Book; 