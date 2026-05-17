// src/features/clientStories/viewModels/useClientStoriesViewModel.ts
// ViewModel for the draggable client stories grid.
// Deliberately thin — most logic lives in the view due to GSAP Draggable coupling.

export const useClientStoriesViewModel = () => {
  // This feature's complex GSAP Draggable logic is tightly coupled with DOM refs,
  // so the view manages its own animation state directly.
  // The ViewModel exists as a placeholder for future data-fetching needs.
  return {};
};
