import React from "react"
import { injectState } from "freactal"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

const actionValidate = (action, args, close) => {
  action.apply(this, args)
  close()
}

const ModalConfirmation = ({
  action,
  args,
  close,
  effects,
  message,
  modalState
}) => (
  <Modal isOpen={modalState}>
    <ModalHeader>Confirmation required</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={() => actionValidate(action, args, close)}
      >
        Validate
      </Button>{" "}
      <Button color="secondary" onClick={() => close(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
)

export default injectState(ModalConfirmation)