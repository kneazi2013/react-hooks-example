import React, { useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { TRoutingProps, TPageItem } from "./index.d";

export default function ContentList({ items }: TRoutingProps) {
  return useMemo(() => {
    const pageItems: JSX.Element[] = items.reduce<JSX.Element[]>(
      (acc: JSX.Element[], item: Readonly<TPageItem>, idx: number) => {
        const { url, content: Content } = item;

        const route = (
          <Route path={url} key={idx}>
            <Content />
          </Route>
        );

        acc.unshift(route);

        return acc;
      },
      []
    );

    return <Switch>{pageItems}</Switch>;
  }, [items]);
}
