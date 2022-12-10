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

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const { data: session } = useSession();

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
          <OurFundraising />

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
