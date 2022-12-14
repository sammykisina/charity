import { atom } from "recoil";

const show_create_or_edit_fundraising_modal_state = atom({
  key: "show_create_or_edit_fundraising_modal",
  default: false,
});

const modal_atoms = { show_create_or_edit_fundraising_modal_state };

export default modal_atoms;
