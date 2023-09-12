import React from "react";

function InputError({ message, className = "", ...props }) {
    return message ? (
        <p {...props} className={"text-sm text-rose-500 mt-1" + className}>
            {message}
        </p>
    ) : null;
}

export default InputError;
