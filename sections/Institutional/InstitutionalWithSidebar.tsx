import { Section } from "deco/blocks/section.ts";
import { NavigationLoader } from "../../loaders/sidebarMenu.ts";
import { useId } from "../../sdk/useId.ts";

interface Props {
  /** @title Navegação Lateral */
  loader?: NavigationLoader;

  /** @title Seções */
  sections?: Section[];
}

const InstitutionalWithSidebar = ({ loader, sections }: Props) => {
  return (
    <div class="pt-8 px-4 lg:px-9">
      <div class="flex">
        <div class="w-full max-w-sm hidden lg:block">
          <nav>
            {loader?.links.map(({ label, url }, index) => {
              const isActive = index === loader.activeIndex;

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
            })}
          </nav>
        </div>
        <div class="w-full">
          <div class="max-w-3xl">
            {sections && sections?.map(({ Component, props }) =>
              Component ? <Component key={useId()} {...props} /> : <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalWithSidebar;
