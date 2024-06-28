import type { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

const CustomDivider = ({ children }: Props) => {
  return (
    <div class="w-full flex items-center text-center gap-14 lg:gap-0 mb-8">
      <div class="w-full bg-[#E2E2E2] h-[1px] mr-4 hidden lg:block" />
      {children}
      <div class="w-full bg-[#E2E2E2] h-[1px] ml-4 hidden lg:block" />
    </div>
  );
};

export default CustomDivider;
