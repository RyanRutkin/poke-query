import React, { createContext, useState } from 'react';
import { PokemonClient, Pokemon } from 'pokenode-ts';

export const SelectedPokemonContext = createContext<{
    pokemonId: number;
    getSelectedPokemon: () => Promise<Pokemon>
}>({
    pokemonId: -1,
    getSelectedPokemon: () => { throw new Error('SelectedPokemonContext is not within scope.') }
});

export const SelectedPokemonContextProvider = () => {
    const [ pokemonId, setSelectedPokemonId ] = useState<number>(-1);

    const getSelectedPokemon = () => {
        return new Promise<Pokemon>((resolve, reject) => {
            if (pokemonId === -1) {
                reject("Invalid pokemon-id supplied. (-1)");
                return
            }
            
        })
    }
}