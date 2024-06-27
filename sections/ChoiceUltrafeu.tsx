import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CustomDivider from "../components/CustomDivider.tsx";

/**
 * @titleBy text
 */
interface item {
  image: ImageWidget;
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
      <CustomDivider>
        <h2 class="text-center text-blackPrimary font-semibold text-2xl">
          {title}
        </h2>
      </CustomDivider>
      <div class="w-full flex items-center justify-around">
        {items?.map((item) => (
          <div class="w-[152px] text-center">
            <Image src={item.image} alt={item.text} width={88} height={66} />
            <p class="text-sm text-blackPrimary">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceUltrafeu;
