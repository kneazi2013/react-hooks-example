import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TRoutingProps, TPageItem } from "./index.d";

export default function NavList({ items }: TRoutingProps) {
  let { pathname } = useLocation();

  return useMemo(() => {
    const navItems = items.map((item: TPageItem, idx: number) => {
      const { url, title } = item;

      return (
        <li key={idx} className={pathname === url ? "active" : ""}>
          <Link to={url}>{title}</Link>
        </li>
      );
    });

    return <ul>{navItems}</ul>;
  }, [pathname, items]);
}
