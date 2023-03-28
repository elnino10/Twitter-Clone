import SignOut from "@/components/SignOut";
import { signOut } from "next-auth/react";

const signout = () => {
    return <SignOut signOut={signOut} />
};

export default signout;