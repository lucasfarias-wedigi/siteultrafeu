import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Close"
  | "Phone"
  | "Pix"
  | "Pix2"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "WhatsAppWhite"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share"
  | "sharePdp"
  | "MessageIcon"
  | "WishlistIcon"
  | "LoginIcon"
  | "MinicartIcon"
  | "MenuHamburguer"
  | "ShoppingCartIcon"
  | "DeliveryTruckIcon"
  | "SnowIcon"
  | "BriefCase"
  | "SubMenuArrowRight"
  | "CreditCard"
  | "NewPix"
  | "FilledMinicart"
  | "MiniDownArrow"
  | "WishlistHeart"
  | "ScrollbarPdp"
  | "ScrollRightHand"
  | "CartaoBndes"
  | "PesoLiquido1"
  | "Consumo"
  | "Tensao"
  | "Altura"
  | "Frente"
  | "Profundidade";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 16,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
