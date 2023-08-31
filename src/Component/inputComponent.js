import React, { useState } from "react"
const InputComponent = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const handleCheckboxChange = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem.name === item.name)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item]);
      console.log("these are real", selectedItems)
    }
  };
  const removeData = (index) => {
    setSelectedItems(selectedItems.filter((elem, id) => index !== id));
  };
  const updateData = (index, updatedItem) => {
    const updatedListData = selectedItems.map((item, id) =>
      id === index ? updatedItem : item
    );
    setSelectedItems(updatedListData);
    setEditedIndex(null);
    setEditedData({});
  };
  const itemList = [
    {
      category: "Fruits",
      items: [
        { name: 'Apple', quantity: '1kg', price: '100' },
        { name: 'Banana', quantity: '1 dozen', price: '200' },
        { name: 'Orange', quantity: '1Kg', price: '150' },
        { name: 'Mango', quantity: '1kg', price: '200' }
      ]
    },
    {
      category: "Vegetables",
      items: [
        { name: 'Carrot', quantity: '1kg', price: '150' },
        { name: 'Tomato', quantity: '1kg', price: '180' },
        { name: 'Turnip', quantity: '1kg', price: '150' },
        { name: 'Radish', quantity: '1kg', price: '150' }
      ]
    }
  ];
  return (
    <div>
      <h1>ToDo List</h1>
      {itemList.map((categories, categoryIndex) =>(
        <div key={categoryIndex}>
          <div>{categories.category}</div>
          {console.log("This is", categories)}
          {categories.items.map((item, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item)}
                />
                {`Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`}
              </label>
            </div>
          ))}
        </div>
      ))}
      <div>
        <h2>Selected Items:</h2>
        {selectedItems.length > 0 ? (
          <ol>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {console.log("This is the selected item", index)}
                {item.name} {item.quantity} {item.price}
                <button onClick={() => removeData(index)}>Remove</button>{" "}
                <button onClick={() => setEditedIndex(index)}>Edit</button>
              </li>
            ))}
          </ol>
        ) : (
          <div>No items selected.</div>
        )}
      </div>
      {editedIndex !== null && (
        <div>
          <h2>Edit Item:</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateData(editedIndex, editedData);
            }}
          >
            <input
              type="text"
              placeholder="New Name"
              value={editedData.name }
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            />
            {console.log("This is the name",editedData.name)}
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default InputComponent;