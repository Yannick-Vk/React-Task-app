import React, {type SetStateAction, useCallback, useRef, useState} from "react";

export function useStateWithReset<T>(initialValue: T): [T, React.Dispatch<SetStateAction<T>>, () => void] {
    const initialValueRef = useRef(initialValue);

    const [item, setItem] = useState<T>(initialValue);

    const reset = useCallback(() => {
        setItem(initialValueRef.current);
    }, []);

    return [item, setItem, reset];
}