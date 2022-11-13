import { PokemonSpecies } from 'pokenode-ts';
import React, { createContext, useState } from 'react';
import { SpeciesMap } from '../constants/SpeciesMap.constant';

export const SpeciesMapContext = createContext<{
    getSpeciesMap: () => Promise<SpeciesMap>;
}>({
    getSpeciesMap: () => { throw new Error('SpeciesMapContext is not within scope.') }
});

export const SpeciesMapContextProvider = () => {
    const [ speciesMap, setSpeciesMap ] = useState<SpeciesMap | null>(null);

    function loadSpecies(): Promise<PokemonSpecies[]> {
        return fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(result => {
                console.log('Pokemon species', result);
                return result.json();
            })
            .catch(e => {
                console.log("ERROR: Failed to load Pokemon species.", e);
                return [];
            })
    }


    function buildSpeciesMap(species: PokemonSpecies[]): SpeciesMap {
        let species_map: SpeciesMap = {};
        species.forEach(entry => {
            for (let i = 0; i < entry.name.length; i++) {
                species_map = spreadNameOntoMap(entry.name, entry.id, species_map);
            }
        });
        return species_map;
    }

    function spreadNameOntoMap(species_name: string, species_id: number, species_map: SpeciesMap, index: number = 0): SpeciesMap {
        const char = species_name[index].toLowerCase();
        if (!species_map[char]) {
            species_map[char] = {};
        }
        if (index === species_name.length - 1) {
            (species_map[char] as SpeciesMap)['id'] = String(species_id);
            (species_map[char] as SpeciesMap)['name'] = species_name;
        } else {
            species_map = spreadNameOntoMap(species_name, species_id, species_map, index+1);
        }
        return species_map;
    }

    function getSpeciesMap(): Promise<SpeciesMap> {
        return new Promise(resolve => {
            if (!speciesMap) {
                loadSpecies()
                    .then(species => {
                        const species_map = buildSpeciesMap(species);
                        resolve(species_map);
                        setSpeciesMap(species_map);
                    })
            } else {
                resolve(speciesMap);
            }
        });
    }

    return <SpeciesMapContext.Provider value={{ getSpeciesMap: getSpeciesMap }} ></SpeciesMapContext.Provider>
}