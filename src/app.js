import "./style.css"
import { createModal, isValid } from "./utils"
import { Question , renderModalAfterAuth, renderModalAfterReg} from "./question"
import { getAuthForm, authWithEmailAndPassword } from "./auth"
import {regWithPasswordAndEmail} from "./reg"
const form = document.querySelector("#form")
const input = form.querySelector("#question-input")
const submitBtn = form.querySelector("#submit")
const login = document.querySelector("#login-btn")
const signUp=document.querySelector("#signup-btn")
window.addEventListener("load", Question.renderList)
login.addEventListener("click", ()=>openModal("Авторизация", "Log in", authFormHandler))
form.addEventListener("submit", submitFormHandler)
signUp.addEventListener("click", ()=>openModal("Регистрация", "Sign up", regFormHandler))
function submitFormHandler (e) {
    e.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            data:new Date().toJSON()
        }
        submitBtn.disabled = "true"
        Question.create(question)
            .then(()=> {
            input.value = ""
            input.className = ""
            submitBtn.disabled = "false"
        })
        
        
    }
}
input.addEventListener("input", () => {
    submitBtn.disabled = !(isValid(input.value))
});


function openModal(modalHeader, modalSubmitBtn, fn) {
    createModal(modalHeader, getAuthForm(modalSubmitBtn))
    document.querySelector("#auth-form").addEventListener("submit", fn, { once: true });
    
}
function regFormHandler(e) {
    e.preventDefault()
    const email = e.target.querySelector("#email").value,
        password = e.target.querySelector("#password").value,
        btn = e.target.querySelector("#auth-btn");
    btn.disabled = "true"
    regWithPasswordAndEmail(email, password)
        .then(renderModalAfterReg)
}
function authFormHandler(e) {
    e.preventDefault()
    const email = e.target.querySelector("#email").value,
        password = e.target.querySelector("#password").value,
        btn = e.target.querySelector("#auth-btn");
    btn.disabled="true"
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled="false")
}
