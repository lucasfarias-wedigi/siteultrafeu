import type { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

const SectionDivider = ({ children }: Props) => {
  return (
    <div class="flex items-center text-center">
      <div class="w-full bg-[#E2E2E2] h-[1px] mr-4" />
      {children}
      <div class="w-full bg-[#E2E2E2] h-[1px] ml-4" />
    </div>
  );
};

export default SectionDivider;
