import React from 'react';
import Review from "./Review/Review";
import s from './reviews.module.css';

const Reviews = () => {
    let reviews = [
        {
            reviewer: 'Фил 2022-06-13 16:16:46',
            review_text: "Все быстро и удобно",
        }, {
            reviewer: 'Назар 2022-06-11 17:50:55',
            review_text: 'Очень крутой сервис! Спасибо!'
        }, {
            reviewer: 'Ваня 2022-06-08 04:49:09',
            review_text: 'Все получилось, спасибо)'
        }, {
            reviewer: 'Кирилл 2022-06-07 22:25:13',
            review_text: 'все супер!'
        }]
    let reviews_array = reviews.map((review) => {
        return <Review reviewer={review.reviewer} review_text={review.review_text}/>
    })
    return (
        <div className='container'>
            <h2>Отзывы</h2>
            <div className={s.reviews}>
                {reviews_array}
            </div>
            <div className={s.leave_feedback}>
                <h2>Оставить отзыв</h2>
                <div className={s.name}>
                    <label htmlFor="name">Ваше имя:</label>
                    <input name={'name'} className={s.name_input} type="text"/>
                </div>
                <div className={s.message}>
                    <label htmlFor="comment">Текст отзыва:</label>
                    <textarea name="comment" id="" cols="30" rows="10"></textarea>
                </div>
                <div className={s.stars_container}>
                </div>
                <div className={s.button_container}>
                    <button>оставить отзыв</button>
                </div>

            </div>
        </div>
    );
};

export default Reviews;