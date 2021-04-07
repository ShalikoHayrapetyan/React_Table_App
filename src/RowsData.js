const initialState = [
  {
    name: "React",
    rate: 140,
    id: 1,
  },
  {
    name: "Vue",
    rate: 130,
    id: 2,
  },
  {
    name: "Angular",
    rate: 125,
    id: 3,
  },
];

const RowsData = (state = initialState, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "setData":
      return [...action.payload.data];
    default:
      return state;
  }
};
export default RowsData;
