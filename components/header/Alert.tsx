import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

interface benefitsItemsProps {
  /** @titleBy text */
  image: ImageWidget;
  text: string;
}

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  benefitsItems?: benefitsItemsProps[];
}

function Alert({ alerts = [], interval = 5, benefitsItems }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-bluePrimary">
      {benefitsItems && (
        <ul>
          {benefitsItems.map((item) => (
            <li class="text-white flex items-center border-x-1 border-white">
              <Image src={item.image} alt={item.text} width={24} height={24} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      <Slider class="carousel carousel-center w-screen gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white flex justify-center items-center w-screen">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
