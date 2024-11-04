import React, { useState, useEffect, useContext } from "react";
import { useFetchCharacter } from "../../hooks/useFetchCharacter";
import { getRandomArbitrary } from "../../helpers/getRandomArbitrary";

import { PreferencesContext } from "../../contexts/PreferencesContext";
import "./RandomWordSelector.scss";
import { Select } from "../Select/Select";
import { CasingTypes, SymbolTypes } from "../../const/TaskTypes";
import { Spinner } from "@components/Spinner/Spinner";

interface RandomWordSelectorProps {
  handleLoading: (isLoading: boolean) => void;
  preferencesSection: string;
  preferencesField: string;
}

const apiConfig = {
  rickAndMorty: { url: "https://rickandmortyapi.com/api/character/", max: 52 },
  starWars: { url: "https://swapi.dev/api/people/", max: 82 },
  pokemon: { url: "https://pokeapi.co/api/v2/pokemon/", max: 500 },
  disney: {
    url: "https://api.disneyapi.dev/character/",
    max: 1000,
  },
};

export const RandomWordSelector = ({
  handleLoading,
  preferencesSection,
  preferencesField,
}: RandomWordSelectorProps) => {
  const { dispatch } = useContext(PreferencesContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [limitOfResults, setLimitOfResults] = useState(0);
  const [refetchLoading, setRefetchLoading] = useState(false);

  const handleResult = (result: string) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: result,
    });
  };

  const handleRangeOfResults = (max: number) => {
    setLimitOfResults(getRandomArbitrary(1, max));
  };

  const handleRandomAPIWordSelector = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedApi = apiConfig[e.target.value as keyof typeof apiConfig];
    if (selectedApi) {
      setSelectedOption(e.target.value);
      setSelectedUrl(selectedApi.url);
      handleRangeOfResults(selectedApi.max);
    }
  };

  const { character, isLoading, refetch } = useFetchCharacter(
    selectedUrl,
    limitOfResults
  );

  const handleRefetch = async () => {
    setRefetchLoading(true);
    handleRangeOfResults(
      apiConfig[selectedOption as keyof typeof apiConfig].max
    );
    await refetch({});
    setRefetchLoading(false);
  };

  useEffect(() => {
    if (character) {
      handleResult(character);
      handleLoading(isLoading);
    }
  }, [character, isLoading]);

  return (
    <section className="randomWordSelector">
      <select
        className="randomWordSelector__select"
        onChange={handleRandomAPIWordSelector}
      >
        <option
          className="randomWordSelector__option"
          value=""
          disabled={Boolean(selectedOption)}
        >
          Please choose an option
        </option>
        <option className="randomWordSelector__option" value="rickAndMorty">
          Rick And Morty
        </option>
        <option className="randomWordSelector__option" value="starWars">
          Star Wars
        </option>
        <option className="randomWordSelector__option" value="pokemon">
          Pokemon
        </option>
        <option className="randomWordSelector__option" value="disney">
          Disney
        </option>
      </select>
      <Select
        optionsList={Object.values(SymbolTypes)}
        preferencesSection="releaseBranch"
        preferencesField="randomWordSymbol"
      />
      <Select
        optionsList={Object.values(CasingTypes)}
        preferencesSection="releaseBranch"
        preferencesField="randomWordCasing"
      />
      <button
        className="randomWordSelector__button"
        onClick={handleRefetch}
        disabled={refetchLoading || selectedOption === ""}
      >
        {isLoading ? <Spinner /> : "Refetch!"}
      </button>
    </section>
  );
};
