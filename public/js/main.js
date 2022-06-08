const deleteBtn = document.querySelectorAll('.fa-ban')
const voteBtn = document.querySelectorAll('.fa-chevron-up')

Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deleteQuestion)
})

Array.from(voteBtn).forEach(btn => {
    btn.addEventListener('click', voteQuestion)
})

async function deleteQuestion() {
    const question = this.parentNode.childNodes[1].innerText
    try {
       const res = await fetch('delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: question
            })
       })
       const data = res.json()
       console.log(data)
       location.reload();
    } catch (error) {
        console.log(error.message)
    }
}

async function voteQuestion() {
    const question = this.parentNode.childNodes[1].innerText
    const vote = this.parentNode.childNodes[3].innerText
    try {
       const res = await fetch('vote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: question,
                vote: vote
            })
       })
       const data = res.json()
       console.log(data)
       location.reload();
    } catch (error) {
        console.log(error.message)
    }
}
