export type OrderDTO = {
  items: {
    id: string;
    quantity: number;
  }[];
};

export type OrderEvents = {
  type: "order.placed";
  data: {
    userId: string;
    items: OrderDTO["items"];
  };
};
