export type TPageItem = {
  url: string;
  title: string;
  content: React.FC;
};

export type TPageItems = readonly Readonly<TPageItem>[];

export type TRoutingProps = {
  items: TPageItems;
};
