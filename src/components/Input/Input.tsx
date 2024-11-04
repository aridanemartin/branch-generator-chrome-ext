import { ChangeEvent, useContext, useRef } from "react";
import {
  PreferencesContext,
  PreferencesState,
} from "../../contexts/PreferencesContext";
import "./Input.scss";

interface InputProps {
  baseClassName?: string;
  preferencesSection: string;
  preferencesField: string;
}

export const Input = ({
  baseClassName,
  preferencesSection,
  preferencesField,
}: InputProps) => {
  const { state, dispatch } = useContext(PreferencesContext);

  const inputValueRef = useRef<HTMLInputElement>(null);

  const defaultValue =
    state[preferencesSection as keyof PreferencesState]?.[
      preferencesField as keyof PreferencesState[keyof PreferencesState]
    ];

  const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: e.target.value,
    });
  };

  return (
    <input
      className={baseClassName}
      ref={inputValueRef}
      onChange={handleSelected}
      defaultValue={defaultValue}
    />
  );
};
