import React, { createContext, useState } from 'react';
import { Pokemon } from 'pokenode-ts';

export const SelectedPokemonContext = createContext<{
    pokemonId: number;
    getSelectedPokemon: () => Promise<Pokemon>
}>({
    pokemonId: -1,
    getSelectedPokemon: () => { throw new Error('SelectedPokemonContext is not within scope.') }
});

export const SelectedPokemonContextProvider = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);
}