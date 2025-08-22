import { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import ModalDispatchContext from "../contexts/modal/ModalDispatchContext";

/**
 * 모달 훅
 * @returns 
 */
const useModal = () => {
    const [openModal, closeModal] = useContext(ModalDispatchContext);
    return {openModal, closeModal}
}

export default useModal