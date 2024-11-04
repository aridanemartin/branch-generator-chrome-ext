import { useContext } from "react";
import { adjectives } from "../../json/adjectives";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import "./RandomAdjectiveSelector.scss";

interface RandomAdjectiveSelectorProps {
  preferencesSection: string;
  preferencesField: string;
}

export const RandomAdjectiveSelector = ({
  preferencesSection,
  preferencesField,
}: RandomAdjectiveSelectorProps) => {
  const { dispatch } = useContext(PreferencesContext);

  const handleSelected = (value: string) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: value,
    });
  };

  const handleRandomAdjective = async () => {
    const selectedAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    handleSelected(selectedAdjective);
  };

  return (
    <button className="randomAdjectiveButton" onClick={handleRandomAdjective}>
      Set Random Adjective
    </button>
  );
};
