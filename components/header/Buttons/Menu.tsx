import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class=""
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <Icon id="MenuHamburguer" size={44} strokeWidth={1} />
    </Button>
  );
}
