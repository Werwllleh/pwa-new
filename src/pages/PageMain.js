import Header from "@components/Header";
import Footer from "@components/Footer";
import {Link} from "react-router-dom";
import ReviewList from "../components/ReviewList";
import InfoBlock from "../components/InfoBlock";
import Stories from "../components/Stories";
import Advantage from "../components/Advantage";
import {useAdvantageStore} from "../store/advantage-store";
import {useEffect, useState} from "react";
import ModalReviews from "../components/modals/ModalReviews";

const PageMain = () => {
  const [advantages, getAdvantages] = useAdvantageStore((state) => [state.advantages, state.getAdvantages]);
  const [advantagesList, setAdvantagesList] = useState(Array(6).fill({}));
  useEffect(() => {
    getAdvantages()
  }, [getAdvantages]);
  useEffect(() => {
    if (advantages.length > 0) {
      setAdvantagesList(advantages);
    }
  }, [advantages]);

  const [isModalReviewsActive, setIsModalReviewsActive] = useState(false);

  const toggleModalReviews = () => {
    setIsModalReviewsActive(!isModalReviewsActive);
  };


  return (
    <>
      <Header/>
      <div className="main bg_2">
        <div className="sections">
          <section className="section section_top container">
            <div className="big-logo">
              <img src="/assets/images/logo.svg" alt=""/>
            </div>
            <div className="h1 h1_big mb_24">Лазерная коррекция по России от 13 000 ₽</div>
            <ul className="advantages">
              {
                advantagesList.map((advantage, index) => (<Advantage key={index.toString()} {...advantage}/>))
              }
            </ul>
            <Link className="button mb_24" to="/authorization.html">Авторизироваться</Link>
            <InfoBlock/>
          </section>
          <section className="section container">
            <Stories/>
            <ReviewList/>
            <button className="button button_color-2 mb_24" data-popup="reviews" onClick={toggleModalReviews}>Все
              отзывы
            </button>
          </section>
        </div>
      </div>
      <Footer/>
      <ModalReviews active={isModalReviewsActive} onClose={toggleModalReviews}/>
    </>
  );
}

export default PageMain;