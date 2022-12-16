import React from "react";
import { Delete } from "@/components";
import { fundraising_atoms, info_widget_atoms, modal_atoms } from "@/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { trpc } from "src/utils/trpc";
import { Notifications } from "@/utils";

const DeleteFundraising = () => {
  /**
   * Component States
   */
  const { show_delete_fundraising_modal_state } = modal_atoms;
  const { global_fundraising_state } = fundraising_atoms;
  const { show_info_widget_state } = info_widget_atoms;
  const setShowDeleteFundraisingModal = useSetRecoilState(
    show_delete_fundraising_modal_state
  );
  const setShowInfoWidget = useSetRecoilState(show_info_widget_state);
  const [global_fundraising, setGLobalFundraising] = useRecoilState(
    global_fundraising_state
  );
  const utils = trpc.useContext();

  /**
   * Component Functions
   */
  const { mutateAsync, isLoading } = trpc.fundraising.delete.useMutation({
    onSuccess: () => {
      utils.fundraising.get.invalidate();
      Notifications.successNotification("Fundraising Deleted Successfully.");
      setGLobalFundraising(null);
      setShowDeleteFundraisingModal(false);
      setShowInfoWidget(false);
    },
    onError: (error) => {
      Notifications.errorNotification("Something Went Wrong.Please Try Later");
      console.log("error", error.message);
      setShowDeleteFundraisingModal(false);
    },
  });

  return (
    <section>
      <Delete
        close={() => setShowDeleteFundraisingModal(false)}
        deleteItem={() =>
          mutateAsync({
            id: global_fundraising?.id,
          })
        }
        isLoading={isLoading}
      />
    </section>
  );
};

export default DeleteFundraising;
