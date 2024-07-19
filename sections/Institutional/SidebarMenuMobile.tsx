// deno-lint-ignore-file no-explicit-any
import { NavigationLoader } from "../../loaders/sidebarMenu.ts";
// import Carrousel, {
//   Props as CarrouselProps,
// } from "../../components/layout/Carousel.tsx";

interface SidebarMenuMobileProps {
  loader: NavigationLoader;
  // sliders: CarrouselProps;
}

const LinkItem = ({ url, label, index, activeIndex }: any) => {
  const isActive = index === activeIndex;
  return (
    <a
      data-active={isActive}
      key={url}
      href={url}
      class="text-sm text-start w-full py-2 px-4"
    >
      {label}
    </a>
  );
};

const SidebarMenuMobile = ({ loader }: SidebarMenuMobileProps) => {
  return (
    <div class="px-4 lg:hidden mb-4">
      {
        /* <Carrousel
        {...sliders}
        children={loader.links.map((item, index) => (
          <LinkItem
            url={item.url}
            label={item.label}
            index={index}
            activeIndex={loader.activeIndex}
          />
        ))}
      /> */
      }
      <div className="dropdown w-full bg-white">
        <div
          tabIndex={0}
          role="button"
          className="text-sm flex items-center justify-between px-4 py-2 w-full border border-grayTertiary"
        >
          {loader.links[loader.activeIndex || 0].label}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="text-sm bg-white divide-y border-grayTertiary border-x w-full dropdown-content menu z-[1] shadow p-0"
        >
          {loader.links.map((item, index) =>
            loader.activeIndex === index ? null : (
              <LinkItem
                url={item.url}
                label={item.label}
                index={index}
                activeIndex={loader.activeIndex}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenuMobile;
