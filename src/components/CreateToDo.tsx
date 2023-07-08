import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  * {
    padding: 15px;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder={`리스트에 새 할 일을 추가해보세요`}
      />
      <button>추가</button>
    </Form>
  );
}

export default CreateToDo;
