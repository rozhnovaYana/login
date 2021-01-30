export function getAuthForm(formSubmitBtn) {
    return `<form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="text" id="email" required >
                    <label for="email">Email</label>
                </div>  
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password" required minLength="6">
                    <label for="password">Password</label>
                </div>  
                <button 
                    type="submit" 
                    class="mui-btn mui-btn--raised mui-btn--raised mui-btn--accent"
                    id="auth-btn">
                    ${formSubmitBtn}
                </button>
            </form>`
}
export function authWithEmailAndPassword(email, password) {
    const apiKey=`AIzaSyC-CfzWgUbTHez2osZ9LNJDcCEnDUAXVEU`
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method:"POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken:"true"
        }),
        headers: {
                "Content-Type": "application/json"
            }
    })
        .then(response => response.json())
    .then(data=>data.idToken)
}