// import { headerHeight } from "../../components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "../../components/search/Searchbar.tsx";
// import Modal from "../../components/ui/Modal.tsx";
// import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  // const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return <Searchbar {...searchbar} />;
}

export default SearchbarModal;
