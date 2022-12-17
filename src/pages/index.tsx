import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import {
  Campaigns,
  Hero,
  OrgThatSupportUs,
  OurFundraising,
  ReadyBanner,
} from "@/components";
import { fundraising_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

const Home: NextPage = () => {
  const LIMIT = 6;
  const { featured_fundraising_state } = fundraising_atoms;
  const setFeaturedFundraising = useSetRecoilState(featured_fundraising_state);

  const {
    data: featuredFundraisings,
    isFetching,
    isRefetching,
  } = trpc.fundraising.getFeatured.useQuery({
    limit: LIMIT,
  });

  return (
    <>
      <Head>
        <title>SCD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[45rem] overflow-y-scroll py-4  scrollbar-hide md:h-[41rem]">
        <div>
          {/* Hero */}
          <Hero />

          {/* OurCampaign */}
          <OurFundraising
            featured_fundraising={featuredFundraisings}
            isRefetching={isRefetching}
          />

          {/* Who Do We Help */}
          <Campaigns />

          {/* Org That Support Us */}
          <OrgThatSupportUs />

          {/* Ready Banner */}
          <ReadyBanner />
        </div>

        {/* <div id="about_us" className="h-32 bg-green-500"></div>  */}
      </main>
    </>
  );
};

export default Home;
