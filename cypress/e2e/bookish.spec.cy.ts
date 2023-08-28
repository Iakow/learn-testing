import axios from "axios";

describe('Bookish application', function () {
  before(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  });

  afterEach(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch(err => err)
  })

  beforeEach(async () => {
    const books = [
      {'name': 'Refactoring', 'id': 1},
      {'name': 'Domain-driven design', 'id': 2},
      {'name': 'Building Microservices', 'id': 3}
    ]
    // return books.map((item) => axios.post('http://localhost:8080/books', item,
    //     {headers: {'Content-Type': 'application/json'}}
    //   )
    // )

    await axios.post('http://localhost:8080/books', books[0],
      {headers: {'Content-Type': 'application/json'}}
    )

    await axios.post('http://localhost:8080/books', books[1],
      {headers: {'Content-Type': 'application/json'}}
    )

    await axios.post('http://localhost:8080/books', books[2],
      {headers: {'Content-Type': 'application/json'}}
    )
  })

  it('Shows a book list', () => {
    cy.visit('http://localhost:3000/');
    cy.get('div[data-test="book-list"]').should('exist');
    cy.get('div.book-item').should((books) => {
      // eslint-disable-next-line jest/valid-expect
      expect(books).to.have.length(3);
      // @ts-ignore
      const titles = [...books].map(x => x.querySelector('h2').innerHTML);
      // eslint-disable-next-line jest/valid-expect
      expect(titles).to.deep.equal(
        ['Refactoring', 'Domain-driven design', 'Building Microservices']
      )
    })
  })
})
