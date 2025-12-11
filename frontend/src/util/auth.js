import { API_BASE_URL, API_ENDPOINTS } from "./api.js";

let isRefreshing = false;
let refreshPromise = null;

export async function fetchWithAuth(url, options = {}) {
    try {
        let res = await fetchWithCredentials(url, options);

        if (res.status == 401) {
            const refreshed = await refreshToken();

            if (refreshed) {
                res = await fetchWithCredentials(url, options);
            } else {
                const protectedRoutes = ['/fridge'];
                const currentPath = window.location.pathname;

                if (protectedRoutes.some(route => currentPath.startsWith(route))) {
                    window.location.href = '/login';
                }
            }
        }
    } catch (error) {
        console.error('Network error: ', error);
        throw error;
    }
}



export async function refreshToken() {
    if (isRefreshing) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFRESH}`, {
                method: 'POST',
                credentials: 'include',
            });
            return res.ok;
        } catch (error) {
            console.error('Token refresh failed: ', error);
            return false;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })
}

function fetchWithCredentials(url, options = {}) {
    return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        }
    });
}