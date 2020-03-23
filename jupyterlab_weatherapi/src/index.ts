import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { 
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';
import WeatherWidget  from "./weather_widget"

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_weatherapi',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_weatherapi is activated!');
    console.log('ICommandPalette:', palette);

    const content = new WeatherWidget();
    const widget = new MainAreaWidget({content});
    widget.id = 'weatherapi-jupyterlab'
    widget.title.label = 'Search'
    widget.title.closable = true;
    


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
