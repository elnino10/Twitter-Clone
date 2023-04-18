import SigninWidget from "@/components/SigninWidget";
import { getProviders, signIn } from "next-auth/react";
import { Fragment } from "react";

const GoogleAuth = ({ providers }) => {
  return Object.values(providers).map((provider) => (
    <Fragment key={provider.id}>
      <SigninWidget provider={provider} signIn={signIn} />
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

export default GoogleAuth;
