import React, { createContext, useState } from 'react';
import { PokemonClient } from 'pokenode-ts';

export const PokemonClientContext = createContext<{
    getClient: () => PokemonClient
}>({
    getClient: () => { throw new Error('PokemonClient is either not initialized, or the PokemonClientContext is not within scope.') }
});

export const PokemonClientContextProvider = () => {
    const [ client, _ ] = useState<PokemonClient>(new PokemonClient());

    const getClient = () => client;

    return <PokemonClientContext.Provider value={{ getClient: getClient }} ></PokemonClientContext.Provider>
}
