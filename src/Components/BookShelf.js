import Book from './Book'

const BookShelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(bookshelf => (
                        <li key={bookshelf.id}>
                            <Book updateShelf={props.updateShelf} bookshelf={bookshelf} shelf={props.shelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf