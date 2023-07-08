import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 480px;
  hr {
    margin: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  padding: 30px;
  font-weight: 400;
  margin: 10px 0;
  color: ${(props) => props.theme.accentColor};
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 15px 20px;
  border-radius: 10px;
  border: 3px solid transparent;
  border-color: ${(props) =>
    props.isActive ? props.theme.accentColor : "transparent"};
  font-weight: ${(props) => (props.isActive ? "bold" : null)};
  color: ${(props) => (props.isActive ? props.theme.accentColor : null)};
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Wrapper>
      <Title>오늘 해야 할 일 목록</Title>
      <Tabs>
        <Tab
          value={Categories.TO_DO}
          onClick={onClick}
          isActive={category === Categories.TO_DO}
        >
          해야 할 일
        </Tab>
        <Tab
          value={Categories.DOING}
          onClick={onClick}
          isActive={category === Categories.DOING}
        >
          하는 중
        </Tab>
        <Tab
          value={Categories.DONE}
          onClick={onClick}
          isActive={category === Categories.DONE}
        >
          완료한 일
        </Tab>
      </Tabs>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;
