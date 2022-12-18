import classes from "./Button.module.css";

const Button = ({ onClick, className, type="button", children }) => {
    return (
        <button
            type={type}
            className={`${classes.button} ${className ? className : undefined}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
