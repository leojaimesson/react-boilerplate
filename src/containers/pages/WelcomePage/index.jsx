import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import WelcomeImage from '../../../assets/welcome.jpg';

import * as callNames from '../../../api/callNames';

import useApiCall from '../../../hooks/useApiCall';

import * as listPokemonsDuck from '../../../redux/ducks/listPokemons';

const Background = styled.div`
  background-color: #ffe16e;
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;

  img {
    height: 250px;
    border: 3px solid white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
    margin: 94px 20px 20px 20px;
  }

  h1 {
    color: black;
    font-weight: bold;
    font-size: 45px;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
`;

function WelcomePage() {
  const { apiCall, data } = useApiCall();
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall(callNames.FIND_POKEMON, { pokemon: 'ditto' });
    dispatch(listPokemonsDuck.announceListPokemons());
  }, [apiCall, dispatch]);

  console.log(data);

  return (
    <Background>
      <img src={WelcomeImage} alt="Dog with a hat and a pipe" />
      <h1>Welcome to the jungle!</h1>
    </Background>
  );
}

export default WelcomePage;
