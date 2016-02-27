# HUE forecast

Sets your hue to a light color that indicates the weather forecast for a given location.

## Environment variables

| Variable           | Notes                                                              |
|--------------------|--------------------------------------------------------------------|
| HUE_SCHEDULE_RAIN  | Schedule ID which should be triggered on a rainy day               |
| HUE_SCHEDULE_GOOD  | Schedule ID which should be triggered on a good day                |
| HUE_HOST           | IP address of your HUE bridge                                      |
| HUE_USER           | Your hue-bridge user name                                          |
| FORECAST_API_KEY   | You can get one for free at https://developer.forecast.io/register |
| FORECAST_LATITUDE  | latitude of the location you'd like to check the weather for       |
| FORECAST_LONGITUDE | longitude of the location you'd like to check the weather for      |


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
