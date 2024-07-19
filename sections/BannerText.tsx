import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Breadcrumb from "../components/ui/Breadcrumb.tsx";
import { useUI } from "../sdk/useUI.ts";

interface Props {
    imageDesktop?: ImageWidget;
    imageHeightDesktop?: number;
    imageMobile?: ImageWidget;
    imageHeightMobile?: number;

    alt?: string;
    /** @format html */
    text?: string;
}

function BannerText({ imageDesktop, imageHeightDesktop, imageMobile, imageHeightMobile, alt, text }: Props) {
    const { showSearchResultBreadcrumb } = useUI();

    showSearchResultBreadcrumb.value = false;

    return (
        <div className="w-full flex flex-col gap-4 pb-[20px] relative">
            <div className="absolute top-0 left-[16px] text-white">
                <Breadcrumb itemListElement={[]} />
            </div>
            {imageDesktop &&
                <Image
                    className="w-full hidden md:block"
                    src={imageDesktop}
                    alt={alt}
                    width={1440}
                    height={imageHeightDesktop ?? 217}
                    loading="lazy"
                />

            }

            {imageMobile &&

                <Image
                    className="w-full md:hidden"
                    src={imageMobile}
                    alt={alt}
                    width={1440}
                    height={imageHeightMobile ?? 171}
                    loading="lazy"
                />
            }
            {text && (
                <span
                    class="mx-auto max-w-7xl px-4 xl:px-0"
                    dangerouslySetInnerHTML={{ __html: text }}
                >
                </span>
            )}
        </div>
    );
}

export default BannerText;
