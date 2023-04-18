import Signin from "@/components/Signin";
import SigninWidget from "@/components/SigninWidget";
import { getProviders, signIn } from "next-auth/react";
import { Fragment } from "react";

const signin = ({ providers }) => {
  return Object.values(providers).map((provider) => (
    <Fragment key={provider.id}>
      <Signin signIn={signIn} provider={provider} />
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
