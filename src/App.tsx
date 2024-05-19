import "./App.css";
import BaseSelect from "./components/BaseSelect";
import { useConfirmModal } from "./components/ConfirmModalContext";

function App() {
  const { openModal } = useConfirmModal();
  const data = [
    {
      id: "abc",
      title: "abc",
    },
    {
      id: "def",
      title: "def",
    },
  ];
  const performAsyncAction = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };

  const onHandleSelectValue = (v: string | number) => {
    console.log(v);
  };
  const handleOpenModal = () => {
    openModal(
      "Are you sure you want to perform this action?",
      performAsyncAction
    );
  };

  return (
    <div>
      <BaseSelect
        data={data}
        onHandleSelectedValue={(value) => onHandleSelectValue(value)}
      />
      <button onClick={handleOpenModal}>Open Confirm Modal</button>
    </div>
  );
}

export default App;
