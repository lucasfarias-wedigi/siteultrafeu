import Image from "apps/website/components/Image.tsx";
import { item as Props } from "./BreadcrumbSlider.tsx";

const BreadcrumbSliderCard = ({ title, image, link }: Props) => {
  return (
    <a href={link || "#"}>
      <div class="bg-white">
        <Image src={image} width={121} height={103} alt={title} />
        <p class="text-xs text-center">{title}</p>
      </div>
    </a>
  );
};

export default BreadcrumbSliderCard;