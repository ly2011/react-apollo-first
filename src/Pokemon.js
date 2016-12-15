import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

export const Pokemon = ({data: {loading, pokemon, error}}) => {
  if (loading) {
    return (
      <div>Loading</div>
    )
  }
  if (error) {
    return (
      <h1>Error</h1>
    )
  }
  return (
    <div>
      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      )}
    </div>
  )
}

export const POKEMON_QUERY = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      name
      image
    }
  }
`

export const withPoken = graphql(POKEMON_QUERY, { options: {
  variables: { name: 'charmander' }
}})

export default withPoken(Pokemon)