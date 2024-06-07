import cn from "classnames";
import {createRef, forwardRef, useEffect, useRef, useState} from "react";
import {IMaskInput} from "react-imask";


const MaskedInput = forwardRef((props, inputRef) => {
    const {onChange, mask, error, labelText, value, ...other} = props;
    const ref = createRef();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setIsFilled(true);
    }
  }, [value]);

    return (
      <field className="field">
        <div className={cn('input-text', {'error': error}, {'focused': isFocused}, {'filled': isFilled})}>
          <div className="input-text__placeholder">{labelText}</div>
          <IMaskInput
            {...other}
            inputRef={inputRef}
            ref={ref}
            mask={mask}
            showMask={true}
            className="input-text__input"
            value={value}
            onAccept={(value) => {
              onChange({target: {name: other.name, value}});
              if (value.length > 0) {
                setIsFilled(true);
              } else {
                setIsFilled(false);
              }
            }}
            onFocus={(value) => {
              setIsFocused(true);
            }}
            onBlur={(value) => {
              setIsFocused(false);
            }}
          />
        </div>
        <div className="field__error">{error}</div>
      </field>
    );
  }
);
export default MaskedInput