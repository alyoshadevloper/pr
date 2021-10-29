document.querySelectorAll('.card-price').forEach(element => {
    element.textContent = new Intl.NumberFormat('uz-Uz' , {
        currency : "UZS",
        style : 'currency'
    }).format(element.textContent)
});;


////// deleteing in shopping bag 

const $deleteBtn = document.querySelectorAll('.delete');

$deleteBtn.forEach(element => {
    element.addEventListener('click' , (e) => {
        var id = e.target.dataset.id || e.target.parentNode.dataset.id
        fetch("/card/remove/" + id , {
            method: 'delete'
        }).then(res => res.json())
        .then(card => {
            console.log(card);
            location.reload()
        })
    })
});