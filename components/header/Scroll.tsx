import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export interface Props {
  style?: string;
  children: ComponentChildren;
}

const Scroll = ({ style, children }: Props) => {
  const [isScrolling, setIsScrolling] = useState<number>(0);
  useEffect(() => {
    document.addEventListener("scroll", () =>
      setIsScrolling(globalThis.scrollY)
    );
  }, []);

  return (
    <div class={`${style} ${isScrolling > 104 ? "hidden" : "block"}`}>
      {children}
    </div>
  );
};

export default Scroll;
