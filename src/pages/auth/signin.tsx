import { Button, Logo } from "@/components";
import { type InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsGoogle } from "react-icons/bs";

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /**
   * Pages States
   */
  const { data: session } = useSession();
  const router = useRouter();

  /**
   * Pages Functions
   */
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <section className="mt-2 flex h-[35rem] items-center justify-center px-1">
      <section className="flex flex-col items-center justify-center gap-14">
        <div className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-dark bg-white">
          <Logo />
        </div>

        {providers
          ? Object.values(providers).map((provider, provider_index) => {
              if (provider.id !== "email") {
                return (
                  <Button
                    key={provider_index}
                    title="CREATE ACCOUNT WITH GOOGLE"
                    icon={<BsGoogle className="h-[1.5rem] w-[1.5rem]" />}
                    icon_wrapper_styles="bg-white text-dark p-2 rounded-full"
                    intent="primary_yellow"
                    type="large"
                    full_width
                    purpose={() => signIn(provider.id)}
                  />
                );
              }
            })
          : ""}
      </section>
    </section>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
