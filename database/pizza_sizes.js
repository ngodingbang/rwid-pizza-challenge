export default [
  {
    id: "1",
    slug: "size-1",
    name: "Small",
    description: "Decrease $1 from normal pizza price",
    prices: [
      {
        currency: "USD",
        value: -1,
      },
    ],
  },
  {
    id: "2",
    slug: "size-2",
    name: "Medium",
    description: "Use normal pizza price",
    prices: [
      {
        currency: "USD",
        value: 0,
      },
    ],
  },
  {
    id: "3",
    slug: "size-3",
    name: "Large",
    description: "Increase $2 from normal pizza price",
    prices: [
      {
        currency: "USD",
        value: 2,
      },
    ],
  },
];
