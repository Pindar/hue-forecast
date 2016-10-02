# HUE forecast

Sets your hue to a light color that indicates the weather forecast for a given location and time frame.

## Environment variables

| Variable           | Notes                                                              |
|--------------------|--------------------------------------------------------------------|
| HUE_SCHEDULE_ID    | Schedule ID which should be triggered                              |
| HUE_HOST           | IP address of your HUE bridge                                      |
| HUE_USER           | Your hue-bridge user name                                          |
| FORECAST_API_KEY   | You can get one for free at https://darksky.net/dev/               |
| FORECAST_LATITUDE  | latitude of the location you'd like to check the weather for       |
| FORECAST_LONGITUDE | longitude of the location you'd like to check the weather for      |
| WAKE_UP_TIME       | your wake up time](http://www.developers.meethue.com/documentation/datatypes-and-time-patterns#16_time_patterns) |
| LIGHT_NUMBER       | Light Number you'd like to control                                 |
| START_TIME         | Time frame starts at defined hour, e.g., 6 for 6am                 |
| END_TIME           | Time frame ends at defined in hour, e.g., 19 for 7pm               |

## Development

Run on your computer with `export $(cat .env | xargs) && npm start` in case you have all environment variables defined in a .env file.

## Installation

### Prerequisites

1. node >=4
1. GIT

How to install node >=4 on a Raspberry pi:

1. `wget http://nodejs.org/dist/v4.3.1/node-v4.3.1-linux-armv7l.tar.gz`
1. `tar -xvf node-v4.3.1-linux-armv7l.tar.gz`
1. `sudo cp -R * /usr/local/`

### Step by Step

1. `cd /home/pi`
1. `git clone https://github.com/Pindar/hue-forecast.git`
1. `cd hue-forecast`
1. `npm install`
1. create your environment file `/home/pi/hue-forecast/.env`
1. run `node src/hue-prepare.js` once to get values for `HUE_SCHEDULE_RAIN` and `HUE_SCHEDULE_GOOD` (in case you don't have schedules already who'd like to use), update your `.env` file accordingly
1. `sudo cp systemd/* /lib/systemd/system/`
1. `sudo systemctl daemon-reload`
1. `sudo systemctl enable hue-forecast.timer`

In case you decide for a different target folder please update the path in the systemd-service file.
