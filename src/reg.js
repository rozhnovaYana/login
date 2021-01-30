export function regWithPasswordAndEmail(email, password) {
    const apiKey=`AIzaSyC-CfzWgUbTHez2osZ9LNJDcCEnDUAXVEU`
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method:"POST",
        body: JSON.stringify({
            email, password, returnSecureToken: "true"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return  Promise.resolve("Email exists")
            } else {
                return  response.json()
            }
        })
    
    
}