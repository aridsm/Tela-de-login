const btns = document.querySelectorAll('.btns-login button')
const allInputs = document.querySelectorAll('.ct-input input')

allInputs.forEach((item) => {
item.addEventListener('keydown', (k) => {
    if (k.keyCode === 32) {
        k.preventDefault()
    }
})
item.addEventListener('paste', (e) => e.preventDefault())
})

function changeForm(i){

    for (let form of document.forms) form.classList.remove('ativo')
    for (let btn of btns) btn.classList.remove('ativo')

    document.forms[i].classList.add('ativo')
    btns[i].classList.add('ativo')

}

btns.forEach((item, index) => {
    item.addEventListener('click', () => {
        changeForm(index)
    })
})

/* validacao */
// Fazer a validação com regex.
// O nome de usuário deve conter, no máximo, 20 caracteres.
// A senha deve conter, pelo menos, um número e um caractere especial (@ ! # $ % & * (){}[] " ' _ - /\>< : ; ´) e no mínimo 10 caracteres
// As senhas deve m ser iguais
// O email deve conter caracteres, pontos, numeros, _ - em qualquer quantidade até o @. Depois do @ deve conter letras ou . e terminar com uma letra

function validationForm(t) {
    const f = t.parentElement
    f.classList.remove('valido', 'invalido', 'atencao')
    if (f.lastElementChild.classList.contains('valid')) f.lastElementChild.remove()

    const pass = document.querySelector('#senha')
    const passRpt = document.querySelector('#senha-rpt')

    if(!t.checkValidity()) {
        if (t.id == "usuario" ) checkVal('invalido', 'O nome de usuário deve conter pelo menos 6 caracteres', f)
        else if (t.id == "email") checkVal('invalido', 'O valor inserido não corresponde a um email', f)
        else if (t.id == "senha") {
            initialPass(passRpt)
            checkVal('invalido', 'A senha deve conter pelo menos 8 caracteres', f)
        }
        
    } else if (t.value){
        if (t === pass) passRpt.removeAttribute('disabled')
        if (t.id == "senha-rpt") {
            if (pass.value !== passRpt.value)
            checkVal('invalido', 'As senhas não correspondem', f)
        }
        f.classList.add('valido')

    } else {
        if (t === pass) initialPass(passRpt)
        checkVal('atencao', 'Este campo é obrigatório', f)
    }
}

function initialPass(e) {
    e.setAttribute('disabled', '')
    e.parentElement.classList.remove('valido', 'invalido', 'atencao')
    e.value = ''
    if (e.parentElement.lastElementChild.classList.contains('valid')) e.parentElement.lastElementChild.remove()
}

function checkVal(classe, insert, f) {
    f.classList.add(classe)
    const spanValid = document.createElement('span')
    spanValid.classList.add('valid')
    spanValid.textContent = insert
    f.appendChild(spanValid)
}

document.forms.criar.addEventListener('input', (e) => {
    const t = e.target
    validationForm(t)
})

const btnSubmit = document.querySelector('#submit-conta')

btnSubmit.addEventListener('click',  (e) => {
    const inputs = e.target.parentElement.querySelectorAll('.ct-input input')
    const arrayInputs = Array.from(inputs)
    const ifInvalid = arrayInputs.some((i) => {
        return i.parentElement.classList.contains('invalido') || i.value == ''
    })
    if (ifInvalid) {
        e.preventDefault()
        inputs.forEach((item) => validationForm(item))
    } 
})

document.addEventListener('invalid', (e) => {
    e.preventDefault()
}, true)

