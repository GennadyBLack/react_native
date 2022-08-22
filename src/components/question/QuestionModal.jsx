import QuestionForm from "./QuestionForm";
import React from "react";
import Modal from "../Modal";
import ModalSwipe from "../base/ModalSwipe";

export default function QuestionModal() {
  return (
    <ModalSwipe>
      <QuestionForm />
    </ModalSwipe>
  );
}
