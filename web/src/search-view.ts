export function shouldScrollToSearchResults(previousQuery: string, nextQuery: string) {
  return previousQuery.trim().length === 0 && nextQuery.trim().length > 0;
}
