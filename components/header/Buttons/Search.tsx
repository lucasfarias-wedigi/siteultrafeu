import Button from "../../../components/ui/Button.tsx";
// import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class=""
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2083 24.5417C19.9153 24.5417 24.5417 19.9153 24.5417 14.2083C24.5417 8.50139 19.9153 3.875 14.2083 3.875C8.50139 3.875 3.875 8.50139 3.875 14.2083C3.875 19.9153 8.50139 24.5417 14.2083 24.5417Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.125 27.1251L21.5063 21.5063"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <Button
        class=""
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2083 24.5417C19.9153 24.5417 24.5417 19.9153 24.5417 14.2083C24.5417 8.50139 19.9153 3.875 14.2083 3.875C8.50139 3.875 3.875 8.50139 3.875 14.2083C3.875 19.9153 8.50139 24.5417 14.2083 24.5417Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.125 27.1251L21.5063 21.5063"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
    </>
  );
}
