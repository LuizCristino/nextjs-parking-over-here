import { DEFAULT_VALUES } from '@/_config/default-values';
import { SafeCast } from '@/_utilities/safe-cast';
import { useSearchParams } from 'next/navigation';

export function useExtractPaginationFromUrl() {
  const searchParams = useSearchParams();

  const page = SafeCast.number(searchParams.get('page'), 1, { min: 1 });
  const perPage = SafeCast.number(
    searchParams.get('per_page'),
    DEFAULT_VALUES.ITEMS_PER_PAGE_MIN,
    {
      min: DEFAULT_VALUES.ITEMS_PER_PAGE_MIN,
      max: DEFAULT_VALUES.ITEMS_PER_PAGE_MAX,
    }
  );

  return { page, perPage };
}
