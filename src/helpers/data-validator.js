export const validationPassword = async(password = '') =>{
    let containsCapittalLetter = false;
    let containsNumber = false;
    let containsSpecialCharacter = false;

    for(let i = 0; i < password.length; i++){

        if(password[i].match(/[A-Z]/)){

            containsCapittalLetter = true;

        }else if(password[i].match(/[0-9]/)){

            containsNumber = true;

        }else if(password[i].match(/[!$%#]/)){

            containsSpecialCharacter = true;

        }

    }

    if (containsCapittalLetter && containsNumber && containsSpecialCharacter) {

    } else {
        throw new Error("The password doesn't have the necessary parameters: Capital letters, Numbers, Special Characters ");
    }

}