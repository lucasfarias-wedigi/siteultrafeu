import { ImageWidget } from "apps/admin/widgets.ts";

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
  image: ImageWidget;
  subItems: CardSubItems[];
  buttonText: string;
}

export interface Props {
  cards: Card[];
}

const FloatCards = ({ cards }: Props) => {
  return (
    <section class="flex items-center justify-center max-w-7xl">
      {cards?.map((item) => {
        <div class="text-white bg-purplePrimary w-[264px] py-1 text-center text-sm font-semibold">
          {item.title}
        </div>;
      })}
    </section>
  );
};

export default FloatCards;
