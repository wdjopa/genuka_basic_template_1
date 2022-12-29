import React from "react";
import { useGenukaDispatch } from "../../store/genukaStore";

function Error({ error_text }) {
  const dispatch = useGenukaDispatch();
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  return (
    <div status="error">
      {/* <AlertTitle>Error!</AlertTitle> */}
      <div>{error_text}</div>
      <button
        className="relative "
        onClick={() => {
          dispatch({ type: "error", payload: undefined });
          onClose();
        }}
      />
    </div>
  );
}

export default Error;
