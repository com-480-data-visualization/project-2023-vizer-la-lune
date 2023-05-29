import datetime
import pandas as pd
call_date_parse = lambda x: datetime.datetime.strptime(x,'%Y-%m-%d %H:%M:%S')

def getCallTypeFromTitle(title):
    return title.split(":")[0]

def getCallDayFromDate(date):
    day = date.day
    month = date.month
    year = date.year
    return datetime.datetime(year, month, day)

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
    only_needed_columns = calls_data.loc[:,['timeStamp',"title"]]
    only_needed_columns["title"] = only_needed_columns["title"].apply(getCallTypeFromTitle)
    only_needed_columns["timeStamp"] = only_needed_columns["timeStamp"].apply(getCallDayFromDate)
    return only_needed_columns

def computeNumberOfCallPerEachTypeEachDay(data):
    return data.groupby(['title', 'timeStamp']).size().to_frame('calls_count') 


data = getCallsData()
callsPerTypePerDate = computeNumberOfCallPerEachTypeEachDay(data)
callsPerTypePerDate.to_csv("./data/data_files/clean_data/data_for_introduction/calls_per_type_per_date.csv")
