import React from "react";
import { SectionTitle } from "@/components";

const OrgThatSupportUs = () => {
  return (
    <section className="mt-[7rem]">
      {/* Title */}
      <SectionTitle
        title="Organization That Support Us"
        section_title_wrapper_styles="flex justify-center"
      />

      {/* Orgs */}
      <div className="mx-2 h-[6rem] border"></div>
    </section>
  );
};

export default OrgThatSupportUs;
