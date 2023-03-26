import Signin from "@/components/Signin";
import SignupSection from "@/components/SignupSection";
import { getProviders, signIn } from "next-auth/react";
import { Fragment } from "react";

const signin = ({ providers }) => {
  return Object.values(providers).map((provider) => (
    <Fragment key={provider.id}>
      <Signin signIn={signIn} provider={provider} />
      <SignupSection provider={provider} signIn={signIn} />
    </Fragment>
  ));
};

export const getStaticProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};

export default signin;
