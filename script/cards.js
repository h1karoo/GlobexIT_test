async function getResponse(){
    let modal_win = document.querySelector('.modal_content');
    let btns;
    let find_word = ""
    let find = document.getElementById("finder");
    let link = 'http://127.0.0.1:3000/?term='
    let response = await fetch(link+find_word)
    let content = await response.json()
    let cards = document.querySelector('.cards')
    let key;
    for (key in content) {
        cards.innerHTML += `
        <li class = "card" id = "card ${key}" data-modal-btn="my_modal1">
        <p class = "card-name">${content[key].name}</p>
        <div class = "info">
        <img class = "elem" src = '/src/phone.png'>
        <p class = "card-phone elem">${content[key].phone}</p>
        <img class = "elem" src = '/src/email.png'>
        <p class = "card-email elem">${content[key].email}</p>`
    btns = document.querySelectorAll("*[data-modal-btn]");
    for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        modal_win.innerHTML = ""
        modal_win.innerHTML +=`<li class = "card" id = "card ${key}" data-modal-btn="my_modal1">
        <p class = "card-name">${content[key].name}</p>
        <div class = "info">
        <img class = "elem" src = '/src/phone.png'>
        <p class = "card-phone elem">${content[key].phone}</p>
        <img class = "elem" src = '/src/email.png'>
        <p class = "card-email elem">${content[key].email}</p>
        <p class = "card-date elem">Дата приема: ${content[key].hire_date}</p>`     
        let name = btns[i].getAttribute('data-modal-btn');
        let modal = document.querySelector("[data-modal-window='" + name + "']");
        modal.style.display = "block";
    });
    }
}

window.onclick = function (event) {
  if (event.target.hasAttribute('data-modal-window')) {
    let modals = document.querySelectorAll('*[data-modal-window]');
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
  }
}
    find.addEventListener('input', async () => {
        find_word = find.value
        response = await fetch(link+find_word)
        content = await response.json()
        cards.innerHTML = ""
        for (key in content) {
            cards.innerHTML += `
            <li class = "card">
            <p class = "card-name">${content[key].name}</p>
            <div class = "info">
            <img class = "elem" src = '/src/phone.png'>
            <p class = "card-phone elem">${content[key].phone}</p>
            <img class = "elem" src = '/src/email.png'>
            <p class = "card-email elem">${content[key].email}</p>
            </div>`
        }
    });
}
find()
getResponse()