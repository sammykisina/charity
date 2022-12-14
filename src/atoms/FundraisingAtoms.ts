import { atom } from "recoil";

const is_editing_fundraising_state = atom({
  key: "is_editing_fundraising",
  default: false,
});

const fundraising_atoms = { is_editing_fundraising_state };

export default fundraising_atoms;
