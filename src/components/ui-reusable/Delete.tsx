import React, { type FC } from "react";
import { FiTrash } from "react-icons/fi";
import { Button, ModalClose, SpinnerLoader } from "@/components";

type DeleteProps = {
  deleteItem: any;
  close: () => void;
  isLoading: boolean;
};

const Delete: FC<DeleteProps> = ({ deleteItem, close, isLoading }) => {
  return (
    <section className="px-4">
      <ModalClose close={close} />

      {/* Confirmation */}
      <div className="mt-4 flex justify-center text-dark">
        <p className="flex w-fit flex-col gap-y-3 rounded-[1rem] border border-gray px-3 py-1 text-sm text-[1rem] font-bold tracking-wider">
          Are you sure you want to delete this Record?
          <span className="text-sm font-semibold text-red-500">
            Be aware! This action is not reversible.
          </span>
        </p>
      </div>

      {/* the decision control buttons */}
      <div className="mt-5 flex justify-end gap-x-4 xs:mt-10">
        <Button
          title={isLoading ? <SpinnerLoader color="fill-white" /> : "Delete"}
          type="large"
          intent="danger"
          disabled={isLoading}
          purpose={deleteItem}
        />
      </div>
    </section>
  );
};

export default Delete;
