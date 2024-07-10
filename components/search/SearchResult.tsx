import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import CustomPagination from "./CustomPagination.tsx";
import BreadcrumbSlider, { item as SliderProps } from "../BreadcrumbSlider.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /**
   * @hide
   */
  openFilter: boolean;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  SliderItems: SliderProps[];
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: _url,
  openFilter = true,
  SliderItems = [
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
    {
      image: "https://via.placeholder.com/121x103",
      link: "#",
      title: "Chapa e Sanduicheira",
    },
  ],
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);
  const { format = "Show More" } = layout ?? {};
  const id = useId();
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;
  const filtersSelecteds = filters.reduce((total, filter) => {
    const selectedCount = Array.isArray(filter.values)
      ? filter.values.reduce((count, value) => {
        return value.selected ? count + 1 : count;
      }, 0)
      : 0;
    return total + selectedCount;
  }, 0);
  const startIndex = _url.indexOf("/s?q=");
  let endIndex = _url.indexOf("&", startIndex);
  if (endIndex === -1) {
    endIndex = _url.length;
  }
  const initialUrl = _url.substring(startIndex, endIndex);

  const itemsQuantity =
    (pageInfo.recordPerPage || products.length) * (pageInfo.currentPage - 1) +
    products.length;

  const pathTitle = url.pathname;
  const partsTitle = pathTitle.split("/");
  const formattedTitle = partsTitle[1].replace(/-/g, " ");

  return (
    <>
      <div class="">
        <BreadcrumbSlider
          breadcrumb={breadcrumb}
          items={SliderItems}
          title={pageInfo.pageTypes && pageInfo.pageTypes[0] !== "Search"
            ? formattedTitle
            : "Resultado da busca"}
        />
        {(isFirstPage || !isPartial) && (
          <div class="flex border-y border-grayTertiary h-14 mb-8 items-center px-4 lg:px-0">
            <div class="max-w-7xl w-full m-auto flex items-center h-full">
              <button
                class="hidden lg:flex lg:hover:bg-whitePrimary items-center gap-4 text-sm px-4 border-x border-grayTertiary h-full"
                {...usePartialSection({
                  props: { openFilter: !openFilter },
                })}
              >
                Filtrar
                <svg
                  class="pointer-events-none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 21V18"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 21V15"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 6V3"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 9V3"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 18C6.06812 18 5.60218 18 5.23463 17.8478C4.74458 17.6448 4.35523 17.2554 4.15224 16.7654C4 16.3978 4 15.9319 4 15C4 14.0681 4 13.6022 4.15224 13.2346C4.35523 12.7446 4.74458 12.3552 5.23463 12.1522C5.60218 12 6.06812 12 7 12C7.93188 12 8.39782 12 8.76537 12.1522C9.25542 12.3552 9.64477 12.7446 9.84776 13.2346C10 13.6022 10 14.0681 10 15C10 15.9319 10 16.3978 9.84776 16.7654C9.64477 17.2554 9.25542 17.6448 8.76537 17.8478C8.39782 18 7.93188 18 7 18Z"
                    stroke="black"
                  />
                  <path
                    d="M17 12C16.0681 12 15.6022 12 15.2346 11.8478C14.7446 11.6448 14.3552 11.2554 14.1522 10.7654C14 10.3978 14 9.93188 14 9C14 8.06812 14 7.60218 14.1522 7.23463C14.3552 6.74458 14.7446 6.35523 15.2346 6.15224C15.6022 6 16.0681 6 17 6C17.9319 6 18.3978 6 18.7654 6.15224C19.2554 6.35523 19.6448 6.74458 19.8478 7.23463C20 7.60218 20 8.06812 20 9C20 9.93188 20 10.3978 19.8478 10.7654C19.6448 11.2554 19.2554 11.6448 18.7654 11.8478C18.3978 12 17.9319 12 17 12Z"
                    stroke="black"
                  />
                </svg>
              </button>
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={layout?.variant === "drawer"}
              />
              {filtersSelecteds > 0 && (
                <div class="hidden lg:flex items-center text-sm gap-4 px-4">
                  <span class="hidden lg:block">
                    Filtro ({filtersSelecteds})
                  </span>
                  <a href={initialUrl}>
                    <button class="flex gap-1 justify-center items-center bg-whitePrimary w-[81px] h-[34px] rounded-card border-grayTertiary border">
                      <Icon id="XMark" size={18} strokeWidth={2} />
                      Limpar
                    </button>
                  </a>
                </div>
              )}
              <span class="hidden lg:block text-sm m-auto">
                Mostrando {itemsQuantity} produtos de {pageInfo.records}
              </span>
              {format == "Pagination" && (
                <CustomPagination
                  pageInfo={pageInfo}
                  totalProducts={products.length}
                />
              )}
            </div>
          </div>
        )}

        <div class="max-w-7xl m-auto w-full flex flex-row gap-9 px-4 lg:px-0">
          {layout?.variant === "aside" &&
            filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside
              class={`hidden transition-all duration-500 sm:block ${
                openFilter ? "min-w-[278px] opacity-1" : "min-w-0 opacity-0"
              } overflow-hidden`}
            >
              <h4 class="text-purplePrimary text-sm font-bold mb-5">
                FILTRO
              </h4>
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow flex-col" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
            {layout && layout?.format === "Pagination" && products && (
              <div class="m-auto w-fit mt-14">
                <CustomPagination
                  pageInfo={pageInfo}
                  totalProducts={products.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
