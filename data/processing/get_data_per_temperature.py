import datetime
import pandas as pd
call_date_parse = lambda x: datetime.datetime.strptime(x,'%Y-%m-%d %H:%M:%S')
temperature_date_parse = lambda x: datetime.datetime.strptime(x,'%d/%m/%Y')

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
    only_needed_columns = calls_data.loc[:,['timeStamp',"title"]]
    only_needed_columns["timeStamp"] = only_needed_columns["timeStamp"].apply(approximateHour)
    return only_needed_columns

def getTemperatureData():
    temperature_data = pd.read_csv(
        filepath_or_buffer = "./data/data_files/raw_data/temperatures.csv",
        delimiter=";",
        header = 0,
        names = ["date","hour","temperature","condition"],
        dtype = {"date":str, "hour":str,"temperature":int, "condition":str}, 
        parse_dates = ['date'],
        date_parser = temperature_date_parse
        )

    temperature_data["timeStamp"] = temperature_data["date"] + temperature_data["hour"].apply(lambda x: datetime.timedelta(hours = int(x)))
    only_needed_data = temperature_data.drop(["date", "hour"], axis=1)
    return only_needed_data

def mergeCallDataWithTemperature():
    calls_data = getCallsData()
    temperature_data = getTemperatureData()

    calls_data_with_temperature = calls_data.merge(temperature_data,on=["timeStamp", "timeStamp"],how="left")
    return calls_data_with_temperature

def fillUnknownTemperatureAndConditionWithClosestKnown(df):
    #This is made possible because the calls are ordered in time
    df["temperature"] = df["temperature"].interpolate(method='nearest')
    df["condition"] = df["condition"].interpolate(method='nearest')
    return df


def getNumberOfCallPerTemperatureAndPerTitle(df):
    return df.groupby(["temperature","title"]).size().to_frame('calls_count')
     
data_with_temperature = mergeCallDataWithTemperature()
data_with_temperature_full = fillUnknownTemperatureAndConditionWithClosestKnown(data_with_temperature)

stats_df = getNumberOfCallPerTemperatureAndPerTitle(data_with_temperature_full)
stats_df.to_csv("./data/data_files/clean_data/data_per_temperature/calls_per_title_per_temperature.csv")
