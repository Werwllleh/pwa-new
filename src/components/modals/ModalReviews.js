import {useCallback, useEffect, useRef, useState} from "react";
import Icon from "../Icon";
import {useReviewStore} from "../../store/review-store";
import Review from "../Review";

const ModalReviews = ({active, onClose}) => {

  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');

  useEffect(() => {
    if (active) {
      setClassVisible('modal_visible');
      setTimeout(() => {
        setClassFade('modal_fade');
      }, 1);
    } else {
      setClassFade('');
      setTimeout(() => {
        setClassVisible('');
      }, 300);
    }
  }, [active]);


  const observerRef = useRef(null);

  const reviews = useReviewStore((state) => state.reviews);
  const totalReviews = useReviewStore((state) => state.totalReviews);
  const updateReviews = useReviewStore((state) => state.updateReviewsMain);
  const page = useReviewStore((state) => state.page);
  const isLoading = useReviewStore((state) => state.isLoading);

  const scrollHandler = useCallback((e) => {
    if (
      observerRef.current.scrollHeight - (observerRef.current.scrollTop + window.innerHeight) < 300 &&
      e.deltaY > 0 &&
      !isLoading &&
      reviews.length < totalReviews
    ) {
      updateReviews(page + 1);
    }
  }, [isLoading, page, updateReviews]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.addEventListener('scroll', scrollHandler);
      observerRef.current.addEventListener('wheel', scrollHandler);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.removeEventListener('scroll', scrollHandler);
        observerRef.current.removeEventListener('wheel', scrollHandler);
      }
    };
  }, [scrollHandler]);

  useEffect(() => {
    updateReviews(1);
  }, [updateReviews]);

  return (
    <div className={`modal modal_type-2 modal-reviews ${classVisible} ${classFade}`} data-popup="reviews">
      <div ref={observerRef} className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__header">
            <div onClick={onClose} className="modal__close modal-close">
              <Icon name="close"/>
            </div>
          </div>
          <h2 className="h2 modal__title-sticky">Все отзывы</h2>
          <div className="modal__content">
            <div className="reviews">
              {
                reviews.map((review, index) => (<Review {...review} key={index}/>))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalReviews