import datetime
import pandas as pd
call_date_parse = lambda x: datetime.datetime.strptime(x,'%Y-%m-%d %H:%M:%S')

def approximateHour(date):
    minute = date.minute
    hour = date.hour
    day = date.day
    month = date.month
    year = date.year
    if minute > 30:
        return datetime.datetime(year, month, day, hour,0,0) + datetime.timedelta(hours=1)
    return datetime.datetime(year, month, day, hour,0,0)


def getCallsData():
    calls_data = pd.read_csv(
        filepath_or_buffer = "./data/data_files/clean_data/clean_calls.zip",
        header = 0,
        names = ["lat","lng","desc","zip","title","timeStamp","twp","addr","e","group","year","zip_initial"],
        dtype = {
        'lat':str,'lng':str,'desc':str, 'zip':str,
        'title':str, 'timeStamp':str, 'twp':str, 'addr':str, 'e':int,
        'group':str,"year":int,'zip_initial':int
        }, 
        parse_dates = ['timeStamp'],
        date_parser = call_date_parse
        )
    only_needed_columns = calls_data.loc[:,['zip',"e","twp","group","year","timeStamp"]]
    only_needed_columns["timeStamp"] = only_needed_columns["timeStamp"].apply(approximateHour)
    return only_needed_columns


def getMapData():
    calls_data = getCallsData()
    calls_data["month"] = calls_data["timeStamp"].apply(lambda x: x.month)
    return calls_data

calls_data = getMapData()