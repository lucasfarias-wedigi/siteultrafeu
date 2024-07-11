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
  activeIndex: number;
}

export default function loader(
  { links }: Props,
  req: Request
): NavigationLoader {
  const activeIndex = links.findIndex((nav) => {
    const pattern = new URLPattern({ pathname: nav.url });
    return pattern.test(req.url);
  });

  return {
    links,
    activeIndex,
  };
}
