'use client';
import { useCallback, useRef } from 'react';

// Ensures we fire less API calls (after the user is done typing)(
export function useDebounce(callback:() => void, delay: number){

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback(()=> {
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);

        }
        timeoutRef.current = setTimeout(callback, delay)
    }, [callback, delay])

}