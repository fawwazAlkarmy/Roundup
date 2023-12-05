import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../services/supabase";
import { ProfileType } from "../types";

interface Store {
  user: User | null;
  session: Session | null;
  setSession: (session: Session | null) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  setUser: (user: User | null) => void;
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
  getUserProfile: (userId: string) => Promise<ProfileType | null>;
  profile: ProfileType | null;
  image: string | null;
  setImage: (image: string | null) => void;
  isBookmarked: boolean;
  setIsBookmarked: (isBookmarked: boolean) => void;
}

const useStore = create<Store>((set) => ({
  user: null,
  session: null,
  setSession: (session: Session | null) => {
    set({ session });
  },
  initialized: false,
  setInitialized: (initialized: boolean) => {
    set({ initialized });
  },

  setUser: (user: User | null) => {
    set({ user });
  },
  menuIsOpen: false,
  setMenuIsOpen: (menuIsOpen: boolean) => {
    set({ menuIsOpen });
  },
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);
      if (error) {
        console.log(error.message);
        return null;
      }
      const profileData = data?.[0];
      set({ profile: profileData });
      return profileData;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  },
  profile: null,
  image: null,
  setImage: (image: string | null) => {
    set({ image });
  },
  isBookmarked: false,
  setIsBookmarked: (isBookmarked: boolean) => {
    set({ isBookmarked });
  },
}));

export default useStore;
