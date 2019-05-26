// checking if password is repeated

const pw = document.querySelector('#InputPassword');
const pw_repeat = document.querySelector('#RepeatPassword');
const errMsg = document.querySelector('#pw_error');
const btnSignup = document.querySelector('#btn-signup');
const arr = [pw, pw_repeat];
arr.forEach(element =>
  element.addEventListener('input', () => {
    if (pw.value != pw_repeat.value) {
      errMsg.style.display = 'block';
      errMsg.innerText = `Passwords do not match!`;
      btnSignup.setAttribute('disabled', 'disabled');
    } else if (pw.value == '') {
      errMsg.style.display = 'none';
      btnSignup.setAttribute('disabled', 'disabled');
    } else {
      errMsg.style.display = 'none';

      btnSignup.removeAttribute('disabled');
    }
  })
);
