// context/ConfirmModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import ConfirmModal from "./ConfirmModal";

interface ConfirmModalContextProps {
  openModal: (message: string, onConfirm: () => Promise<void>) => void;
  closeModal: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextProps | undefined>(
  undefined
);

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useCallback(
    (message: string, onConfirm: () => Promise<void>) => {
      setMessage(message);
      setOnConfirm(() => onConfirm);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const confirmAction = useCallback(async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }, [onConfirm, closeModal]);

  return (
    <ConfirmModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        isLoading={isLoading}
        onConfirm={confirmAction}
        onClose={closeModal}
      />
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = (): ConfirmModalContextProps => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error(
      "useConfirmModal must be used within a ConfirmModalProvider"
    );
  }
  return context;
};
