import { useEffect } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  children: ComponentChildren;
  handleShow: "default" | "inverse";
}

const VisibilityOnScroll = ({ children, handleShow }: Props) => {
  const { showComponent } = useUI();
  const handleScroll = () => {
    const minScroll = 104;
    const isScrolling = scrollY > minScroll;
    showComponent.value = isScrolling;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (handleShow === "inverse") {
    return (
      <div class={`${showComponent.value ? "block" : "hidden"}`}>
        {children}
      </div>
    );
  }
  return (
    <div class={`${showComponent.value ? "hidden" : "block"}`}>{children}</div>
  );
};

export default VisibilityOnScroll;
