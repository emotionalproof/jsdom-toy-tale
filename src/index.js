// let addToy = false;


// document.addEventListener("DOMContentLoaded", () => {
//   const toyCollection = document.querySelector("div#toy-collection")
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

//   fetch('http://localhost:3000/toys')
//     .then(response => response.json())
//     .then(toyList => {
//       toyList.forEach(toyObj => {
//         makeOneToy(toyObj)
//       })
//     })
  
//   const makeOneToy = (toyObj) => {
//     const div = document.createElement('div')
//     div.dataset.id = toyObj
//     div.innerHTML = `
//             <h2>${toyObj.name}</h2>
//             <img src=${toyObj.image} alt=${toyObj.name} class="toy-avatar" />
//             <p>${toyObj.likes} Likes </p>
//             <button class="like-btn">Like <3</button>
//                     `
//     toyCollection.append(div)

//   }
  
//   const submitToy = document.querySelector('form.add-toy-form')
//   submitToy.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const form = event.target
//     // const name = event.target[0].value
//     const name = form.name.value
//     const image = form.image.value
//     const newToyObj = {
//                         name,
//                         image,
//                         likes: 0
//                       }
//     fetch('http://localhost:3000/toys', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(newToyObj),
//     })
//         .then(response => response.json())
//         .then(toyObj => makeOneToy(toyObj))
//         .catch((error) => console.error("Error:", error))
//   })


// });

// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."


// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.






// When a user clicks on the add new toy button, 

// a POST request is sent to http://localhost:3000/toys 

// and the new toy is added to Andy's Toy Collection.

// The toy should conditionally render to the page.

// In order to send a POST request via Fetch, 

// give the Fetch a second argument of an object. 

// This object should specify the method as POST 
// and also provide the appropriate headers and the JSON-ified data for the request. 

// If your request isn't working, make sure your header and keys match the documentation.
































document.addEventListener('DOMContentLoaded', () => {
  FORM_CONTAINER = document.querySelector('.container')
  getToys()
  clickHandler()
  submitHandler()
})
let addToyForm = false

const getToys = () => {
  fetch('http://localhost:3000/toys')
    .then(data => data.json())
    .then(toys => renderAllToys(toys))
}

const renderAllToys = toys => {
  toys.forEach(toy => {
    renderToy(toy)
  })
}

const renderToy = toy => {
  const div = createDiv(toy)
  const toyContainer = document.querySelector('#toy-collection')
  toyContainer.append(div)
}

const formDisplay = () => {
  addToyForm = !addToyForm
  if (addToyForm) {
    FORM_CONTAINER.style.display = 'block'
  } else {
    FORM_CONTAINER.style.display = 'none'
  }

}

const createDiv = toy => {
  const div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = toy.id
  div.innerHTML = `
            <h2>${toy.name}</h2>
            <img src=${toy.image} alt=${toy.name} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button class="like-btn">Like ❤️</button>
            <br>
            <br>
            <button class="delete-btn">🤯</button>
                  `
  return div
}

const increaseLikes = toy => {
  const id = toy.dataset.id
  const likesText = toy.querySelector('p').innerText
  const currentLikes = parseInt(likesText)
  const newLikes = currentLikes + 1
  const patchObj = {likes: newLikes}
  patchLikes(id, patchObj)
}

const clickHandler = () => {
  document.addEventListener('click', (e) => {
    if (e.target.id === "new-toy-btn") {
      formDisplay()
    } else if (e.target.className === 'like-btn') {
      const toyCard = e.target.parentElement
      increaseLikes(toyCard)
    } else if (e.target.className === 'delete-btn') {
      const toy = e.target.parentElement
      deleteToy(toy.dataset.id)
    } 
  })
}


const submitHandler = () => {
  FORM_CONTAINER.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const image = e.target.image.value
    const likes = 0

    const newToyObj = {
                        name, 
                        image,
                        likes
                      }
    postNewToy(newToyObj)
  })
}

postNewToy = toyObj => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(date => date.json())
  .then(newToy => renderToy(newToy))
}

patchLikes = (id, likesObj) => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(likesObj)
  })
  .then(data => data.json())
  .then(toyObj => {
    console.log(toyObj)
    renderNewLikes(toyObj)
  })
}

const renderNewLikes = toy => {
  const id = toy.id
  const card = document.querySelector(`[data-id='${id}']`)
  card.querySelector('p').innerText = `${toy.likes} Likes`
}

const deleteToy = id => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE',
  })
  .then(resp => removeToy(id))
}

const removeToy = id => {
  const card = document.querySelector(`[data-id='${id}']`)
  card.remove()
}


// Create Your Server
// All of the toy data is stored in the db.json file. most important stuff
// You'll want to access this data using a JSON server. 
// In order to do this, run the following two commands:

// npm install -g json-server
// json-server --watch db.json
// This will create a server storing all of our lost toy data with restful routes at http://localhost:3000/toys. You can also check out http://localhost:3000/toys/:id


// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."

// When the page loads, 
//how do we make sure the page has loaded? 
// DOMContentLoaded

// make a 'GET' request to fetch all the toy objects. 
    //fetch and then send to render

// With the response data, make a <div class="card"> 
// for each toy and add it to the toy-collection div.
//use a forEach
//append or prepend


// Add Toy Info to the Card
// Each card should have the following child elements:

// h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn"
// After all of that, the toy card should resemble:


//create elements: div, h2, img, p, button
//innerHTML