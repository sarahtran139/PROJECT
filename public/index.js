const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const foodSelect = document.querySelector('#food-select')
const foodList = document.querySelector('#food-list')

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter a baby name')
        return
    }

    let userDay = document.querySelector('input[name="day"]:checked').value
    let body = {
        name: nameInput.value, 
        day: +userDay, 
        foodId: +foodSelect.value
    }

    axios.post('http://localhost:4004/babies', body)
        .then((res) => {
            console.log(res)
            console.log("form submitted")
            foodSelect.value = 1
            nameInput.value = ''
            document.querySelector('#day-one').checked = true
//            getBabies()
        })
}

function deleteCard(id) {
    console.log(id)
    axios.delete(`http://localhost:4004/babies/${id}`)
        .then(() => getBabies())
        .catch(err => console.log(err))
}

function getBabies() {
    foodList.innerHTML = ''

    axios.get('http://localhost:4004/babies/')
        .then(res => {
            res.data.forEach(elem => {
                console.log(elem)
                let foodCard = `<div class="food-card">
                    <h2>${elem.baby_name}, ${elem.name}</h2>
                    <h3>Day: ${elem.day}/5</h3>
                    <button onclick="deleteCard(${elem['baby_id']})">Delete</button>
                    </div>
                `

                foodList.innerHTML += foodCard
            })
        })
}

function getFoods() {
    axios.get('http://localhost:4004/foods')
        .then(res => {
            res.data.forEach(food => {
                const option = document.createElement('option')
                option.setAttribute('value', food['food_id'])
                option.textContent = food.name
                foodSelect.appendChild(option)
            })
        })
}

getFoods()
getBabies()
form.addEventListener('submit', handleSubmit)
