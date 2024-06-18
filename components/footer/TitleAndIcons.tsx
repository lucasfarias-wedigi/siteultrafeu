import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy link
 */
export interface icon {
  link?: string;
  icon: ImageWidget;
}

/**
 * @titleBy title
 */
export interface Props {
  title?: string;
  icons: icon[];
}

const TitleAndIcons = ({ title, icons }: Props) => {
  return (
    <div class="mt-2">
      {title && <h3 class="font-bold text-sm mb-2">{title}</h3>}
      <div class="flex items-center gap-4">
        {icons?.map((item) => (
          <a href={item.link || "#"}>
            <Image
              src={item.icon}
              width={30}
              height={30}
              alt="icone rede social"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TitleAndIcons;
