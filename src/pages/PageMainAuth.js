import Header from "@components/Header";
import Footer from "@components/Footer";
import Icon from "@components/Icon";
import Stories from "@components/Stories";
import {Link} from "react-router-dom";
import ReviewList from "../components/ReviewList";
import {useAdvantageStore} from "../store/advantage-store";
import {useUserStore} from "../store/user-store2";
import {useEffect, useState} from "react";
import Advantage from "../components/Advantage";
import ModalQuestions from "../components/modals/ModalQuestions";
import ModalReviews from "../components/modals/ModalReviews";
import ModalCallRequest from "../components/modals/ModalCallRequest";

const PageMain = () => {
  const [firstName] = useUserStore((state) => [state.firstName]);
  const [advantages, updateAdvantages] = useAdvantageStore((state) => [state.advantagesAuth, state.updateAdvantagesAuth]);
  const [advantagesList, setAdvantagesList] = useState(Array(3).fill({}));
  useEffect(() => {
    updateAdvantages()
  }, [updateAdvantages]);
  useEffect(() => {
    if (advantages.length > 0) {
      setAdvantagesList(advantages);
    }
  }, [advantages]);

  const [isModalQuestionsActive, setIsModalQuestionsActive] = useState(false);
  const [isModalReviewsActive, setIsModalReviewsActive] = useState(false);
  const [isModalCallRequestActive, setIsModalCallRequestActive] = useState(false);

  const toggleModalQuestions = () => {
    setIsModalQuestionsActive(!isModalQuestionsActive);
  };

  const toggleModalReviews = () => {
    setIsModalReviewsActive(!isModalReviewsActive);
  };

  const toggleModalCallRequest = () => {
    setIsModalCallRequestActive(!isModalCallRequestActive);
  };

  return (
    <>
      <div className="masked">
        <Header isAuth={true}/>
        <div className="main authorized bg_2">
          <div className="sections">
            <section className="section section_top container">
              <div className="greeting">
                <h1 className="greeting__text">Здравствуйте, <span className="greeting__username">{firstName}</span>
                </h1>
                <Link className="greeting__avatar" to="/settings">
                  <img src="/assets/images/avatar.svg" alt=""/>
                </Link>
              </div>
              <Stories/>
            </section>
            <section className="section container">
              <h2 className="h2 mt_24 mb_16">Записаться на коррекцию</h2>
              <ul className="advantages">
                {
                  advantagesList.map((advantage, index) => (<Advantage key={index.toString()} {...advantage}/>))
                }
              </ul>
              <Link className="button mb_24" to="https://glorias.ru/glmhg" target="_blank">Записаться на
                коррекцию</Link>
            </section>
            <section className="section container">
              <ReviewList/>
              <button className="button button_color-2 mb_24" data-popup="reviews" onClick={toggleModalReviews}>Все
                отзывы
              </button>
            </section>
            <section className="section container">
              <div className="user-actions">
                <div className="user-action" data-popup="questions" onClick={toggleModalQuestions}>
                  <Icon name="faq"/>
                  <span className="user-action__text">Частые вопросы</span>
                  <Icon name="angle-right" className="user-action__icon-angle"/>
                </div>
              </div>
            </section>
            <section className="section container">
              <div className="user-actions">
                <div className="user-action">
                  <Icon name="call-out"/>
                  <div className="user-action__text"><a href="tel:88001009876">8 800 100 98 76 <br/></a><span
                    className="user-action__details">05:00 – 21:00 по МСК. Без выходных</span></div>
                </div>
                <div onClick={toggleModalCallRequest} className="user-action" data-popup="callRequest">
                  <Icon name="call-in"/>
                  <span className="user-action__text">Заказать звонок</span>
                  <Icon name="angle-right" className="user-action__icon-angle"/>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer/>
      </div>
      <ModalQuestions active={isModalQuestionsActive} onClose={toggleModalQuestions}/>
      <ModalReviews active={isModalReviewsActive} onClose={toggleModalReviews}/>
      <ModalCallRequest active={isModalCallRequestActive} onClose={toggleModalCallRequest}/>
    </>
  );
}

export default PageMain;