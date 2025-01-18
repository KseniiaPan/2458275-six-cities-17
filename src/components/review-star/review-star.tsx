type ReviewStarProps = {
  onChange: React.ChangeEventHandler<HTMLElement>;
  starsCount: number;
  starsCountMeaning: string;
  isDisabled: boolean;
  }

function ReviewStar ({onChange, starsCount, starsCountMeaning, isDisabled}: ReviewStarProps):
  JSX.Element{
  return(
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={starsCount}
        id={`${starsCount}-stars`}
        type="radio"
        onChange={onChange}
        disabled={isDisabled}
      />
      <label
        htmlFor={`${starsCount}-stars`}
        className="reviews__rating-label form__rating-label"
        title={ starsCountMeaning}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewStar;
