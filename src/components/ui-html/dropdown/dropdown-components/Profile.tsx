import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
  /**
   * Component States
   */
  const { data: session } = useSession();

  return (
    <section className="flex w-[14rem] flex-col items-center justify-center px-2">
      {/* Profile Image */}
      {session?.user?.image && (
        <div className="circle relative grid h-[60px] w-[60px] place-items-center rounded-full">
          <img
            src={session?.user?.image}
            alt=""
            className=" transfom absolute top-1/2 left-1/2 h-[2.9rem] w-[2.9rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        </div>
      )}

      {/* Name */}
      <div className="mt-2 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          <span className=" font-bold capitalize text-dark/80">
            {session?.user?.name}
          </span>
          <span className=" text-sm font-bold lowercase text-dark/50">
            {session?.user?.email}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className=" tracking-wider text-dark">online</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
