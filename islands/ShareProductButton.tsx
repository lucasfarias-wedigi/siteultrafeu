import Icon from "../components/ui/Icon.tsx";

interface Props {
  productName: string;
}

const ShareProductButton = ({ productName }: Props) => {
  const share = () => {
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: document.title,
          text: productName,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  return (
    <button onClick={share}>
      <Icon id="sharePdp" strokeWidth={1} size={44} />
    </button>
  );
};

export default ShareProductButton;
