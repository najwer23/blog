import { createSelectors } from '@app/store/createSelectors';
import { create } from 'zustand';
import type { PostJson, PostSection, PostSectionData } from './Post.types';

type PostStore = {
  postJson: PostJson;
  sectionId: number;
  sectionIdDialogOpen: boolean;
  setBlogJson: (updater: (prev: PostJson) => PostJson) => void;
  openSectionIdDialog: (id: number) => void;
  closeSectionIdDialog: () => void;
  addTitleSection: () => void;
  removeSection: (index: number) => void;
  updateSection: (updatedSection: PostJson['sections'][number]) => void;
  updateSectionData: <K extends PostSection['name']>(index: number, name: K, data: PostSectionData<K>) => void;
};

const usePostStoreBase = create<PostStore>()((set) => ({
  postJson: {
    title: 'post title',
    id: '1',
    sections: [],
  },
  sectionId: 0,
  sectionIdDialogOpen: false,
  setBlogJson: (updater) =>
    set((state) => ({
      postJson: updater(state.postJson),
    })),
  openSectionIdDialog: (id) =>
    set({
      sectionId: id,
      sectionIdDialogOpen: true,
    }),
  closeSectionIdDialog: () =>
    set({
      sectionIdDialogOpen: false,
    }),
  addTitleSection: () =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: [
          ...state.postJson.sections,
          {
            name: 'post-title',
            data: {
              title: '#',
              date: '29/03/2026',
            },
          },
        ],
      },
    })),
  removeSection: (index) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.filter((_, i) => i !== index),
      },
    })),
  updateSection: (updatedSection) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.map((section, index) =>
          index === state.sectionId ? updatedSection : section,
        ),
      },
    })),
  updateSectionData: <K extends PostSection['name']>(index: number, name: K, data: PostSectionData<K>) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.map((section, i) =>
          i === index && section.name === name ? ({ ...section, data } as PostSection) : section,
        ),
      },
    })),
}));

export const usePostStore = createSelectors(usePostStoreBase);
