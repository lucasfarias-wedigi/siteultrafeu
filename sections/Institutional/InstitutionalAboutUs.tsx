import { HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import RichText from "../Content/RichText.tsx";
import BannnerGrid, {
  Props as bannerProps,
} from "../../components/ui/BannerGrid.tsx";

interface Props {
  firstText?: HTMLWidget;
  video?: VideoWidget;
  secondText?: HTMLWidget;
  banners?: bannerProps;
  lastText?: HTMLWidget;
}

const InstitutionalAboutUs = ({
  firstText,
  video,
  secondText,
  banners,
  lastText,
}: Props) => {
  return (
    <div class="w-full">
      {firstText && <RichText text={firstText} style="w-full" />}
      {video && <video src={video} class="w-full" />}
      {secondText && <RichText text={secondText} />}
      {banners && (
        <BannnerGrid
          banners={banners.banners}
          borderRadius={banners.borderRadius}
          itemsPerLine={banners.itemsPerLine}
          title={banners.title}
        />
      )}
      {lastText && <RichText text={lastText} />}
    </div>
  );
};

export default InstitutionalAboutUs;
