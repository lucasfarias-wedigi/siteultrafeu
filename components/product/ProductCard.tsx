import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
// import Avatar from "../../components/ui/Avatar.tsx";
// import {
//   default as WishlistButtonVtex,
//   default as WishlistButtonWake,
// } from "../../islands/WishlistButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
// import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  // platform,
  index,
}: Props) {
  const { url, productID, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  // const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:p-4"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-col gap-2">
        <figure class="relative overflow-hidden" style={{ aspectRatio }}>
          {/* Wishlist button */}
          <div
            class={clx(
              "absolute top-0 left-0",
              "z-10 w-full",
              "flex items-center justify-end",
            )}
          >
            {/* Discount % */}
            {
              /* <div class="text-sm px-3">
              <span class="font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div> */
            }
            {
              /* <div class="lg:group-hover:block">
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div> */
            }
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
                "transition-opacity opacity-0 lg:group-hover:opacity-100",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          </a>
        </figure>

        {/* SKU Selector */}
        {
          /* <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === relativeUrl
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </a>
              </li>
            ))}
        </ul> */
        }

        {/* Name/Description */}
        <div class="flex flex-col">
          <h2
            class="text-xs font-bold text-blackPrimary line-clamp-3 mb-1"
            dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
          />

          <p class="line-clamp-2 text-sm text-blackPrimary">{description}</p>
        </div>

        {/* Price from/to */}
        <div class="flex flex-col gap-2">
          <span class="line-through text-base text-grayPrimary">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <span class="text-purplePrimary font-bold text-xl">
            <span class="text-blackPrimary text-sm font-normal mr-2.5">
              À vista
            </span>
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>

        {/* Installments */}
        <span class="gap-2 text-blackPrimary truncate">
          Ou até {installments}
        </span>

        <a
          href={relativeUrl}
          aria-label="view product"
          class="flex w-full h-[41px] font-bold textsm items-center justify-center text-white bg-purplePrimary lg:hidden gap-2.5"
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12.5L12.5401 11.955C14.5865 11.7845 15.0458 11.3375 15.2726 9.29667L15.75 5"
              stroke="white"
              stroke-linecap="round"
            />
            <path d="M4.5 5H16.5" stroke="white" stroke-linecap="round" />
            <path
              d="M4.5 17C5.32843 17 6 16.3284 6 15.5C6 14.6716 5.32843 14 4.5 14C3.67157 14 3 14.6716 3 15.5C3 16.3284 3.67157 17 4.5 17Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M12.75 17C13.5784 17 14.25 16.3284 14.25 15.5C14.25 14.6716 13.5784 14 12.75 14C11.9216 14 11.25 14.6716 11.25 15.5C11.25 16.3284 11.9216 17 12.75 17Z"
              fill="white"
              stroke="white"
            />
            <path d="M6 15.5H11.25" stroke="white" stroke-linecap="round" />
            <path
              d="M1.5 2H2.2245C2.93301 2 3.55061 2.46844 3.72245 3.1362L5.95389 11.8074C6.06665 12.2456 5.97015 12.7098 5.69118 13.0712L4.9741 14"
              stroke="white"
              stroke-linecap="round"
            />
            <path
              d="M15.75 5H4.125L6.375 12.5C7.75 12.5 10.95 12.425 12.75 12.125C14.55 11.825 15 10.75 15 10.25L15.75 5Z"
              fill="white"
            />
          </svg>
          Ver produto
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
