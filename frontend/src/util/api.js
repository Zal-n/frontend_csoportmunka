export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth//login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',

    // Content
    GET_CATEGORIES: '/content/categories',
    GET_RECIPES_BY_CATEGORY: (category, queryParams = { page: 1, limit: 10 }) => {
        const query = new URLSearchParams(queryParams).toString();
        return `/content/category/${category}${query ? '?' + query : ''}`;
    },
    GET_RECIPE_BY_ID: (id, queryParams = { page: 1, limit: 10 }) => {
        const query = new URLSearchParams(queryParams).toString();
        return `/content/id/${id}${query ? '?' + query : ''}`;
    },
    GET_RECIPES_BY_NAME: (name, queryParams = { page: 1, limit: 10 }) => {
        const query = new URLSearchParams(queryParams).toString();
        return `/content/id/${name}${query ? '?' + query : ''}`;
    },
    POST_RECIPE: '/content/upload',

}
