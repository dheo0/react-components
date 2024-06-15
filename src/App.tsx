import "./App.css";
import BaseSelect from "./components/BaseSelect";
// import KakaoMap from "./components/KakaoMap";
import KakaoMap2 from "./components/kakaoMap2";
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
      <KakaoMap2 appKey="2e70d6baa266642d453bce611bb7ef20" />
    </div>
  );
}

export default App;
