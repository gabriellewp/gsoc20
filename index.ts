import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { 
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';
import {
  Widget
} from '@lumino/widgets';
import axios from 'axios';

function APIcall(query:string){
  //const Url = 'http://api.weatherstack.com/current'
  const url_mock = "http://www.mocky.io/v2/5e7665df2f0000e757986064"
  // const params={
  //    access_key:"29d1520f101b647b4aed9134c62899c1",
  //    query:query
  //  }
  axios.get(url_mock)
  .then(function (response) {
    console.log(response)
    let loc_summary2 = document.getElementById("loc_summary")
    let summary2 = document.getElementById("summary")
    loc_summary2.innerHTML = "Time: "+response.data.location.localtime+"<br />"+
                        ", City: "+response.data.location.name+", Country:"+response.data.location.country
    summary2.innerHTML= "Cloudcover: "+response.data.current.cloudcover+"<br />"+
                        "Feels like: "+response.data.current.feelslike+"<br />"+
                        "Humidity: "+response.data.current.humidity+"<br />"+
                        "Temperature: "+response.data.current.temperature+"<br />"+
                        "Visibility: "+response.data.current.visibility+"<br />"+
                        "Wind speed:"+response.data.current.wind_speed+"<br />"
  })
  .catch(function (error) {
    //loc_summary2.innerHTML="City: "+query
    console.log(error)
    //summary2.innerHTML=error
  })
  //loc_summary2.innerHTML="City: "+query
  //summary2.innerHTML="Data not found"
}

function onChange(){
  let val = document.getElementById('userInput') as HTMLInputElement;
  let opts = document.getElementById('datalist') as HTMLDataListElement;
  let opts2 = opts.options
  for (let i = 0; i < opts2.length; i++){
    if(opts2[i].value === val.value){
      let query = val.value
      APIcall(query)
    }
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_weatherapi',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_weatherapi is activated!');
    console.log('ICommandPalette:', palette);

    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'weatherapi-jupyterlab'
    widget.title.label = 'Search5'
    widget.title.closable = true;
    
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
    input_user.onchange = onChange

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

    content.node.appendChild(title)
    content.node.appendChild(form_div)
    content.node.appendChild(loc_summary)
    content.node.appendChild(summary)
    //application command
    const command: string ='basic:open';
    app.commands.addCommand(command, {
      label: 'WeatherAPI',
      execute: () => {
        if (!widget.isAttached){
          app.shell.add(widget, 'main')
        }

        app.shell.activateById(widget.id)
      }
    });
    palette.addItem({command, category:'API'})
  }
};

export default extension;

