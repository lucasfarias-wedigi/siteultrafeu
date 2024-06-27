import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

/**
 * @titleBy text
 */
interface CardSubItems {
  text: string;
}

/**
 * @titleBy title
 */
interface Card {
  title: string;
  url: string;
  image: ImageWidget;
  subItems: CardSubItems[];
  buttonText: string;
}

export interface Props {
  cards: Card[];
}

const FloatCards = ({ cards }: Props) => {
  return (
    <div class="flex w-full items-center justify-between max-w-7xl mx-auto translate-y-[-38px]">
      {cards?.map((item) => (
        <div class="w-[280px] p-2 rounded-card bg-white border border-[#E2E2E2]">
          <a href={item.url || "#"}>
            <div class="w-full relative mb-2.5">
              <div class="bg-purplePrimary text-white py-1 w-full absolute top-0 text-sm text-center font-semibold">
                {item.title}
              </div>
              <Image
                src={item.image}
                alt={item.title}
                width={264}
                height={100}
              />
            </div>
            <ul>
              {item.subItems?.map((sub) => (
                <li class="flex text-sm items-center gap-2.5 mb-2.5">
                  <Icon id="SubMenuArrowRight" size={24} />
                  {sub.text}
                </li>
              ))}
            </ul>
            <a
              href={item.url || "#"}
              class="flex items-center justify-center w-full border py-2 rounded-card border-purplePrimary text-purplePrimary text-base font-bold"
            >
              {item.buttonText}
            </a>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FloatCards;
