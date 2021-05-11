import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
  query  {
    allBooks  {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ALL_AUTHORS = gql`
  query  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $authorName: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      authorName: $authorName,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
    }
  }
  `

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
     login(username: $username, password: $password) {
          value
      }
    }
  `

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`