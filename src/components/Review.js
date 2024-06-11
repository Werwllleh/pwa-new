import Icon from "./Icon";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {useEffect, useState} from "react";
import cn from 'classnames'

const Review = ({photoSrc, sourceSrc, author, date, rate, text=''}) => {
  const [maxLine, setMaxLine] = useState('4')


  return (
    <div className={cn('review', {'sm-loading': text.length === 0})}>
      <div className="review__title">
        <div className="review__user-photo sm-item-primary">
          <img src={process.env.REACT_APP_API_DOMAIN + photoSrc} alt={author} height="40" className="" />
          <div className="review__source">
            <img src={process.env.REACT_APP_API_DOMAIN + sourceSrc} alt=""/>
          </div>
        </div>
        <div className="review__info">
          <div className="review__user-name sm-item-secondary">{author}</div>
          <div className="review__details sm-item-secondary">
            <div className="review__rating" data-stars={rate}>
              <Icon name="star"/>
              <Icon name="star"/>
              <Icon name="star"/>
              <Icon name="star"/>
              <Icon name="star"/>
            </div>
            <div className="review__date">{date}</div>
          </div>
        </div>
      </div>
      <div className="review__text sm-item-secondary" onClick={() => setMaxLine('99999')}>
        <HTMLEllipsis
          unsafeHTML={text}
          maxLine={maxLine}
          ellipsis='...ещё'
        />
      </div>
    </div>
  )
}
export default Review