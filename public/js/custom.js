// checking if password is repeated
const pw = document.querySelector('#InputPassword') || null;

if (pw) {
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
}

// Copying password to the clipboard

const passwordView = document.querySelector('#pwView') || null;

if (passwordView) {
  passwordView.addEventListener('click', async e => {
    if (e.target.matches('#copyBtn')) {
      const btnCopy = e.target.closest('#copyBtn');
      const inputField = document.querySelector('#copy-password');
      const id = btnCopy.dataset.pwid;
      const passwordField = document.querySelector(`#copy-${id}`);
      const data = { password: passwordField.value };

      try {
        const response = await fetch(`/decrypt/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        var res = await response.json();

        btnCopy.innerHTML = '';
        btnCopy.innerText = 'Copying..';

        await navigator.clipboard.writeText(res.password);

        btnCopy.classList.remove('btn-light');
        btnCopy.classList.add('btn-success');
        btnCopy.innerHTML = '';
        btnCopy.innerText = 'COPIED!';
      } catch (error) {
        console.error(error);
      }

      setTimeout(() => {
        btnCopy.classList.remove('btn-success');
        btnCopy.classList.add('btn-light');
        btnCopy.innerText = '';
        btnCopy.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 1500);
    }
  });
}
