import Image from "next/image";
import React from "react";
import { Curve } from "@/assets";
import { Button, Icon } from "@/components";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const Hero = () => {
  return (
    <section className="pt-2 duration-300 lg:ml-4">
      {/* Titles */}
      <div className="mx-3 flex flex-col gap-[3rem] rounded-[2rem] border border-dark px-4 duration-300 sm:px-5 sm:py-2  ">
        {/* One */}
        <div className="relative flex items-center justify-between duration-300 md:w-[22rem] md:justify-start ">
          <h2 className="font-noto text-[1.8rem] tracking-wider xs:text-[2.2rem] sm:text-[1.6rem] lg:text-[2.5rem] ">
            DO SOMETHING
          </h2>
          <div className="lg: absolute right-0 top-[0.6rem] flex flex-col items-center justify-center lg:-right-[6rem] lg:top-[0.9rem]">
            <div className="h-[1.5rem] w-[6rem] bg-yellow" />
            <Image src={Curve} alt="curve" className="-mt-0 h-fit w-[5rem]" />
          </div>
        </div>

        {/* Two */}
        <div className="relative flex items-center justify-end duration-300 ">
          <div className="absolute left-0 -top-[1.6rem] flex flex-col items-center justify-center  md:relative md:-top-[1rem]">
            <Image
              src={Curve}
              alt="curve"
              className="text-gray-400 mt-[0.12rem] h-fit w-[5rem] rotate-180"
            />
            <div className="h-[1.5rem] w-[6rem] bg-yellow" />
          </div>
          <h2 className="font-noto text-[1.7rem] tracking-wider xs:text-[2.2rem] sm:text-[1.5rem] lg:text-[2.5rem]">
            INCREDIBLE NOW
          </h2>
        </div>
      </div>

      <p className="mt-5 px-4 text-center text-gray">
        We believe giving your{" "}
        <span className="rounded-full bg-yellow px-2 font-semibold text-dark">
          self
        </span>{" "}
        or your{" "}
        <span className="rounded-full bg-yellow px-2 font-semibold text-dark">
          possessions
        </span>{" "}
        is the most incredible service to God and others.
      </p>

      <div className="md: mt-[2rem] flex items-center justify-between  px-4 duration-300 lg:justify-center lg:gap-[5rem] ">
        <Button title="Donate Now" type="large" />

        <Button
          title="How it Works"
          icon={<BsFillPlayFill />}
          icon_wrapper_styles="text-white bg-dark p-2 rounded-full flex justify-center item-center"
          type="large"
          intent="link"
        />
      </div>

      <div className="mt-10 flex h-[10rem] flex-col  items-center  justify-center gap-5 bg-yellow/90 px-2 py-4 duration-300 lg:flex-row lg:gap-10 lg:divide-x lg:divide-dark/10 ">
        <div className="flex w-fit divide-x divide-dark/10  py-[0.7rem] lg:gap-10">
          {/* Section 1 */}
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="font-noto text-[1.5rem] font-bold text-dark lg:text-[2rem] xl:text-[2.5rem]">
                24K
              </span>
              <Icon
                icon={<AiOutlinePlus />}
                icon_wrapper_styles="text-[1.7rem] -ml-[0.5rem]"
              />
            </div>
            <div className="flex flex-col font-extralight text-dark/50">
              <span className="w-[6rem]">Children are </span>
              <span className="w-[7rem]">back to school</span>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex items-center pl-2 lg:pl-5">
            <div className="flex items-center">
              <span className="font-noto text-[1.5rem] font-bold text-dark lg:text-[2rem] xl:text-[2.5rem]">
                $10M
              </span>
              <Icon
                icon={<AiOutlinePlus />}
                icon_wrapper_styles="text-[1.7rem] -ml-[0.5rem]"
              />
            </div>
            <div className="flex flex-col font-extralight text-dark/50">
              <span className="w-[6rem]">Total Money </span>
              <span className="w-[4rem]">Donated</span>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex items-center lg:pl-5">
          <div className="flex items-center">
            <span className="font-noto text-[1.5rem] font-bold text-dark lg:text-[2rem] xl:text-[2.5rem]">
              510
            </span>
            <Icon
              icon={<AiOutlinePlus />}
              icon_wrapper_styles="text-[1.7rem] -ml-[0.5rem]"
            />
          </div>
          <div className="flex flex-col font-extralight text-dark/50">
            <span className="w-[8rem]">Hospitals have </span>
            <span className="w-[7rem]">been build</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
