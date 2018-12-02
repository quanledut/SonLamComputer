export function isLoggedIn() {
    return (localStorage.getItem('token'))
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}