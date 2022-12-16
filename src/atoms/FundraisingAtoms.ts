import { atom } from "recoil";
import type { Fundraising } from "src/types/typings.t";

const is_editing_fundraising_state = atom<boolean>({
  key: "is_editing_fundraising",
  default: false,
});

const global_fundraising_state = atom<Fundraising | null>({
  key: "global_fundraising",
  default: null,
});

const fundraising_atoms = {
  is_editing_fundraising_state,
  global_fundraising_state,
};

export default fundraising_atoms;
