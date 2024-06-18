import TitleAndIcons, {
  Props as TitleAndIconsProps,
} from "./TitleAndIcons.tsx";

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

export interface Props {
  footerItems: FooterItemsProps[];
  SocialMedia?: TitleAndIconsProps;
}

const FooterMenu = ({ footerItems, SocialMedia }: Props) => {
  const isMobile = globalThis.innerWidth < 1024;
  const isLast = footerItems && footerItems.length - 1;
  if (!isMobile)
    return (
      <>
        {/* desktop footer menu */}
        {footerItems &&
          footerItems.map((item, i: number) => (
            <>
              <div class="flex flex-col gap-2">
                {item.title && (
                  <h3 class="font-bold text-sm mb-2">{item.title}</h3>
                )}
                {item.items?.map((subitem) => (
                  <a href={subitem.link}>
                    <p class="font-medium text-sm max-w-56">{subitem.text}</p>
                  </a>
                ))}
                {SocialMedia && isLast === i && (
                  <TitleAndIcons {...SocialMedia} />
                )}
              </div>
            </>
          ))}
      </>
    );
  return (
    <>
      {/* Mobile footer menu */}
      {footerItems?.map((item, i: number) => (
        <div
          className="collapse collapse-arrow rounded-none border-b border-graySecondary"
          defaultChecked={isLast === i}
        >
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title px-0">
            {item.title && <h3 class="font-bold text-sm mb-2">{item.title}</h3>}
          </div>
          <div className="collapse-content px-0">
            {item.items?.map((subitem) => (
              <a href={subitem.link}>
                <p class="font-medium text-sm max-w-56 px-0">{subitem.text}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
      {SocialMedia && <TitleAndIcons {...SocialMedia} />}
    </>
  );
};

export default FooterMenu;
