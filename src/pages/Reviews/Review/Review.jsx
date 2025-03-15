import React from 'react';
import s from './review.module.css'

const Review = ({review_text, reviewer}) => {
    return (
        <div>
            <div className={s.review}>
                <div className={s.reviewer}>
                    {reviewer}
                </div>
                <div className={s.review_text}>
                    {review_text}
                </div>
                <div className={s.stars}>
                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                </div>
            </div>
        </div>
    );
};

export default Review;