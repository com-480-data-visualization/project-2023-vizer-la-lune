from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import datetime
import csv
import time

#Introduction necessaire au module selenium
option = webdriver.ChromeOptions()
option.add_argument("--incognito")
option.add_argument("--start-maximised") #"kiosk" sur mac
option.add_argument("--headless=new")
option.add_experimental_option('excludeSwitches', ['enable-logging'])
browser = webdriver.Chrome(options=option)


date = datetime.datetime(2015, 1, 1)

def fahrenheitToDegree(fahrenheitTemperature):
    return int((fahrenheitTemperature - 32)*5/9)

def enHourToFrenchHour(hour, amPm):
    if int(hour) == 12 and amPm =="AM":
        return 0
    if int(hour) == 12 and amPm == "PM":
        return 12
    if amPm == "AM":
        return int(hour) % 12 #Sometimes we have 12:52 am for 0:52
    return (int(hour) + 12 ) % 24


with open('temperatures.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=';')
    writer.writerow(["date","hour","temperature(Celsius degree)","condition"])
    for i in range(365*5+1):
        if(i % 10 == 0):
            print("Already " + str(i) + " done, continuing ...")
        url = 'https://www.wunderground.com/history/daily/us/md/rockville/KMDROCKV276/date/' + date.strftime("%Y-%m-%d")
        browser.get(url)
        time.sleep(1)
        try:
            div = browser.find_element(By.CLASS_NAME, "observation-table")
        except (NoSuchElementException):
            time.sleep(3)
            div = browser.find_element(By.CLASS_NAME, "observation-table")
        table = div.find_element(By.TAG_NAME, "table")
        tableBody = table.find_element(By.TAG_NAME, "tbody")
        lines = tableBody.find_elements(By.TAG_NAME, "tr")
        temperaturesPerHour = {}
        conditionPerHour = {}
        for i in range(len(lines)):
            if i != 0:
                columns = lines[i].find_elements(By.TAG_NAME, "td")
                hourEn = columns[0].find_element(By.CLASS_NAME, "ng-star-inserted").text.split(':')
                fahrenheitTemp = columns[1].find_element(By.CLASS_NAME, "ng-star-inserted").find_element(By.TAG_NAME, "span").find_element(By.TAG_NAME, "span").get_attribute("innerHTML")
                condition = columns[9].find_element(By.CLASS_NAME, "ng-star-inserted").text
                hourFr = enHourToFrenchHour(hourEn[0], hourEn[1][-2:])
                degreeTemperature = fahrenheitToDegree(int(fahrenheitTemp))
                temperaturesPerHour[hourFr] = degreeTemperature #If we have several data for the same hour, we just keep the oldest
                conditionPerHour[hourFr] = condition
        for hour in temperaturesPerHour:
            writer.writerow([date.strftime("%Y-%m-%d"),hour,temperaturesPerHour[hour], conditionPerHour[hour]])
        date = date + datetime.timedelta(1)

browser.close()

