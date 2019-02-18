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

  /*********************/
  /* UTILITY FUNCTIONS */
  /*********************/

  resetSearch = () => {
    // clear the search field and trigger a re-render
    this.setState({title :  ""});
  }

  // utility function to map google response to state object
  mapBookObjects = (res) => {
    return res.data.items.map(item => {
      let book = {};

      if (item != null &&
          item.volumeInfo != null ) {
        book.title = item.volumeInfo.title;
        book.description = item.volumeInfo.description;
        book.link = item.volumeInfo.infoLink;

        if (typeof item.volumeInfo.authors !== 'undefined' && item.volumeInfo.authors !== null)
          book.authors = item.volumeInfo.authors.slice();
        else
          book.authors = [];

        if (typeof item.volumeInfo.imageLinks !== 'undefined' && item.volumeInfo.imageLinks !== null)
          book.thumbnail = item.volumeInfo.imageLinks.thumbnail;
        else
          book.thumbnail = "";
        
      }
      return book;
    });

  }
    
  /*******************/
  /* EVENT HANDLERS  */
  /*******************/
  
  // field data capture on input clicks 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleViewBookClick = (index) => {
    console.log("Clicked view book", index);
  }

  handleDeleteBookClick = (index) => {
    console.log("Clicked delete book", index);
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
        .then(res => this.resetSearch())
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

  /**********************/
  /* RENDER FUNCTIONS  */
  /**********************/
  
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
        deleteClickHandler={() => {this.handleDeleteBookClick(i)}}
        isSearchView={true}
        />    
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
        </Row>

        <Row>
          <Col size="md-12">
            <div style={{border: "1px solid lightgrey", borderRadius: "5px", padding: "5px"}}>
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