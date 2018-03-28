    export function validateEmail(email) {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(email);
    }
    export function validateUnicode(email) {
      var regex = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
      if (regex.test(email)) {
        return true;
      }
      return false;
    }
  
    export function validatePassword(password){
      if(password.length>=5){
        return true
      } else {
        return false
      }
    }
    export function comparePassword(password, passwordConfirmed) {
      return (password.localeCompare(passwordConfirmed)==0);
    }
    export function validatePasswordRegister(password) {
      return (password.length > 8)
    }
    export function checkSpaceAll(text){
     if (text.replace(/\s/g, '').length) {
        return true
      }
      return false
    }

