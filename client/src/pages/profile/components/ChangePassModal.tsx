import React from 'react'
import Modal from '../../../components/Modal'

const ChangePassModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal title='Change Password' open={isOpen} onClose={onClose}>
      hdsadas
    </Modal>
  )
}

export default ChangePassModal
