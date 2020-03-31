ipykernel_imported = True
try:
    from ipykernel import zmqshell
except ImportError:
    ipykernel_imported = False
from IPython.core.magic import register_line_magic
import requests
import json
import os, logging
import sys

def skip(line, cell=None):
    '''Skips execution of the current line/cell.'''
    pass

def load_ipython_extension(shell):
    log = logging.getLogger('weatherapi')
    log.name = 'weatherapi'
    log.setLevel(logging.INFO)
    handler = logging.StreamHandler(sys.stderr)
    formatter = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    log.handlers = [handler]

    log.info("lolll")
    log.info("ipkernel _imported"+str(ipykernel_imported))
    if ipykernel_imported:
        if not isinstance(shell, zmqshell.ZMQInteractiveShell):
            log.error("WeatherAPI: Ipython not running through notebook. So exiting")
            return

    log.info("Starting weather api extension")
    fetcher = Weatherapiconnector(shell, log)
    fetcher.register_comm()

def unload_ipython_extension(shell):
    '''Unregisters the skip magic when the extension unloads.'''
    pass

class Weatherapiconnector:
    def __init__(self, ipython, log):
        self.ipython = ipython
        self.log = log
        self.connected = False


    def register_comm(self):
        self.ipython.kernel.comm_manager.register_target(
            "Weatherapiconnector", self.target_func
        )
    def target_func(self, comm, msg):
        self.log.info("Established connection to frontend")
        self.log.debug("Received message:%s", str(msg))
        self.comm = comm

        @self.comm.on_msg
        def _recv(msg):
            self.handle_comm_message(msg)

    def handle_comm_message(self,msg):
        #handle message from frontend
        content = msg['city_name']
        if content!="":
            parameters ={
                "access_key":"29d1520f101b647b4aed9134c62899c1",
                "query":content
            }
            response = requests.get("http://api.weatherstack.com/current", params= parameters)
            print(response.json)
            self.send(
                {
                    response.json
                }
            )
    def send(self, msg):
        """Send a message to the frontend"""
        self.comm.send(msg)






