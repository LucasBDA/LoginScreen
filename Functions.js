//VARIÁVEIS GLOBAIS 
let loginPageBackup = "";
let screen = "Login";
let mobileAndPassword = [];
mobileAndPassword.fill(false)

//APENAS FUNÇÕES POR AQUI =)

function getSlideSequence(id){
    const seq = id.split("_");
    return Number(seq[1]);
}

function closeLogin(){
    if(screen != "Create"){
        document.getElementById("login-content").classList.add("close");
        setTimeout(function() {
            createAccount();
          }, 500);
    }    
}

function closeSignUp(){
    if(screen != "Login"){
        let loginScreen = document.getElementById("login-content");
        loginScreen.classList.add("close");
        setTimeout(function() {
            loginScreen.innerHTML = loginPageBackup;
            screen = "Login"
            loginScreen.classList.remove("close");
            const creations = document.querySelectorAll(".create-account");
            creations.forEach((e) => {
                e.addEventListener("click", closeLogin);
            })
          }, 500);
    }    
}

function createAccount(){
    let loginPage = document.getElementById("login-content");
    loginPageBackup = loginPage.innerHTML;
    console.log("função chamada!")
    screen = "Create"
    loginPage.innerHTML = `
            <h1 id="login">Create Account</h1>
            <div class = "login-content">
                <form id = "login-data">
                    <p id = "signup-info" class = "information-text">
                        Enter your information below or continue with social media account
                    </p>
                    <div class = "input-info">        
                        <img class = "symbols" src = "icons/mail.png"> 
                        <div class = "input-container">               
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Your email address" required>
                        </div>
                    </div>
                    <div class = "input-info">        
                        <img class = "symbols" src = "icons/phone.png"> 
                        <div id = "input-conteiner-id" class = "input-container">               
                            <label id = "mobile-conteiner" for="email">Mobile Number</label>
                            <img id = "error-phone" src = "icons/error.png">
                            <input type="text" id="tel" name="tel" placeholder="Your mobile number" maxlength="16" required>
                        </div>
                    </div>
                    <div class = "input-info">    
                        <img class = "symbols" src = "icons/lock.png"> 
                        <div id = "password-creation-conteiner" class = "input-container">                   
                            <label id = "password-creation-label" for="password">Password</label>
                            <img id = "error-password" src = "icons/error.png">
                            <input type="password" id="password" name="password" placeholder="Enter your password" required>
                            <div id="password-strength"></div>
                        </div>
                    </div>
                    <button type="submit">
                        <ul>
                            <li>
                                <img id = "login-img" src = "icons/login.png">
                            </li>
                            <li>
                                    CREATE ACCOUNT
                            </li>
                        </ul>
                    </button>
                    <div>
                        <h3 class = "social-accounts-text">Or  Register  with  Social  Accounts</h3>
                    </div>
                    <div id = "social-medias">
                        <ul>
                            <li>
                                <img src = "icons/google.png">
                            </li>
                            <li>
                                <img src = "icons/facebook.png">
                            </li>
                            <li>
                                <img src = "icons/apple.png">
                            </li>
                            <li>
                                <img src = "icons/twitter.png">
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 id = "signup-final-text" class = "final-text">
                           Already  have  an  account?<span id = "login-account"> Login  Now</span>
                        </h3>
                    </div>
                </form>
            </div>
    `;
    
    new Cleave("#tel", {
        delimiters: ['(', ') ', ' ', '-'],
        blocks: [0, 2, 1, 4, 4],
        numericOnly: true
    });

    const phoneNumberInput = document.getElementById("tel");
    phoneNumberInput.addEventListener("blur", () => {    
        const phoneNumber = phoneNumberInput.value;
        const regex = /\(\d{2}\) 9 \d{4}-\d{4}/;
    
        if (!regex.test(phoneNumber)) {
            if(phoneNumberInput.value.trim() !== ""){
                document.getElementById("error-phone").style.display = 'block';
                mobileAndPassword[0] = false
            }   
            else{
                document.getElementById("error-phone").style.display = 'none';
                mobileAndPassword[0] = false
            }         
        } else {
            document.getElementById("error-phone").style.display = 'none';
            mobileAndPassword[0] = true
        }
    });

    const login = document.getElementById("login-account");
    login.addEventListener("click", closeSignUp);


    let passwordInput = document.getElementById("password");
    let passwordStrength = document.getElementById("password-strength");

    passwordInput.addEventListener("blur", function() {
        if (checkPasswordStrength(passwordInput.value) === "weak") {
            if(passwordInput.value.trim() !== ""){
                document.getElementById("error-password").style.display = 'block';
                mobileAndPassword[1] = false
            }   
            else{
                document.getElementById("error-password").style.display = 'none';
                mobileAndPassword[1] = false
            }         
        } else {
            document.getElementById("error-password").style.display = 'none';
            mobileAndPassword[1] = true
        } 
    })

    passwordInput.addEventListener("input", function() {
        let strength = checkPasswordStrength(passwordInput.value);
        if(strength === "strong" || strength === "medium"){
            mobileAndPassword[1] = true
        }
        else{
            mobileAndPassword[1] = false
        }
        if(passwordInput.value.trim() !== "") updatePasswordStrengthIndicator(strength);
        else{
            passwordStrength.style.backgroundColor = "lightgray";
            passwordStrength.style.width = "100%";
        }
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        let value = Math.round(password.length/4);

        strength+= value;

        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[\W_]/)) strength++;
        
        console.log("password_strength_code = " + strength)

        if (strength <= 3) {
            return 'weak';
        } else if (strength <= 5) {
            return 'medium';
        } else {
            return 'strong';
        }
    }
    
    function updatePasswordStrengthIndicator(strength) {
        passwordStrength.className = '';
    
        if (strength === 'weak') {
            passwordStrength.style.backgroundColor = "red"
            passwordStrength.style.width = "33%"
        } else if (strength === 'medium') {
            passwordStrength.style.backgroundColor = "rgb(255, 208, 0)"
            passwordStrength.style.width = "66%"
        } else if (strength === 'strong') {
            passwordStrength.style.backgroundColor = "rgb(1, 202, 1)"
            passwordStrength.style.width = "100%"
        }
    }    

    let accountForm = document.getElementById("login-data");
    accountForm.addEventListener("submit", (e) => {
        if(mobileAndPassword[0] === false || mobileAndPassword[1] === false){
            e.preventDefault();
            if(mobileAndPassword[0] === false && mobileAndPassword[1] === true) alert("Your mobile number is not valid.")
            if(mobileAndPassword[0] === true && mobileAndPassword[1] === false) alert("Your password is still quite weak.")
            if(mobileAndPassword[0] === false && mobileAndPassword[1] === false) alert("Your mobile number and password are not valid.")
        }        
    });

    loginPage.classList.remove("close")
}