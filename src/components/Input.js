import cn from "classnames";
import {useEffect, useState} from "react";

const Input = (props) => {
  const {onChange, error, placeholder, value, ...other} = props

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setIsFilled(true);
    }
  }, [value]);

  return (
    <div className="field">
      <div className={cn('input-text', {'error': error}, {'focused': isFocused}, {'filled': isFilled})}>
        <div className="input-text__placeholder">{placeholder}</div>
        <input
          className="input-text__input"
          type="text"
          value={value}
          {...other}
          onChange={(e) => {
            onChange({target: {name: other.name, value: e.target.value}});
            if (e.target.value.length > 0) {
              setIsFilled(true);
            } else {
              setIsFilled(false);
            }
          }}
          onFocus={(e) => {
            setIsFocused(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
          }}
        />
      </div>
      <div className="field__error">{error}</div>
    </div>
  );
}
export default Input