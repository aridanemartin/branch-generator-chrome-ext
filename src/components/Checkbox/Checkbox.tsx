import { useContext, useState } from "react";
import {
  PreferencesContext,
  PreferencesState,
} from "../../contexts/PreferencesContext";
import "./Checkbox.scss";

interface CheckboxProps {
  label: string;
  preferencesSection: string;
  preferencesField: string;
}

export const Checkbox = ({
  label,
  preferencesSection,
  preferencesField,
}: CheckboxProps) => {
  const { state, dispatch } = useContext(PreferencesContext);

  const initialState = Boolean(
    state[preferencesSection as keyof PreferencesState][
      preferencesField as keyof PreferencesState[keyof PreferencesState]
    ]
  );
  const [isEnabled, setIsEnabled] = useState(initialState);

  const handleChange = () => {
    setIsEnabled(!isEnabled);
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: isEnabled ? false : true,
    });
  };

  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        checked={isEnabled}
        onChange={handleChange}
      />
      <span className="checkbox__label">{label}</span>
    </div>
  );
};
