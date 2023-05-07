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

def getCallDataWithTemperature():
    calls_data = pd.read_csv(
        filepath_or_buffer = "./data/data_files/clean_calls_for_temp_analysis.csv",
        header = 0,
        names = ["timeStamp", "title"],
        dtype = {'title':str, 'timeStamp':str}, 
        parse_dates = ['timeStamp'],
        date_parser = call_date_parse
        )

    calls_data["timeStamp"] = calls_data["timeStamp"].apply(approximateHour)

    temperature_data = pd.read_csv(
        filepath_or_buffer = "./data/data_files/temperatures.csv",
        delimiter=";",
        header = 0,
        names = ["date","hour","temperature","condition"],
        dtype = {"date":str, "hour":str,"temperature":int, "condition":str}, 
        parse_dates = ['date'],
        date_parser = temperature_date_parse
        )

    temperature_data["timeStamp"] = temperature_data["date"] + temperature_data["hour"].apply(lambda x: datetime.timedelta(hours = int(x)))
    temperature_data = temperature_data.drop(["date", "hour"], axis=1)

    calls_data_with_temperature = calls_data.merge(temperature_data,on=["timeStamp", "timeStamp"],how="left")
    return calls_data_with_temperature

def fillUnknownTemperatureAndConditionWithClosestKnown(df):
    #This is made possible because the calls are ordered in time
    df["temperature"] = df["temperature"].interpolate(method='nearest')
    df["condition"] = df["condition"].interpolate(method='nearest')
    return df


def getStatsPerTemperatureAndPerTitle(df):
    return df.groupby(["temperature","title"]).size()

data_with_temperature = getCallDataWithTemperature()
data_with_temperature_clean = fillUnknownTemperatureAndConditionWithClosestKnown(data_with_temperature)

stats_df = getStatsPerTemperatureAndPerTitle(data_with_temperature_clean)
stats_df.to_csv("./data/data_files/calls_per_title_per_temperature.csv")
