// deno-lint-ignore-file no-explicit-any
import { NavigationLoader } from "../../loaders/sidebarMenu.ts";
import Carrousel, {
  Props as CarrouselProps,
} from "../../components/layout/Carousel.tsx";

interface SidebarMenuMobileProps {
  loader: NavigationLoader;
  sliders: CarrouselProps;
}

const LinkItem = ({ url, label, index, activeIndex }: any) => {
  const isActive = index === activeIndex;
  return (
    <a
      data-active={isActive}
      key={url}
      href={url}
      class={"w-full max-w-56 block py-3 px-4 rounded-3xl" +
        (
          isActive ? " bg-middleGray" : ""
        )}
    >
      {label}
    </a>
  );
};

const SidebarMenuMobile = ({ loader, sliders }: SidebarMenuMobileProps) => {
  return (
    <div class="px-4 lg:hidden mb-4">
      <Carrousel
        {...sliders}
        children={loader.links.map((item, index) => (
          <LinkItem
            url={item.url}
            label={item.label}
            index={index}
            activeIndex={loader.activeIndex}
          />
        ))}
      />
    </div>
  );
};

export default SidebarMenuMobile;
