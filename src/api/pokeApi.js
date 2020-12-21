const baseUrl = 'https://pokeapi.co/api/v2';

export async function findPokemon({ url = baseUrl, pokemon }) {
  const response = await fetch(`${url}/pokemon/${pokemon}`);
  return await response.json();
}

export async function listPokemons({ url = baseUrl }) {
  const response = await fetch(`${url}/pokemon`);
  return await response.json();
}
