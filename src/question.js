import { createModal } from "./utils";

export  class Question {
    static create(question) {
        return fetch("https://login-e4ff7-default-rtdb.firebaseio.com/questions.json", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(body => {
                question.id = body.name;
                console.log(body)
                return question
            }
            )
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p>Not found</p>')
        }
            return fetch(`https://login-e4ff7-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
                .then(resp => resp.json())
                .then(data => {
                    if (data&&data.error) {
                        return (`<p class="error-msg">${data.error}</p>`)
                    }
                    return data ? Object.keys(data).map(key => {
                        return (
                            {...data[key],
                            id:key  
                            }
                        )}):[]
                })
                
        
    }
    static renderList() {
        const all = getQuestionFromLocalStorage()
        const html = all.length
            ? all.map(toCard).join("")
            : `<div class="mui--text-headline">Вопросов еще нет</div>`
        document.querySelector("#list").innerHTML=html
        
    }
    static listToHTML(content) {
        const htmlList = content.map(key => {
            return (`
            <li>${key.text}</li>
            `)
        }).join("")
        return content.length ?` <ol>${ htmlList}</ol>`:`<p class="error">Вопросов пока нет</p>`
    }
}
function addToLocalStorage(question) {
    const all = getQuestionFromLocalStorage()
    all.push(question)
    localStorage.setItem("questions", JSON.stringify(all))
}
function getQuestionFromLocalStorage() {
    return JSON.parse(localStorage.getItem("questions")||"[]")
}
function toCard(item) {
    return `
        <br>
          <div class="mui--text-black-54">
          ${(new Date(item.data)).toLocaleDateString()}
          ${(new Date(item.data)).toLocaleTimeString()} </div>
          <div>${item.text} </a></div> 
        <br>
          `
}
export function renderModalAfterAuth(content) {
    if (typeof (content) === "string") {
        createModal("Error", content)
    } else {
        createModal("Список вопросов", Question.listToHTML(content))
    }
}
export function renderModalAfterReg(content) {
    if (typeof (content) === "string") {
        createModal("Error", content)
    } else {
        createModal("Аккаунт успешно создан", "<p>Thanks<p/>")
    }
}