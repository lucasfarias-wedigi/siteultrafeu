import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "apps/website/components/Image.tsx";
import { Logo } from "./Header.tsx";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  logo: Logo;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = ({
  title,
  onClose,
  children,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
}: {
  title: string;
  onClose?: () => void;
  children: ComponentChildren;
  logo: Logo;
}) => (
  <div
    class={`bg-base-100 divide-y-4 divide-grayTertiary max-w-[100vw] ${
      title === "Buscar" ? "h-36" : "h-full"
    }`}
  >
    <div class="flex justify-between items-center pt-2 px-4 pb-3">
      <div class="">
        {/* <span class="font-medium text-2xl">{title}</span> */}
        {logo && (
          <Image
            src={logo.src}
            width={logo.width || 140}
            height={logo.height}
            alt={logo.alt}
          />
        )}
      </div>
      {onClose && (
        <Button aria-label="X" class="" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} class="text-black" />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform, logo }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // left drawer
        open={displayMenu.value || displaySearchDrawer.value}
        onClose={() => {
          displayMenu.value = false;
          displaySearchDrawer.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
            title={displayMenu.value ? "Menu" : "Buscar"}
            logo={logo}
          >
            {displayMenu.value && <Menu {...menu} />}
            {searchbar && displaySearchDrawer.value && (
              <div class="w-screen">
                <Searchbar {...searchbar} />
              </div>
            )}
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => (displayCart.value = false)}
        aside={
          <Aside
            title="Minha sacola"
            onClose={() => (displayCart.value = false)}
            logo={logo}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
