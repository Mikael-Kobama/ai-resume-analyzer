import { create } from "zustand";

declare global {
  interface Window {
    puter: {
      auth: {
        getUser: () => Promice<PuterUser>;
        isSignedIn: () => Promise<boolean>;
        signIn: () => Promise<void>;
        signOut: () => Promise<void>;
      };
    };
  }
}
