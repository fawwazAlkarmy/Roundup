import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../services/supabase";

interface Store {
  user: User | null;
  fetchUser: () => Promise<User | null>;
  setUser: (user: User | null) => void;
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
}

const useStore = create<Store>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error.message);
        return null;
      }
      const userData = data?.user || null;
      set({ user: userData });
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  },
  setUser: (user: User | null) => {
    set({ user });
  },
  menuIsOpen: false,
  setMenuIsOpen: (menuIsOpen: boolean) => {
    set({ menuIsOpen });
  },
}));

export default useStore;
