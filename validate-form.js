let form = document.querySelector("#my-form");

let errorList = [];

let errorMessages = {
    'en': {
        'username_too_short': "Your user name is too short",
        'username_too_long': "Your user name is too long",
        'email_not_valid': "Your email is not valid",
        'password_too_short': "Your password is too short",
        'password_are_different' : "Passwords entered are different",
        'password_too_simple' : "Passwords missing special character or digit",
        'not_accepted': "Please accept the terms and conditions"
    },
    'jp': {
        'username_too_short': "ユーザー名が短すぎます",
        'username_too_long': "ユーザー名が長すぎます",
        'email_not_valid': "あなたのメールアドレスは無効です",
        'password_too_short': "パスワードが短すぎます",
        'password_are_different' : "入力されたパスワードが異なります",
        'password_too_simple' : "パスワードに特殊文字または数字がありません",
        'not_accepted': "利用規約に同意してください"
    }
}

let labels = {
    'en': {
        'title': "Form Validation",
        'username': "Username",
        'email': "Email",
        'password': "Password",
        'confirmpassword' : "Confirm Password",
        'acceptTC' : "I accept the terms and conditions",
        'register': `<input type="submit" value="Register" />`
    },
    'jp': {
        'title': "フォームの検証",
        'username': "ユーザー名",
        'email': "電子メール",
        'password': "パスワード",
        'confirmpassword' : "パスワードを認証する",
        'acceptTC' : "利用規約に同意します",
        'register': `<input type="submit" value="登録する" />`
    }
}

let symbols = "@#$%!^&*";

let lang = 'en';

// Get all radio buttons by their name attribute
const radios = document.querySelectorAll('input[name="language"]');

setDefaultLanguage();
setupPage();

// Add event listener to each radio button
radios.forEach(radio => {
  radio.addEventListener('change', function() {
    // Display the selected option
    lang = this.value;
    setupPage();
    replaceErrorMessages();
  });
});

// Lister to submit event
form.addEventListener('submit', (event) => {
    event.preventDefault();

    errorList = [];

    let hasAccepted = document.querySelector('#accept').checked;

    // assume not gulity unless otherwise
    let userNameTooShort = false;
    let userNameTooLong = false;
    let emailNotValid = false;
    let passwordTooShort = false;
    let passwordNotTheSame = false;

    let username = document.querySelector("#username").value;
    if (username.length < 3) {
        userNameTooShort = true;
    }
    if (username.length > 15) {
        userNameTooLong = true;
    }

    let email = document.querySelector("#email").value;
    if (!email.includes("@") || !email.includes(".") || email.length < 8) {
        emailNotValid = true;
    }

    let password = document.querySelector("#password").value;
    if (password.length <= 3) {
        passwordTooShort = true;
    }
    let confirmPassword = document.querySelector("#confirmpassword").value;
    if (confirmPassword.length <= 3) {
        passwordTooShort = true;
    }
    if (password != confirmPassword) {
        passwordNotTheSame = true;
    }

    let errors = document.querySelector('#errors');
    errors.innerHTML = "";

    if (!hasAccepted) {
        errors.innerHTML += `<li>${errorMessages[lang]['not_accepted']}</li>`;
        errorList.push('not_accepted');
    }
    if (userNameTooShort) {
        errors.innerHTML += `<li>${errorMessages[lang]['username_too_short']}</li>`;
        errorList.push('username_too_short');
    }
    if (userNameTooLong) {
        errors.innerHTML += `<li>${errorMessages[lang]['username_too_long']}</li>`;
        errorList.push('username_too_long');
    }
    if (emailNotValid) {
        errors.innerHTML += `<li>${errorMessages[lang]['email_not_valid']}</li>`;
        errorList.push('email_not_valid');
    }
    if (passwordTooShort) {
        errors.innerHTML += `<li>${errorMessages[lang]['password_too_short']}</li>`;
        errorList.push('password_too_short');
    }
    if (passwordNotTheSame) {
        errors.innerHTML += `<li>${errorMessages[lang]['password_are_different']}</li>`;
        errorList.push('password_are_different');
    }
    if (checkPasswordTooSimple(password)) {
        errors.innerHTML += `<li>${errorMessages[lang]['password_too_simple']}</li>`;
        errorList.push('password_too_simple');
    }
})

// Handle password requirements check
function checkPasswordTooSimple(password) {
    let includeSymbol = false;
    let includeNumber = false;
    let tooSimple = true;
    let digit = 0;

    for (let c in password) {
        if (symbols.includes(password[c])) {
            includeSymbol = true;
        }

        digit = parseInt(password[c]);
        if (digit >= 0 && digit <= 9) {
            includeNumber = true;
        }
    }

    if (includeSymbol && includeNumber) {
        tooSimple = false;
    }

    return tooSimple;
}

// Set default language at start up
function setDefaultLanguage() {
    if (radios[0].checked)
        lang = 'jp';
    else 
        lang = 'en';
}

// Set page appearance to selected language setting
function setupPage() {
    document.querySelector("h1").innerHTML = labels[lang]['title'];
    document.getElementById("usernameLabel").innerHTML = labels[lang]['username'];
    document.getElementById("emailLabel").innerHTML = labels[lang]['email'];
    document.getElementById("passwordLabel").innerHTML = labels[lang]['password'];
    document.getElementById("confirmLabel").innerHTML = labels[lang]['confirmpassword'];
    document.getElementById("acceptLabel").innerHTML = labels[lang]['acceptTC'];
    document.getElementById("registersubmit").innerHTML = labels[lang]['register'];
}

// Replace listed error messages when user change language setting
function replaceErrorMessages() {
    errors.innerHTML = "";
    for (let x in errorList) {
        errors.innerHTML += `<li>${errorMessages[lang][errorList[x]]}</li>`;
    }
}