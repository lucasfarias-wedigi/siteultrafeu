import { HTMLWidget } from "apps/admin/widgets.ts";
import Newsletter from "../../islands/Newsletter.tsx";
import TitleAndIcons, {
  Props as TitleAndIconsProps,
} from "./TitleAndIcons.tsx";
import RichText from "../../sections/Content/RichText.tsx";
import FooterMenu from "../../islands/FooterMenu.tsx";

export interface NewsletterProps {
  title: string;
  description: string;
  form: {
    placeholders: {
      name: string;
      email: string;
    };
  };
}

/**
 * @titleBy text
 */
export interface FooterItem {
  text: string;
  link: string;
}

/**
 * @titleBy title
 */
export interface FooterItemsProps {
  title?: string;
  items: FooterItem[];
}

export interface PoliciesProps {
  text: HTMLWidget;
  icons: TitleAndIconsProps;
}

export interface Props {
  newsletter: NewsletterProps;
  footerItems?: FooterItemsProps[];
  SocialMedia?: TitleAndIconsProps;
  PaymentMethods?: TitleAndIconsProps;
  financing?: TitleAndIconsProps;
  security?: TitleAndIconsProps;
  policies?: PoliciesProps;
}

function footer({
  newsletter = {
    title: "title",
    description: "description",
    form: {
      placeholders: {
        name: "digite seu nome",
        email: "digite seu email",
      },
    },
  },
  footerItems,
  SocialMedia,
  PaymentMethods,
  financing,
  security,
  policies,
}: Props) {
  return (
    <footer>
      <Newsletter content={newsletter} />
      {footerItems && (
        <div class="w-full bg-graySecondary border-b border-white">
          <div class="flex flex-col gap-4 lg:gap-0 lg:flex-row max-w-7xl m-auto justify-between py-8 px-4 lg:px-0">
            <FooterMenu footerItems={footerItems} SocialMedia={SocialMedia} />
          </div>
        </div>
      )}
      <div class="bg-graySecondary w-full py-7 px-4 lg:px-0">
        <div class="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between max-w-7xl w-full m-auto">
          {PaymentMethods && <TitleAndIcons {...PaymentMethods} />}
          {financing && <TitleAndIcons {...financing} />}
          {security && <TitleAndIcons {...security} />}
        </div>
      </div>
      {policies && (
        <div class="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center w-full max-w-7xl m-auto py-4 px-4 lg:px-0">
          <RichText
            style="max-w-5xl text-[10px] text-blackPrimary"
            text={policies.text}
          />
          <div class="w-full flex items-center justify-center lg:justify-end">
            <TitleAndIcons {...policies.icons} />
          </div>
        </div>
      )}
    </footer>
  );
}

export default footer;
