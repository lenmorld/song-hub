/**
 * usage:
 * <Modal onExit={}>
 *     <div>...stuff</div>
 * </Modal>
 *
 * using ModalContext:
 * // define this.state.modal in Context root component
 * <ModalContext.Provider value={this.state.modal}>
 *     ...
 * </ModalContext.Provider>
 *
 * <ModalContext.Consumer>
 * 	{({ visible, toggleModal }) => {
 *          visible ? <Modal>haha</Modal> : ""
 *          ...
 *          onClick = () => toggleModal
 *     } }
 * </ModalContext.Consumer>
 */

import React from 'react'
import ReactDOM from 'react-dom'

import { AiOutlineCloseSquare } from 'react-icons/ai'

// A reusable Modal component based on React Portal
const Modal = ({ hide, visible, children }) => {
  // this.modalElement = document.createElement("div");
  const modalElement = document.querySelector('#modal')

  const handleClickOutside = (e) => {
    if (!e.target.closest('.spotify_wrapper')) {
      hide()
    }
  }

  const renderPortalBody = () => (
    <div className="spotify_modal" onClick={handleClickOutside}>
      <div
        className="spotify_wrapper"
        style={{ width: '400px', height: '400px', overflow: 'hidden' }}
      >
        <div className="close_form">
          <span onClick={hide}>
            <AiOutlineCloseSquare />
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  if (!visible) {
    return ''
  }

  return ReactDOM.createPortal(renderPortalBody(children), modalElement)
}

export default Modal
