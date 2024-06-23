import {useState} from "react";

export type Hook = {
  set: () => void;
  unset: () => void;
  flip: () => void;
  isEnabled: boolean;
};

export default function useBooleanState(enabled: boolean = false) {
  const [isEnabled, setEnabled] = useState(enabled);

  const set = () => setEnabled(true);
  const unset = () => setEnabled(false);
  const flip = () => setEnabled(!enabled);

  return {set, unset, flip, isEnabled};
};