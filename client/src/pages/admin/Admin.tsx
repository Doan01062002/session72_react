import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../store/reducer/userReducer";
import { User } from "../../interface";

export default function Admin() {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users: User[] = useSelector((state: any) => state.user.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const addUser = () => {
    const newUser = {
      name: "thảo pương",
    };
    dispatch(addNewUser(newUser));
  };

  const handleChange = (id: number) => {
    const userToChange = users.find((item: User) => item.id === id);
    if (userToChange) {
      setSelectedUserId(id);
      setInputValue(userToChange.name);
    }
  };

  const handleUpdate = () => {
    if (selectedUserId !== null) {
      dispatch(updateUser({ id: selectedUserId, name: inputValue }));
      setSelectedUserId(null);
      setInputValue("");
    }
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h3>Update User</h3>
      <input type="text" onChange={changeValue} value={inputValue} />
      <button onClick={handleUpdate} disabled={selectedUserId === null}>
        Update
      </button>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleChange(user.id)}>Sửa</button>
            <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <button onClick={addUser}>Add User</button>
    </div>
  );
}
