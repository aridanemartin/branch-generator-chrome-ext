import { ChangeEvent, useContext } from "react";
import {
  PreferencesContext,
  PreferencesState,
} from "../../contexts/PreferencesContext";
import "./Select.scss";
interface SelectProps {
  baseClassName?: string;
  optionsList: string[];
  preferencesSection: string;
  preferencesField: string;
}

export const Select = ({
  baseClassName,
  optionsList,
  preferencesSection,
  preferencesField,
}: SelectProps) => {
  const { state, dispatch } = useContext(PreferencesContext);

  const handleSelected = (e: ChangeEvent<HTMLSelectElement>) => {
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
    <>
      <select
        className={`select ${baseClassName}`}
        onChange={handleSelected}
        value={defaultValue || ""}
      >
        {optionsList.map((value) => (
          <option className="select__option" key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};
