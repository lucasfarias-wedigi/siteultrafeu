import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton } from "../../islands/Header/Buttons.tsx";
// import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
// import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
// import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
// import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
// import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
// import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "../../components/header/Header.tsx";
import type { benefitsItemsProps } from "../header/Header.tsx";
import VisibilityOnScroll from "../../islands/Header/VisibilityOnScroll.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar({
  // items,
  searchbar,
  logo,
  buttons,
  // logoPosition = "left",
  device,
  liveStore,
}: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons?: Buttons;
  device: "mobile" | "desktop" | "tablet";
  benefitsItems: benefitsItemsProps[];
  liveStore: {
    link: string;
    text: string;
  };
}) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-3 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
      >
        <MenuButton />
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}

        {liveStore && (
          <a href={liveStore.link}>
            <button class="text-sm font-medium bg-greenPrimary text-grayTertiary px-1.5 py-1">
              {liveStore.text}
            </button>
          </a>
        )}
      </div>
    );
  }

  // Desktop header
  return (
    <div class="w-full border-b border-graySecondary shadow-md">
      <div class="hidden sm:grid sm:grid-cols-6 w-full max-w-7xl m-auto py-2">
        <div class={`flex items-center`}>
          {logo && (
            <a href="/" aria-label="Store logo" class="block">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>
        {/* <ul class={`flex gap-6 col-span-1 justify-start`}>
        {items.map((item) => (
          <NavItem item={item} />
        ))}
      </ul> */}
        <div class="flex-none flex items-center justify-end gap-6 col-span-5">
          {/* {!buttons?.hideSearchButton && (
          <div class="flex items-center text-xs font-thin gap-1">
            <SearchButton />
          </div>
        )} */}
          <VisibilityOnScroll handleShow="inverse">
            <button class="flex items-center mr-20 w-full">
              <Icon id="MenuHamburguer" strokeWidth={1} size={44} />
              Todos os produtos
            </button>
          </VisibilityOnScroll>
          <Searchbar searchbar={searchbar} />

          {!buttons?.messageButton?.hide && (
            <a class="" href={buttons?.messageButton?.link || "#"}>
              <Icon id="MessageIcon" size={44} strokeWidth={1} />
            </a>
          )}
          {!buttons?.hideWishlistButton && (
            <a class="flex" href="/wishlist" aria-label="Wishlist">
              <button class="" aria-label="Wishlist">
                <Icon id="WishlistIcon" size={44} strokeWidth={1} />
              </button>
            </a>
          )}
          {!buttons?.hideAccountButton && (
            <a class="" href="/account" aria-label="Account">
              <div class="">
                <Icon id="LoginIcon" size={44} strokeWidth={1} />
              </div>
            </a>
          )}

          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              <button class="text-blueSecondary">
                {platform === "vtex" && <CartButtonVTEX />}
              </button>
              {/* {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
