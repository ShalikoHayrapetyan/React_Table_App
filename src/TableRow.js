import { useMemo, useState } from "react";

const TableRow = (props) => {
  const { el, handleDelete, saveElement, onSelectItem, selectedItems } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(el.name);
  const [rate, setRate] = useState(el.rate);

  const isChecked = useMemo(() => selectedItems.includes(el.id), [
    selectedItems,
    el.id,
  ]);

  const handleSave = () => {
    saveElement({ id: el.id, name, rate });
    setIsEdit(false);
  };

  return isEdit ? (
    <tr>
      <td>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </td>
      <td>
        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          type="number"
          min="0"
        />
      </td>
      <td>
        <button onClick={handleSave}>Save</button>
      </td>
    </tr>
  ) : (
    <tr key={el.id} onClick={() => console.log(el)}>
      <td>{name} </td>
      <td>{rate} </td>
      <td>
        <div className="edit-check-btns">
          <button className="editBtn" onClick={() => setIsEdit(true)}>Edit</button>
          <button className="deleteBtn" onClick={handleDelete}>Delete</button>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onSelectItem(el.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
