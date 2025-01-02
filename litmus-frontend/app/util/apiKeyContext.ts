'use client'

import { createContext, useContext } from 'react';

const ApiKeyContext = createContext('');

export const useApiKey = () => {
    const apiKey = useContext(ApiKeyContext);
    return apiKey || ''; // Return null if apiKey is undefined
};

export default ApiKeyContext;