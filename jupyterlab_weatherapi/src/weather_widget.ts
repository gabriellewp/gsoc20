import {
    Widget
  } from '@lumino/widgets';
import axios from 'axios';
import "./lib/env"

class WeatherWidget extends Widget {
    constructor(){
        super();
        
        //manually create a city list
        let cities = ['Moscow', 'London', 'Berlin', 'Madrid', 'Kiev', 'Rome', 'Paris', 'Hamburg', 'Vienna', 'Budapest', 'Munich', 'Barcelona', 'Zurich', 'Prague']
        
        //page content
        let title = document.createElement('h3')
        title.innerText = "Welcome to Weather API"

        let loc_summary = document.createElement("p")
        loc_summary.innerText=""
        loc_summary.id = "loc_summary"

        let summary = document.createElement("p")
        summary.innerText=""
        summary.id="summary"

        let form_div = document.createElement('form')

        let input_user = document.createElement("input")
        input_user.id="userInput"
        input_user.placeholder="Select city"
        input_user.setAttribute("list", "datalist")
        input_user.onchange = this.onChange.bind(this)

        let datalist = document.createElement('datalist')
        datalist.id = "datalist"
        let iterator = cities.values()
        for (let city of iterator){
            let opt = document.createElement('option')
            opt.value = city
            opt.text= city
            datalist.appendChild(opt);
        }

        form_div.appendChild(input_user)
        form_div.appendChild(datalist)

        let weather_icon = document.createElement("img")
        weather_icon.id="weather_icon"

        let summary_table = document.createElement("table")
        summary_table.id="summary_table"
        summary_table.className="center"
        let row = summary_table.insertRow(0)
        let cellleft = row.insertCell(0)
        let cellright = row.insertCell(1)
        cellleft.appendChild(weather_icon)
        cellright.appendChild(loc_summary)
        cellright.appendChild(summary)

        this.node.appendChild(title)
        this.node.appendChild(form_div)
        this.node.appendChild(summary_table)


    }
    APIcall(query:string){
        const Url = 'http://api.weatherstack.com/current'
        //const url_mock = "http://www.mocky.io/v2/5e7665df2f0000e757986064"
        const params={
           access_key:"29d1520f101b647b4aed9134c62899c1",
           query:query
         }
      
        let loc_summary2 = document.getElementById("loc_summary")
        let summary2 = document.getElementById("summary")
        let weather_icon2 = document.getElementById("weather_icon") as HTMLImageElement
        axios.get(Url, {params})
        .then(function (response) {
          console.log(response)
      
          loc_summary2.innerHTML = response.data.location.localtime+"<br />"+
                              "City: "+response.data.location.name+", Country:"+response.data.location.country
          summary2.innerHTML= "Cloudcover: "+response.data.current.cloudcover+"<br />"+
                              "Feels like: "+response.data.current.feelslike+"<br />"+
                              "Humidity: "+response.data.current.humidity+"<br />"+
                              "Temperature: "+response.data.current.temperature+"<br />"+
                              "Visibility: "+response.data.current.visibility+"<br />"+
                              "Wind speed:"+response.data.current.wind_speed+"<br />"
          weather_icon2.src = response.data.current.weather_icons[0]
      
        })
        .catch(function (error) {
          loc_summary2.innerHTML="City: "+query
          summary2.innerHTML=error
        })
        loc_summary2.innerHTML="City: "+query
        summary2.innerHTML="Loading ..."
      }
      onChange(){
        let val = document.getElementById('userInput') as HTMLInputElement;
        let opts = document.getElementById('datalist') as HTMLDataListElement;
        let opts2 = opts.options
        for (let i = 0; i < opts2.length; i++){
            if(opts2[i].value === val.value){
            let query = val.value
            this.APIcall(query)
            }
        }
    }
      
}

export default WeatherWidget;