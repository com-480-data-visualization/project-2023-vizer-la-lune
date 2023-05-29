from urllib.request import urlopen
import json

with urlopen('https://raw.githubusercontent.com/OpenDataDE/State-zip-code-GeoJSON/master/pa_pennsylvania_zip_codes_geo.min.json') as response:
    zipcodes = json.load(response)
