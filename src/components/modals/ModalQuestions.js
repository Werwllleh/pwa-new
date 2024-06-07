import Icon from "../Icon";
import {useEffect, useState} from "react";
import {useQaStore} from "../../store/qa-store";
import cn from 'classnames';

const ModalQuestions = ({active, onClose}) => {

  const [qaArr, updateQaArr] = useQaStore((state) => [state.qa, state.updateQa]);

  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    if (active) {
      setClassVisible('modal_visible');
      setTimeout(() => {
        setClassFade('modal_fade');
      }, 1);
      updateQaArr()
    } else {
      setClassFade('');
      setTimeout(() => {
        setClassVisible('');
      }, 300);
    }
  }, [active, updateQaArr]);

  const showAnswerModal = (qaId) => {
    setShowAnswer(!showAnswer);
    setSelectedQuestionId(qaId);
  }

  const closeAnswerModal = () => {
    setShowAnswer(false);
    setSelectedQuestionId(null);
  }

  const closeAllModals = () => {
    onClose()
    closeAnswerModal()
  }


  return (
    <div className={`modal modal_type-2 modal-questions ${classVisible} ${classFade}`} data-popup="questions">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__header">
            <div onClick={onClose} className="modal__close modal-close">
              <Icon name="close"/>
            </div>
          </div>
          <h2 className="h2 modal__title-sticky">Частые вопросы</h2>
          <div className="modal__content">
            <ul className="questions">
              {
                qaArr.map((qa) => {
                  return (
                    <li onClick={() => showAnswerModal(qa.id)} key={qa.id} className={cn('question', {'sm-loading': !(qaArr.length)})} data-question={qa.id}>
                      <span className="question__text">{qa.question}</span>
                      <Icon name="angle-right"/>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className={cn('answers', {'active': showAnswer})}>
            <div className="modal__header">
              <div onClick={closeAnswerModal} className="answers__back">
                <Icon name="angle-left"/>
              </div>
              <div onClick={closeAllModals} className="modal__close modal-close">
                <Icon name="close" />
              </div>
            </div>
            <div className="answers-container container">
              {
                selectedQuestionId && showAnswer && (
                  <div className="answer" data-question={selectedQuestionId}>
                    <h2 className="h2 answer__title">{qaArr?.find((qa) => qa.id === selectedQuestionId).question}</h2>
                    <div className="answer__text">
                      <p>{qaArr?.find((qa) => qa.id === selectedQuestionId).answer}</p>
                    </div>
                    <div className="answer__link container"><a className="button" href={qaArr?.find((qa) => qa.id === selectedQuestionId).link}>Читать на сайте</a></div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalQuestions