const gql = require('graphql-tag')

const query = gql`
{
  user(id: 5) {
    firstName
    lastName
  }
}
`

console.dir(query)