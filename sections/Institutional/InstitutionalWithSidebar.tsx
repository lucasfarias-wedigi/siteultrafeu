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
    <div class="bg-whitePrimary py-4">
      <div class="flex max-w-7xl w-full mx-auto">
        <div class="max-w-[280px] w-full hidden lg:block">
          <nav class="divide-y divide-grayTertiary">
            {loader?.links.map(({ label, url }, index) => {
              const isActive = index === loader.activeIndex;

              return (
                <a
                  data-active={isActive}
                  key={url}
                  href={url}
                  class={`hover:bg-grayTertiary text-sm border-x border-grayTertiary w-full py-4 flex items-center justify-center ${
                    index === 0 ? "border-t" : ""
                  } ${
                    index === (loader?.links.length - 1) ? "!border-b" : ""
                  } ${isActive ? " bg-grayTertiary" : "bg-white"}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </div>
        <div class="w-full">
          <div class="max-w-3xl">
            {sections &&
              sections?.map(({ Component, props }) =>
                Component ? <Component key={useId()} {...props} /> : <></>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalWithSidebar;
