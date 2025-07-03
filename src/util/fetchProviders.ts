import { signIn, getProviders, ClientSafeProvider, } from "next-auth/react";

export default async function fetchProviders(
    setProviders: (providers: ClientSafeProvider[]) => void,
) {
    const providerList = await getProviders();
    if (providerList) {
        setProviders(Object.values(providerList));
    }
}