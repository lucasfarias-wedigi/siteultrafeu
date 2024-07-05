import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="flex items-center lg:gap-4 border-r border-grayTertiary h-full px-4 py-[15px]">
      <label for="sort" class="sr-only">
        Ordenar por
      </label>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="lg:group-hover:bg-whitePrimary w-min text-sm cursor-pointer outline-none appearance-none h-full"
      >
        {sortOptions
          .map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
                label,
          }))
          .filter(({ label }) => label)
          .map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm">{label}</span>
            </option>
          ))}
      </select>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 10H18"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 14H16"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 18H14"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 6H21"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 18.8125C6.60678 19.255 5.56018 21 5 21M5 21C4.43982 21 3.39322 19.255 3 18.8125M5 21V15"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 5.1875C3.39322 4.74501 4.43982 3 5 3M5 3C5.56018 3 6.60678 4.74501 7 5.1875M5 3V9"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default Sort;
