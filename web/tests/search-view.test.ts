import { shouldScrollToSearchResults } from '../src/search-view.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

assertEqual(
  shouldScrollToSearchResults('', '架构'),
  true,
  'scrolls to search results when a search starts',
);

assertEqual(
  shouldScrollToSearchResults('架构', '架构 反馈'),
  false,
  'does not keep forcing scroll while refining an active search',
);

assertEqual(
  shouldScrollToSearchResults('架构', ''),
  false,
  'does not scroll when search is cleared',
);
