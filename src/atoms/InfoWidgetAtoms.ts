import { atom } from "recoil";

const show_info_widget_state = atom<boolean>({
  key: "show_info_widget",
  default: false,
});

const info_widget_atoms = {
  show_info_widget_state,
};

export default info_widget_atoms;
