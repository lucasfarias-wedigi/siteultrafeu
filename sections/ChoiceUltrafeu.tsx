import Icon from "../components/ui/Icon.tsx";
import { AvailableIcons } from "../components/ui/Icon.tsx";

/**
 * @titleBy text
 */
interface item {
  image: AvailableIcons;
  text: string;
}

/**
 * @titleBy title
 */
export interface Props {
  title: string;
  items: item[];
}

const ChoiceUltrafeu = ({ title, items }: Props) => {
  return (
    <div class="w-full max-w-7xl m-auto">
      <h2 class="text-center text-blackPrimary font-semibold text-2xl">
        {title}
      </h2>
      <div class="w-full flex items-center justify-around">
        {items?.map((item) => (
          <div class="w-[152px] text-center">
            <Icon id={item.image} strokeWidth={3} width={88} height={66} />
            <p class="text-sm text-blackPrimary">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceUltrafeu;
