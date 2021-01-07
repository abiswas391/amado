const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
// const loginFormBtn = document.getElementById('login-form-btn');
const loginForm = document.querySelector('.form-login');
const loggedInUser = document.querySelector('.loggedIn-user');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    location.assign('/login.html');
  });
}

const login = async (email, password) => {
  try {
    const result = await axios({
      method: 'POST',
      url: '/api/v2/users/login',
      data: {
        email,
        password
      }
    });
    console.log(result.data);

    if (result.data.data.status === 'success') {
      console.log('logged in successfully');
      showAlert('Logged in successfully', 1500);
      window.setTimeout(() => {
        location.assign('/');
      }, 3000);
    } else {
      showAlert('Incorrect email or password!!', 1500);
      window.setTimeout(() => {
        location.assign('/login.html');
      }, 3000);
    }
  } catch (err) {
    showAlert('Incorrect email or password!!', 1500);
    window.setTimeout(() => {
      location.assign('/login.html');
    }, 3000);
  }
};

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    console.log(email, password);
    login(email, password);
  });
}

function showAlert(msg, duration) {
  var el = document.createElement('div');
  el.setAttribute(
    'style',
    'position:absolute;top:35%;left:41%;background-color:white;color:black;font-weight:bold'
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

// window.addEventListener('load', () => {
//   // const user = await fetch('/me');
//   // console.log(user);
//   const user = localStorage.getItem('userName');
//   console.log(user);
//   if (user) {
//     if (loggedInUser) loggedInUser.textContent = `Hi ${user.name}..`;
//   }
// });

const logout = async () => {
  const res = await axios('/api/v2/users/logout');
  location.assign('/');

  // if (res.status == 'success') {
  //   location.reload();
  // }
};

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
    // location.assign('/');
  });
}
