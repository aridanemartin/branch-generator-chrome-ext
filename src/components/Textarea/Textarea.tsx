import { ChangeEvent, useContext, useRef } from "react";
import {
  PreferencesContext,
  PreferencesState,
} from "../../contexts/PreferencesContext";
import "./Textarea.scss";

interface TextareaProps {
  baseClassName?: string;
  preferencesSection: string;
  preferencesField: string;
}

export const Textarea = ({
  baseClassName,
  preferencesSection,
  preferencesField,
}: TextareaProps) => {
  const { state, dispatch } = useContext(PreferencesContext);

  const TextareaValueRef = useRef<HTMLTextAreaElement>(null);

  const defaultValue =
    state[preferencesSection as keyof PreferencesState]?.[
      preferencesField as keyof PreferencesState[keyof PreferencesState]
    ];

  const handleSelected = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      section: preferencesSection,
      field: preferencesField,
      value: e.target.value,
    });
  };

  return (
    <textarea
      className={`Textarea ${baseClassName}`}
      ref={TextareaValueRef}
      onChange={handleSelected}
      defaultValue={defaultValue}
      rows={3}
    />
  );
};
