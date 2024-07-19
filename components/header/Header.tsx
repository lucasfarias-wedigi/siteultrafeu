import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import NavItem from "./NavItem.tsx";
import VisibilityOnScroll from "../../islands/Header/VisibilityOnScroll.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import { AvailableIcons } from "../ui/Icon.tsx";
import { headerHeight } from "./constants.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Icon from "../ui/Icon.tsx";

/**
 * @titleBy text
 */
export interface benefitsItemsProps {
  text: string;
  image?: AvailableIcons;
  link: string;
}

export interface alertsProps {
  alert: string[];
  benefitsItems: benefitsItemsProps[];
}

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  messageButton?: {
    hide?: boolean;
    link?: string;
  };
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface MenuItens extends SiteNavigationElement {
  /**
   * @titleBy name
   */
  icon?: ImageWidget;
}

export interface Props {
  alerts: alertsProps;

  liveStore?: {
    link: string;
    text: string;
    active?: boolean;
  };

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: MenuItens[] | null;

  /** @title Logo */
  logo?: Logo;
  buttons?: Buttons;

  /**
   * @hide
   */
  openSearchMobile: boolean;
}

function Header({
  alerts,
  liveStore = {
    link: "#",
    text: "LOJA AO VIVO",
    active: false,
  },
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  buttons,
  device,
  openSearchMobile = false,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header
      class={``}
      style={{ height: device !== "desktop" ? "148px" : headerHeight }}
    >
      <Drawers
        menu={{ items }}
        searchbar={searchbar}
        platform={platform}
        logo={logo}
      >
        <div class="bg-white fixed w-full z-50">
          <VisibilityOnScroll handleShow="default">
            {alerts && (
              <Alert
                alerts={alerts.alert}
                benefitsItems={alerts.benefitsItems}
                liveStore={liveStore && liveStore}
              />
            )}
          </VisibilityOnScroll>
          <Navbar
            device={device}
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            logo={logo}
            buttons={buttons}
            benefitsItems={alerts.benefitsItems}
            liveStore={liveStore && liveStore}
          />
          <VisibilityOnScroll handleShow="default">
            <div class="hidden lg:block w-full m-auto max-w-7xl">
              <ul class={`flex gap-4 items-center justify-center`}>
                {items.map((item) => <NavItem item={item} />)}
              </ul>
            </div>
          </VisibilityOnScroll>
        </div>
        <div
          class={`flex items-center justify-center gap-16 lg:hidden fixed z-50 bottom-0 w-full bg-white ${
            openSearchMobile ? "" : "bg-opacity-10 backdrop-blur-sm shadow-lg"
          } h-[66px]`}
        >
          <a class="" href="/account" aria-label="Account">
            <button
              class={`shadow-lg flex items-center justify-center ${
                openSearchMobile ? "bg-white" : "bg-purplePrimary"
              } w-[50px] h-[50px] rounded-full`}
            >
              <svg
                id="LoginIcon"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                class="text-transparent"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.498 20.2422C25.3064 21.4152 23.6885 22.0756 22 22.0756C20.3115 22.0756 18.6936 21.4152 17.502 20.2422C16.3107 19.0695 15.6429 17.4806 15.6429 15.8256C15.6429 14.1706 16.3107 12.5817 17.502 11.4089C18.6936 10.236 20.3115 9.57559 22 9.57559C23.6885 9.57559 25.3064 10.236 26.498 11.4089C27.6893 12.5817 28.3571 14.1706 28.3571 15.8256C28.3571 17.4806 27.6893 19.0695 26.498 20.2422ZM10.5 34.5094C10.5 29.5986 14.5437 25.6068 19.5518 25.6068H24.4482C29.4563 25.6068 33.5 29.5986 33.5 34.5094C33.5 35.0907 33.0188 35.5756 32.4089 35.5756H11.5911C10.9812 35.5756 10.5 35.0907 10.5 34.5094Z"
                  stroke={openSearchMobile ? "#32026A" : "#ffffff"}
                  fill="currentColor"
                  class=""
                />
              </svg>
            </button>
          </a>
          <button
            class="flex items-center justify-center bg-purplePrimary w-[50px] h-[50px] rounded-full"
            {...usePartialSection({
              props: { openSearchMobile: !openSearchMobile },
            })}
          >
            {openSearchMobile
              ? (
                <Icon
                  id="XMark"
                  size={24}
                  strokeWidth={3}
                  class="text-white pointer-events-none"
                />
              )
              : (
                <svg
                  class="pointer-events-none"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2083 24.5417C19.9153 24.5417 24.5417 19.9153 24.5417 14.2083C24.5417 8.50139 19.9153 3.875 14.2083 3.875C8.50139 3.875 3.875 8.50139 3.875 14.2083C3.875 19.9153 8.50139 24.5417 14.2083 24.5417Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M27.125 27.1251L21.5063 21.5063"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
          </button>
          <div
            class={`transition-all absolute ${
              openSearchMobile ? "bottom-[65px]" : "-bottom-[82px]"
            } w-full bg-white`}
          >
            <Searchbar searchbar={searchbar && { ...searchbar, platform }} />
          </div>
          <button
            class={`shadow-lg flex items-center justify-center ${
              openSearchMobile
                ? "bg-white text-purplePrimary"
                : "bg-purplePrimary text-white"
            } w-[50px] h-[50px] rounded-full`}
          >
            {platform === "vtex" && <CartButtonVTEX />}
          </button>
        </div>
      </Drawers>
    </header>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
