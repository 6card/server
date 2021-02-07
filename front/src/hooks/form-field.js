import { useState, useCallback } from "react";

const useFormField = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e) => setValue(e.target.value), []);
    return { value, onChange, setValue };
};

export default useFormField;