import { useEffect, useRef, useState } from 'react';
import { ITextarea } from './text-area.interface';
import './text-area.style.css'

const Textarea = ({
    disabled = false,
    readonly = false,
    required = false,
    ...props
}: ITextarea) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [focus, setFocus] = useState(false);
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : '';
    const isRequired = required
        ? "after:content-['*'] after:text-logistical-red-ver1"
        : '';
    const isFocus = focus
        ? 'text-logistical-blue-ver3'
        : 'text-logistical-blue-ver7';
    const handleFocusEvent = () => {
        setFocus(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                textareaRef.current &&
                !textareaRef.current.contains(event.target as Node)
            ) {
                setFocus(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`textareaParent-style`}>
            <label className={`${showLabelClass}`}>
                <div>
                    <p className={`${isRequired} ${isFocus}`}>{props.label}</p>
                </div>
            </label>
            <textarea
                {...props}
                ref={textareaRef}
                disabled={disabled}
                className={`${props.className}`}
                placeholder={props.placeholder}
                value={props.value}
                readOnly={readonly}
                required={required}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e)
                }}
                onFocus={handleFocusEvent}
            />
        </div>
    );
};

export default Textarea;
