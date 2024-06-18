/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

// import ProductCard from "../../components/product/ProductCard.tsx";
import Button from "../../components/ui/Button.tsx";
// import Slider from "../../components/ui/Slider.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
// import { useUI } from "../../sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
}: // platform,
  Props) {
  const id = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useSuggestions(loader);
  // const { products = [], searches = [] } = payload.value ?? {};
  // const hasProducts = Boolean(products.length);
  // const hasTerms = Boolean(searches.length);

  return (
    <form id={id} action={action} class="relative w-full m-auto md:m-0">
      <Button
        class="absolute inset-y-1/4 right-4"
        type="submit"
        aria-label="Search"
        for={id}
        tabIndex={-1}
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19.5756C15.4183 19.5756 19 15.9939 19 11.5756C19 7.15731 15.4183 3.57559 11 3.57559C6.58172 3.57559 3 7.15731 3 11.5756C3 15.9939 6.58172 19.5756 11 19.5756Z"
            stroke="#013B6C"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 21.5756L16.65 17.2256"
            stroke="#013B6C"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <input
        required
        ref={searchInputRef}
        id="search-input"
        class="outline-none border border-graySecondary px-4 py-2.5 w-full"
        name={name}
        onInput={(e) => {
          const value = e.currentTarget.value;

          if (value) {
            sendEvent({
              name: "search",
              params: { search_term: value },
            });
          }

          setQuery(value);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-controls="search-suggestion"
        aria-haspopup="listbox"
        autocomplete="off"
      />
    </form>
  );
}

export default Searchbar;
