import { API_BASE_URL, API_ENDPOINTS } from "./api.js";

let isRefreshing = false;
let refreshPromise = null;

export async function fetchWithAuth(url, options = {}) {
    try {
        let res = await fetchWithCredentials(url, options);

        if (res.status == 401) {
            const refreshed = await refreshToken();

            if (refreshed) {
                // Ha sikerült frissíteni, újrapróbáljuk az eredeti kérést
                res = await fetchWithCredentials(url, options);
            } else {
                const protectedRoutes = ['/fridge'];
                const currentPath = window.location.pathname;

                if (protectedRoutes.some(route => currentPath.startsWith(route))) {
                    window.location.href = '/login';
                }
            }
        }

        // --- EZ HIÁNYZOTT: ---
        return res; 
        // ---------------------

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
    
    // Javítás: Azonnal meghívjuk a függvényt a () jellel a végén, 
    // hogy Promise-t kapjunk, ne egy függvény definíciót.
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
    })(); // <--- Itt a () a végén fontos!

    return refreshPromise;
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

export function logout(){
    return fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, {
        method: 'POST'
    })
}