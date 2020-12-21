import produce from 'immer';
import { createRequestTypes } from './apiCall';

const intialState = {
  pokemons: [],
  next: null,
  previous: null,
  error: {},
};

export const Constants = {
  MODULE_NAME: 'listPokemons',
};

export const Types = {
  LIST_POKEMONS: createRequestTypes(Constants.MODULE_NAME, 'LIST_POKEMONS'),
  ANNOUNCE_LIST_POKEMONS: `${Constants.MODULE_NAME}/ANNOUNCE_LIST_POKEMONS`,
};

export const reducer = produce((draft = intialState, action) => {
  switch (action.type) {
    case Types.LIST_POKEMONS.SUCCEEDED: {
      const { previous, results, next } = action.payload.data;
      draft.pokemons = results;
      draft.next = next;
      draft.previous = previous;
      return draft;
    }
    case Types.LIST_POKEMONS.FAILED: {
      draft.error = action.payload.data;
      return draft;
    }
    case Types.LIST_POKEMONS.REQUESTED: {
      delete draft.error;
      return draft;
    }
    default:
      return draft;
  }
});

export function announceListPokemons() {
  return {
    type: Types.ANNOUNCE_LIST_POKEMONS,
  };
}
