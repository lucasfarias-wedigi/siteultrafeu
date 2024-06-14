import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import NavItem from "./NavItem.tsx";

/**
 * @titleBy text
 */
export interface benefitsItemsProps {
  text: string;
  image: ImageWidget;
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
  alerts?: alertsProps;

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
}

function Header({
  alerts,
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
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  buttons,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class="bg-base-100 fixed w-full z-50">
            {alerts && (
              <Alert
                alerts={alerts.alert}
                benefitsItems={alerts.benefitsItems}
              />
            )}
            <Navbar
              device={device}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              buttons={buttons}
            />
            <div class="w-full">
              <ul class={`flex gap-6 items-center justify-center`}>
                {items.map((item) => (
                  <NavItem item={item} />
                ))}
              </ul>
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
