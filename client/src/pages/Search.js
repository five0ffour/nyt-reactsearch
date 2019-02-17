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

  // component load state initialization
  componentDidMount() {
    this.setState({books: [], title: ""});
  }

  // field data capture on input clicks 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // results component rendering
  renderBooks = () => {
    return this.state.books.map((book, i) => {
      return <BookListItem 
        key = {i}  
        title={book.title}
        authors={book.authors}
        description={book.description}
        thumbnail={book.thumbnail}
        link={book.link}
        viewClickHandler={() => {this.handleViewBookClick(i)}}
        saveClickHandler={() => {this.handleSaveBookClick(i)}}
        />    
    });
  }

  handleViewBookClick = (index) => {
    console.log("Clicked view book", index);
  }

  handleSaveBookClick = (index) => {
    const book = this.state.books[index];
    if (book.title) {
      API.saveBook({
        title: book.title,
        description: book.description,
        authors: book.authors.slice(),
        link: book.link,
        thumbnail: book.thumbnail
      })
        .then(res => this.render())
        .catch(err => console.log(err));
    }
  }

  // main search submit handler, calls google API
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title) {

      API.searchBooks({ title: this.state.title})
        .then(res => {
          this.setState({books : this.mapBookObjects(res).slice()})
          this.renderBooks();
        })
        .catch(err => console.log(err));
    }
  };

  // utility function to map google response to state object
  mapBookObjects = (res) => {
    return res.data.items.map(item => {
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

  }

  // full component render - banner, search box & results
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
                onClick={this.handleFormSubmit}
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