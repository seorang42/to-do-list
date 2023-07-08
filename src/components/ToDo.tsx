import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import { styled } from "styled-components";

const ToDoBox = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  margin-top: 20px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.boxBgColor};
  border-radius: 15px;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
  button {
    padding: 7px;
    border-radius: 5px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDO) => toDO.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <ToDoBox>
      <span>{text}</span>
      <Buttons>
        <button
          name={Categories.TO_DO}
          onClick={onClick}
          disabled={category === Categories.TO_DO && true}
        >
          해야 함
        </button>
        <button
          name={Categories.DOING}
          onClick={onClick}
          disabled={category === Categories.DOING && true}
        >
          하는 중
        </button>
        <button
          name={Categories.DONE}
          onClick={onClick}
          disabled={category === Categories.DONE && true}
        >
          완료
        </button>
        <button onClick={deleteToDo}>지우기</button>
      </Buttons>
    </ToDoBox>
  );
}

export default ToDo;
