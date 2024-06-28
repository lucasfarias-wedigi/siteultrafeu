import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: ImageWidget;
}

const BannerFull = ({ image }: Props) => {
  return (
    <div class="w-full h-[326px]">
      <Image
        src={image}
        alt="banner"
        width={1440}
        height={326}
        class="w-full"
      />
    </div>
  );
};

export default BannerFull;
