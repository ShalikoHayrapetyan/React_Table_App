import { useDispatch, useSelector } from "react-redux";
import CustomTable from "./CustomTabler";
import { v4 as uuidv4 } from "uuid";

function App() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteElement = (ids) => {
    const newData = data.filter((el) => !ids.includes(el.id));
    dispatch({
      type: "setData",
      payload: {
        data: newData,
      },
    });
  };
  const editElement = (index) => {
    data[index].isEdit = true;
    dispatch({
      type: "startEdit",
      payload: {
        data,
      },
    });
  };
  const saveElement = ({ name, rate, id }) => {
    const newData = data.map((el) =>
      el.id === id ? { id, name, rate } : { ...el }
    );
    dispatch({
      type: "setData",
      payload: {
        data: newData,
      },
    });
  };

  const addItem = (name, rate) => {
    dispatch({
      type: "add",
      payload: {
        name,
        rate,
        id: uuidv4(),
      },
    });
  };

  const headers = [
    {
      dataIndex: "name",
      title: "Name",
      width: "300",
      sorter: false,
    },
    {
      dataIndex: "rate",
      title: "Rating",
      width: "180",
      sorter: true,
    },
  ];

  return (
    
    <CustomTable
      headers={headers}
      data={data}
      addItem={addItem}
      deleteElement={deleteElement}
      editElement={editElement}
      saveElement={saveElement}
    />
  );
}

export default App;
