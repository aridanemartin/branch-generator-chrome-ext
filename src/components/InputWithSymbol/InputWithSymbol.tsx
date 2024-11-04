import { ChangeEventHandler, useContext } from "react";
import {
  PreferencesContext,
  PreferencesState,
} from "../../contexts/PreferencesContext";
import "./Input.scss";

interface InputWithSymbolProps {
  baseClassName?: string;
  preferencesSection: string;
  preferencesField: string;
}

export const InputWithSymbol = ({
  baseClassName,
  preferencesSection,
  preferencesField,
}: InputWithSymbolProps) => {
  const { state, dispatch } = useContext(PreferencesContext);

  const handleSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: e.target.value,
    });
  };

  const defaultValue =
    state[preferencesSection as keyof PreferencesState]?.[
      preferencesField as keyof PreferencesState[keyof PreferencesState]
    ];

  return (
    <input
      className={`${baseClassName}`}
      type="text"
      defaultValue={defaultValue}
      onChange={handleSelected}
    />
  );
};
