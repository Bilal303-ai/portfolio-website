const navBar = document.querySelector('.navbar');
const navToggler = document.querySelector('.nav-toggler');
const menuIcon = document.getElementById('nav-menu');
const closeIcon = document.getElementById('nav-close');

navToggler.addEventListener('click', () => {
    const visibility = navBar.getAttribute('data-visible')
    
    if (visibility === 'false') {
        navBar.setAttribute('data-visible', true);
        closeIcon.setAttribute('close-visible', true);
        menuIcon.setAttribute('menu-visible', false);
    }
    else {
        navBar.setAttribute('data-visible', false);
        closeIcon.setAttribute('close-visible', false);
        menuIcon.setAttribute('menu-visible', true)
    }

});

navToggler.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    const isClickInside = navBar.contains(event.target);
    if (!isClickInside) {
        navBar.setAttribute('data-visible', false);;
    }
});

document.getElementById('sendMsgBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        showStatusMessage();
        document.getElementById('statusMessage').innerText = '*All fields are required!';
        return;
    }

    if (!isValidEmail(email)) {
        showStatusMessage();
        document.getElementById('statusMessage').innerText = '*Please enter a valid email!';
        return; 
    }


    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "bilalhasan403@gmail.com",
        Password : "926B9E7EC241AA72BC5DF4AD6043D7034301",
        To : 'bilalhasan403@gmail.com',
        From : "bilalhasan403@gmail.com",
        Subject : `New message from ${name}`,
        Body : `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>` 
    }).then(response => {
        showStatusMessage();
        document.getElementById('statusMessage').innerText = 'Message sent successfully';
        clearForm();
        setTimeout(() => {
            document.getElementById('statusMessage').style.opacity = 0; 
        }, 3000);
    }).catch(error => {
        showStatusMessage();
        document.getElementById('statusMessage').innerText = 'Failed to send the message. Please try again.';
    });
});

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


function showStatusMessage() {
    document.getElementById('statusMessage').style.opacity = 1;
}

let sections = document.querySelectorAll('section')
let navBtns = document.querySelectorAll('.first-page a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 10;
        let height = sec.offsetHeight;
        let secPos = sec.getAttribute('pos');

        if (top >= offset && top < offset + height) {
            navBtns.forEach(btn => {
                let btnPos = btn.getAttribute('pos');
                if (secPos == btnPos) {
                    btn.setAttribute('active', 'true');
                }

                else {
                    btn.setAttribute('active', 'false');
                }
                
            });
        };
    });
};
