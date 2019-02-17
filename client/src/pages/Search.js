import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/BookList";
import { Input,  FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: ""
  };

  componentDidMount() {
    this.setState({books: [], title: ""});
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "" })
      )
      .catch(err => console.log(err));
  };
 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  renderBooks = () => {
    return this.state.books.map((book, i) => {
      return <BookListItem 
        key = {i}  
        title={book.title}
        authors={book.authors}
        description={book.description}
        thumbnail={book.thumbnail}
        link={book.link}
        viewClickHandler={this.handleViewBookClick}
        saveClickHandler={this.handleSaveBookClick}
      />    
    });
  }

  handleViewBookClick = () => {
    console.log("Clicked view book");
  }

  handleSaveBookClick = () => {
    console.log("Clicked save book");      
  }

  handleSearchClick = event => {
    event.preventDefault();
    if (this.state.title) {

      API.searchBooks({ title: this.state.title})
        .then(res => {
          const foundBooks = res.data.items.map(item => {
            let book = {};
            if (item != null &&
                item.volumeInfo != null ) {

              book.title = item.volumeInfo.title;
              book.description = item.volumeInfo.description;
              book.authors = item.volumeInfo.authors.slice();
              book.link = item.volumeInfo.infoLink;

              if (typeof item.volumeInfo.imageLinks !== 'undefined') {
              book.thumbnail = item.volumeInfo.imageLinks.thumbnail;
              }
            }
            return book;
          });
          this.setState({books : foundBooks.slice()})
          this.renderBooks();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h4>Search for and  Save Books of Interest</h4>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Book Title"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleSearchClick}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <div>
              <h4 id="results-lbl">Results</h4>
            {this.state.books.length ? (
              <BookList>
                {this.renderBooks()}  
              </BookList>
            ) : (
              <h4 id="noresults-lbl">No Results to Display</h4>
            )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;