const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/User')
const URI = require('./secrets')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = URI.URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!

  }

  type Author {
    name: String!
    id: ID!
    born: Int,
    bookCount: Int


  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]
      allAuthors: [Author!]
      me: User
  }

  type Mutation {
      addBook(
          title: String!
          authorName: String!
          published: Int!
          genres: [String!]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async(root, args) => {

        

        if(args.genre){
          const ni = await Book.find({genres: { $in: [args.genre] }}).populate('author')
          
          return ni
        }

        const ni = await Book.find({}).populate('author')
          
          console.log(ni)
          return ni

          if(args.genre && args.author){
            return books.filter(a => a.genres.includes(args.genre) && a.author === args.author)
          }
          
          if(args.author){
              return books.filter(a => a.author === args.author)
          }
          return books
          
        },
      allAuthors: (root, args) =>  Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Author: {
    bookCount: async (root) => {
      const myBooks = await Book.find().populate('author')
      
      
      const kk = myBooks.filter(a => 
        a.author.name === root.name 
      )

      console.log("KKK: ", kk)

      return kk.length
    }
  },
  Mutation: {
      addBook: async (root, args, context) => {

        console.log("add book")

       const currentUser = context.currentUser
  
       if (!currentUser) {
        throw new AuthenticationError("not authenticated")
       }
      console.log("ARGS: ", args)

      const author = new Author({
        name: args.authorName,
        born: 0,
        id: uuid()
      })
      const book = new Book({ 
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author,
        id: uuid() })  
      
      try {
        await book.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      
      return book

      if(!authors.find(a => a.name === args.author)){
          const author = {name: args.author, id: uuid(), bookCount: null}
          authors = authors.concat(author)

      }

      return book
      },
       editAuthor: async (root, args, context) => {

        const currentUser = context.currentUser
        console.log("current User: ",currentUser)
  
        if (!currentUser) {
        throw new AuthenticationError("not authenticated")
        }
        const author = await Author.findOne({name: args.name})
        if (!author){
          return null
        }

        author.born = args.setBornTo
  
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
        
    },createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log("USER: ", user)
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      console.log("LOGIN")
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) } 
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})