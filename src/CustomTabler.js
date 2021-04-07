import React, { useMemo, useState } from "react";
import "./App.css";
import TableRow from "./TableRow";

export default function CustomTable(props) {
  const {
    headers,
    data,
    addItem,
    deleteElement,
    editElement,
    saveElement,
  } = props;
  const [addName, setAddName] = useState("");
  const [addRating, setAddRating] = useState(0);
  const [isDesc, setIsDesc] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const sortedData = useMemo(
    () =>
      [...data].sort((a, b) => (isDesc ? a.rate - b.rate : b.rate - a.rate)),
    [isDesc, data]
  );

  const onSelectAll = (checked) => {
    setSelectedItems(() => (checked ? data.map((el) => el.id) : []));
  };
  const handleDelete = (id) => {
    setSelectedItems([...selectedItems.filter((el) => el !== id)]);
    deleteElement([id]);
  };
  const handleAddIteam = () => {
    setAddName("");
    setAddRating(0);
    addItem(addName, addRating);
  };
  const deleteSelected = () => {
    deleteElement(selectedItems);
    setSelectedItems([]);
  };

  const onSelectItem = (id) => {
    selectedItems.includes(id)
      ? setSelectedItems([...selectedItems.filter((el) => el !== id)])
      : setSelectedItems([...selectedItems, id]);
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((el) => (
            <th key={el.title} width={el.width}>
              <div className="table-header">
                <div>{el.title}</div>
                {el.sorter && (
                  <div
                    className="sortBtn"
                    onClick={() => setIsDesc((prev) => !prev)}
                  >
                    {isDesc ? <span>&#8593;</span> : <span>&#8595;</span>}
                  </div>
                )}
              </div>
            </th>
          ))}
          <th>
            <div className="selectAll">
              Select All
            <input
              className="checkbox"
              type="checkbox"
              onChange={(e) => onSelectAll(e.target.checked)}
              checked={data.length && selectedItems.length === data.length}
            />
            </div>
           
          </th>
        </tr>
      </thead>

      <tbody className="aa">
        {sortedData.map((el) => (
          <TableRow
            key={el.id}
            el={el}
            handleDelete={() => handleDelete(el.id)}
            selectedItems={selectedItems}
            onSelectItem={onSelectItem}
            editElement={editElement}
            saveElement={saveElement}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <input
              value={addName}
              placeholder="name"
              onChange={(e) => setAddName(e.target.value)}
              type="text"
            />
          </td>
          <td>
            {" "}
            <input
              value={addRating}
              onChange={(e) => setAddRating(e.target.value)}
              type="number"
              min="0"
            />
          </td>
          <td>
            <button className="addBtn" onClick={handleAddIteam}>ADD</button>
            <button className="delSelBtn" disabled={!selectedItems.length} onClick={deleteSelected}>
              Delete Selected
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
