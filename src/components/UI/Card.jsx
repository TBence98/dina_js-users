import classes from "./Card.module.css";

const Card = ({ children, className }) => {
    return (
        <div className={`${classes.card} ${className ? className : undefined}`}>
            {children}
        </div>
    );
};

export default Card;
