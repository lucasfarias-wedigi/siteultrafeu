/**
 * @title {{{label}}}
 */

interface Link {
  /** @title URL */
  url: string;
  /** @title Texto da URL */
  label: string;
}

interface Props {
  links: Link[];
}

export interface NavigationLoader {
  links: Link[];

  /**
   * @hide
   */
  activeIndex?: number;
}

export default function loader(
  { links }: Props,
  req: Request,
): NavigationLoader {
  const activeIndex = links.findIndex((nav) => {
    const pattern = new URLPattern({ pathname: nav.url });
    console.log(pattern);
    return pattern.test(req.url);
  });

  return {
    links,
    activeIndex,
  };
}
