window.addEventListener('load', () => {
  let long
  let lat

  const tempDesc = document.querySelector('.temperature-description')
  const tempUnit = document.querySelector('.temperature-unit')
  const timezone = document.querySelector('.location-timezone')
  const tempSect = document.querySelector('.temperature-section')
  const tempSpan = document.querySelector('.temperature-section span')

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      // API_KEY = 3b828ee9d4b2de6a3bfa8d8591980bed
      // API_URL = https://api.darksky.net/forecast/3b828ee9d4b2de6a3bfa8d8591980bed/37.8267,-122.4233

      const cors = 'https://cors-anywhere.herokuapp.com/'
      const api_key = '3b828ee9d4b2de6a3bfa8d8591980bed'
      const api = `${cors}https://api.darksky.net/forecast/${api_key}/${lat},${long}`

      async function getWeather(){
        const response = await fetch(api)
        const data = await response.json()

        const { temperature, summary, icon} = data.currently
        // Set DOM elements from the API
        tempUnit.textContent = temperature
        tempDesc.textContent = summary
        timezone.textContent = data.timezone


        //Celsius
        const celsius = (temperature - 32) * (5 / 9)
        //Set icon
        setIcons(icon, document.querySelector('.icons'))


        //Set Temperature Units
        tempSect.addEventListener('click', ()=> {
          if(tempSpan.textContent === "F"){
            tempSpan.textContent = "C"
            tempUnit.textContent = Math.floor(celsius)

          }else {
            tempSpan.textContent = "F"
            tempUnit.textContent = temperature
          }
        })
        
      }
  
      getWeather()
    })

    
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "black"})
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
  }
  
})