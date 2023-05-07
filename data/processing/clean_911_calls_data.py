import datetime
import pandas as pd

dateparse = lambda x: datetime.datetime.strptime(x,'%Y-%m-%d %H:%M:%S')

calls_data = pd.read_csv(
    filepath_or_buffer = "./data/data_files/archive.zip",
    header = 0,
    names = ['lat', 'lng', 'desc', 'zip', 'title', 'timeStamp', 'twp', 'addr', 'e'],
    dtype = {
        'lat':str,'lng':str,'desc':str, 'zip':str,
        'title':str, 'timeStamp':str, 'twp':str, 'addr':str, 'e':int
        }, 
    parse_dates = ['timeStamp'],
    date_parser = dateparse)

calls_data.timeStamp = pd.DatetimeIndex(calls_data.timeStamp)
# Drop duplicates in the description column
clean_calls_data = calls_data.drop_duplicates("desc")

# Drop the NA's
clean_calls_data = clean_calls_data.dropna()

# Create a new group column for each main category (EMS / Traffic / Fire) of the title column 
clean_calls_data['group'] = clean_calls_data['title'].apply(lambda x: x.split(':')[0])

# Create a year column for time series plots
clean_calls_data["year"] = clean_calls_data['timeStamp'].dt.year

clean_calls_data.head()
clean_calls_data['zip_initial'] = clean_calls_data['zip'].str[:2]

clean_calls_data['zip_initial'] = pd.to_numeric(clean_calls_data['zip_initial'])

clean_calls_data = clean_calls_data.query('zip_initial >= 18')
clean_calls_data = clean_calls_data[(clean_calls_data.timeStamp >= "2016-01-01 00:00:00")]
clean_calls_data = clean_calls_data[(clean_calls_data.timeStamp <= "2020-06-28 00:00:00")]

#creation of a clean dataset with all the content
#clean_calls_data.to_csv("./data/data_files/clean_calls.csv")

#creation of a clean dataset for temperature analysis 
clean_calls_for_temp_analysis = clean_calls_data[['timeStamp',"title"]]
#clean_calls_for_temp_analysis.to_csv("./data/data_files/clean_calls_for_temp_analysis.csv")