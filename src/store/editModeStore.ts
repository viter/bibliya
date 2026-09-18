import { create } from 'zustand';

interface EditModeStore {
  editMode: boolean;
  toggleEditMode: () => void;
}

export const useEditModeStore = create<EditModeStore>((set) => ({
  editMode: false,
  toggleEditMode: () => set((s) => ({ editMode: !s.editMode })),
}));
