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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmation: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.confirmation) {
      setError(
        "confirmation",
        { message: "Password is not the same." },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email Required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver emails allowed.",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Write First Name",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="firstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Write Last Name" })}
          placeholder="lastName"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "Write Username",
            minLength: {
              value: 5,
              message: "Your username is too short.",
            },
          })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("confirmation", {
            required: "Confirm Password",
          })}
          placeholder="confirmation"
        />
        <span>{errors?.confirmation?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
