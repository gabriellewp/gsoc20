# GSOC 2020, SWAN's exercises

**1st Exercise: Python program for reading and writing data**

There are 2 options available:
- **Increase the Data Rate Limit**
   * This can be done by adding c.NotebookApp.iopub_data_rate_limit = <upper_limit> in jupyter_notebook_config.py, e.g c.NotebookApp.iopub_data_rate_limit = 1e10. 
   * Locate jupyter_notebook_config.py to .jupyter directory
- **Write binaries to n files, this option requires 4 user inputs:**
    * directory path to store the files
    * substring of file name (minimum 5 characters), e.g output_try
    * x file size in bytes
    * n number of files
    ```shell
    Writing n random files, please input the directory, file name, total files and file size
    Enter the path of your directory:/home/gabrielle/Documents/GSOC20
    Enter the file name:output_try
    Enter the file size:1048576
    Enter the number of files:10
    /home/gabrielle/Documents/GSOC20/output_try1
    /home/gabrielle/Documents/GSOC20/output_try2
    /home/gabrielle/Documents/GSOC20/output_try3
    /home/gabrielle/Documents/GSOC20/output_try4
    /home/gabrielle/Documents/GSOC20/output_try5
    /home/gabrielle/Documents/GSOC20/output_try6
    /home/gabrielle/Documents/GSOC20/output_try7
    /home/gabrielle/Documents/GSOC20/output_try8
    /home/gabrielle/Documents/GSOC20/output_try9
    /home/gabrielle/Documents/GSOC20/output_try10
    10  random files were created with size  1048576  each
    ```
- **Read files, this option requires 2 user inputs:**
  * directory path of the stored files
  * substring of file name
  ```shell
  Reading file, please input the file directory and substring of file name
  Enter the path of your directory:/home/gabrielle/Documents/GSOC20
  Enter the file name:output_try
  10 file/s found with name  output_try
  output_try1   d80c9606fe24831acc20b2321c535461
  output_try10   c9d5ee50376333ac49a496f265d027a1
  output_try8   df0a7d16ce7214b8b5880af854c572ad
  output_try3   6a9f417067f14c2308a1851e485b21f4
  output_try2   5e6c030ea39f9ab588aacb9cd55d04dc
  output_try6   43e896df68d3c502da874f4f34c07f12
  output_try9   2c4999034b7dd7842dbfefd33d627735
  output_try4   436dc0546564397abf32a3ad09e4c5de
  output_try7   917825179b0a53308a1aa981ea45b586
  output_try5   cab80e17d2a924b568144476fbf8a985
  ```
**2nd Exercise: Jupyterlab Extension for Weather API**
 - **Dependencies:**
   * @jupyterlab/apputils v.2.0.2
   * @jupyterlab/application v.2.0.2
   * @lumino/widgets v.1.11.1
   * dotenv v.8.2.0
 - **Installation:**
   * the module has been pushed to npm.org, in order to install: jupyter labextension install @gpoerw/jupyterlab-weatherapi

 ![screenshot.png](figures/extension_screenshot.png "screenshot.png")

**3rd Exercise: Kernel Extension for Weather API**
  * To use the kernel extension, copy the weatherapi_kernel_ext.py into .ipyton directory
  * To load the extension use %load_ext weatherapi_kernel_ext
   ![screenshot_kernel.png](figures/extension_kernel.png "screenshot_kernel.png")
  * the json_response variable should look like this
    ```shell
    {"current": {"cloudcover": 25, "feelslike": 1, "humidity": 41, "is_day": "yes", "observation_time": "04:31 PM", "precip": 0, "pressure": 1024, "temperature": 5, "uv_index": 4, "visibility": 10, "weather_code": 116, "weather_descriptions": ["Partly cloudy"], "weather_icons": ["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"], "wind_degree": 10, "wind_dir": "N", "wind_speed": 19}, "location": {"country": "Germany", "lat": "48.150", "localtime": "2020-03-31 18:31", "localtime_epoch": 1585679460, "lon": "11.583", "name": "Munich", "region": "Bayern", "timezone_id": "Europe/Berlin", "utc_offset": "2.0"}, "request": {"language": "en", "query": "Munich, Germany", "type": "City", "unit": "m"}}
    ```

