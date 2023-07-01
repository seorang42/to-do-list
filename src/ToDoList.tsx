import { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("email", { required: true })} placeholder="email" />
        <input
          {...register("firstName", { required: true })}
          placeholder="firstName"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="lastName"
        />
        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="username"
        />
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: 5,
          })}
          placeholder="password"
        />
        <input
          {...register("confirmation", { required: true, minLength: 5 })}
          placeholder="confirmation"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
