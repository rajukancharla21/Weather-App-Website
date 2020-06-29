
console.log("Client side Java Script")

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageP1=document.querySelector('#message-1')
const messageP2=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(event)=>{
    messageP1.textContent='Loading..'
    messageP2.textContent=''
    event.preventDefault()
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
                messageP1.textContent=data.error
        }else{
            messageP1.textContent =data.address
            messageP2.textContent=data.forecast
        }
    })
})

})