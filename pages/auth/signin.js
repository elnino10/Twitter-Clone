import Signin from "@/components/Signin";
import { getProviders } from "next-auth/react";

const signin = ({ providers }) => {
  return <Signin />;
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
