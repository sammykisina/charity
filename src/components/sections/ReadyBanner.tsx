import React from "react";
import { Button } from "@/components";

const ReadyBanner = () => {
  return (
    <section className="mt-[4rem] flex flex-col gap-3 bg-yellow/90 px-3 py-[4rem] lg:flex-row lg:items-center lg:justify-between">
      <h2 className="flex flex-col  gap-1 text-[2.7rem] font-extrabold uppercase text-dark/80 xs:text-[3rem] sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[3rem]">
        <span className="whitespace-nowrap font-noto">Ready to be do </span>
        <span className="font-noto ">Incredible?</span>
      </h2>

      <div className="flex flex-col gap-5">
        <p className="text-base text-dark/50">
          You give but little when you give of your <br /> possessions. It is
          when you give off yourself you truly serve.
        </p>

        <Button title="Donate Now" type="large" full_width />
      </div>
    </section>
  );
};

export default ReadyBanner;
