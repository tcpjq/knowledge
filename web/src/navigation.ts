export type NavigationSection = {
  id: string;
  docs: string[];
};

export type NavigationModule = {
  id: string;
  sections: NavigationSection[];
};

export function flattenDocIds(modules: NavigationModule[]) {
  return modules.flatMap((module) => module.sections.flatMap((section) => section.docs));
}

export function getAdjacentDocIds(currentId: string, orderedDocIds: string[]) {
  const currentIndex = orderedDocIds.indexOf(currentId);

  if (currentIndex === -1) {
    return {
      previousId: undefined,
      nextId: undefined,
    };
  }

  return {
    previousId: currentIndex > 0 ? orderedDocIds[currentIndex - 1] : undefined,
    nextId: currentIndex < orderedDocIds.length - 1 ? orderedDocIds[currentIndex + 1] : undefined,
  };
}

export function getDefaultExpandedSections(module: NavigationModule | undefined, currentSectionId?: string) {
  if (!module) return [];

  const sectionIds = new Set<string>();
  if (currentSectionId && module.sections.some((section) => section.id === currentSectionId)) {
    sectionIds.add(currentSectionId);
  } else if (module.sections.some((section) => section.id === 'root')) {
    sectionIds.add('root');
  }

  return [...sectionIds];
}
