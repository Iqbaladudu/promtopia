import { create } from "zustand";

const useTagModeStore = create((set) => ({
    tagMode: false,
    tagValue: "",
    setTagMode: (val) => set((state) => ({ tagMode: val})),
    setValue: (val) => set((state) => ({ tagValue: val}))
}))

export { useTagModeStore }