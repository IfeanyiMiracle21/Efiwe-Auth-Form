/* TAB SWITCHING */
const tabs = document.querySelectorAll('.tab');
const section = document.querySelector('.form-section');
tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    section.className = 'form-section ' + t.dataset.tab;
    updateProgress(t.dataset.tab);
}));

/* ACCOUNT TYPE */
function updateFields() {
    const isGroup = document.querySelector('input[name="acct"][value="grp"]').checked;
    const nameLabel = document.getElementById('name-label');
    const nameInput = document.getElementById('name-input');
    const groupSizeWrapper = document.getElementById('group-size-wrapper');
    const genderWrapper = document.getElementById('gender-wrapper');

    nameLabel.textContent = isGroup ? 'Group Name' : 'Full Name';
    nameInput.placeholder = isGroup ? 'Group Name' : 'Full Name';
    groupSizeWrapper.classList.toggle('show', isGroup);
    document.getElementById('group-size').required = isGroup;
    genderWrapper.classList.toggle('show', !isGroup);
    if (isGroup) genderWrapper.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
}
updateFields();

/* PROGRESS BAR */
function updateProgress(form) {
    const box = document.getElementById(form + '-box');
    if (!box) return;
    const inputs = box.querySelectorAll('input[required], select[required]');
    const bar = box.querySelector('.progress-bar');
    let filled = 0;

    inputs.forEach(i => {
        if (i.type === 'radio' && i.checked) filled++;
        else if (i.tagName === 'SELECT' && i.value) filled++;
        else if (i.value.trim()) filled++;
    });

    const percent = inputs.length > 0 ? (filled / inputs.length) * 100 : 0;
    bar.style.width = percent + '%';
}

/* VALIDATION */
function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

document.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        clearErrors();
        const action = btn.dataset.action;

        if (action === 'login') {
            const email = document.getElementById('login-email').value.trim();
            const pwd = document.getElementById('login-pwd').value;
            if (!email) return showError('login-email-error', 'Email is required');
            if (!pwd) return showError('login-pwd-error', 'Password is required');
            alert('Login successful! (demo)');
        }

        else if (action === 'signup') {
            const name = document.getElementById('name-input').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const pwd = document.getElementById('signup-pwd').value;
            const isGroup = document.querySelector('input[name="acct"][value="grp"]').checked;

            if (!name) return showError('name-error', 'Name is required');
            if (!email) return showError('signup-email-error', 'Email is required');
            if (!pwd) return showError('signup-pwd-error', 'Password is required');
            if (pwd.length < 6) return showError('signup-pwd-error', 'Password must be 6+ characters');

            if (isGroup && !document.getElementById('group-size').value)
                return showError('group-size-error', 'Please select group size');
            if (!isGroup && !document.querySelector('input[name="gender"]:checked'))
                return showError('gender-error', 'Please select gender');

            alert('Signup successful! (demo)');
        }

        else if (action === 'reset') {
            const email = document.getElementById('reset-email').value.trim();
            if (!email) return showError('reset-email-error', 'Email is required');
            alert('Reset link sent! (demo)');
        }

        else if (action === 'google') {
            alert('Google login – demo');
        }
    });
});

// Init
updateProgress('login');
