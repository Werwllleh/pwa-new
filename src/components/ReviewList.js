import Icon from "./Icon";
import Review from "./Review";
import {useReviewStore} from "../store/review-store";
import {useEffect, useState} from "react";
import plural from 'plural-ru'
import cn from 'classnames'

const ReviewList = () => {
  const [totalRating, totalReviews, reviews, updateReviewsMain, updateTotal] = useReviewStore((state) => [state.totalRating, state.totalReviews, state.reviews, state.updateReviewsMain, state.updateTotal]);
  const [reviewsList, setReviewsList] = useState(Array(5).fill({}))

  useEffect(() => {
    updateTotal()
    updateReviewsMain()
  }, [])

  useEffect(() => {
    if (reviews.length) {
      setReviewsList(reviews)
    }
  }, [reviews])

  return (
    <div className="reviews reviews_primary">
      <div className={cn('reviews__title', {'sm-loading': !(totalRating && totalReviews)})}>
        <div className="reviews__title-box sm-item-secondary">
          <Icon name="star"/>
          <span className="reviews__rating">{totalRating.toLocaleString('ru-RU', {minimumFractionDigits: 1})}</span>
          <span className="reviews__num">
            {totalReviews.toLocaleString('ru-RU')} {plural(totalReviews, 'отзыв', 'отзыва', 'отзывов')}
          </span>
        </div>
      </div>
      {
        reviewsList.map((review, index) => (<Review {...review} key={index}/>))
      }
    </div>
  )
}
export default ReviewList