import time
from rpi_ws281x import *
import argparse
import random
from itertools import cycle
import math
from pymongo import MongoClient
import os
from dotenv import load_dotenv, find_dotenv

LED_COUNT       = 255
LED_PIN         = 18
LED_FREQ_HZ     = 800000
LED_DMA         = 10
LED_BRIGHTNESS  = 120
LED_INVERT      = False
LED_CHANNEL     = 0

def clear(strip):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 0, 0))
    strip.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('scheme', help='Which color scheme to apply')
    args = parser.parse_args()

    load_dotenv(find_dotenv())
    MONGO_DB = os.environ.get("MONGO_DB")
    client = MongoClient(MONGO_DB)
    db = client["disney_infinity"]
    collection = db["light_programs"]
    record = collection.find_one({"scheme": args.scheme})

    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()

    if record:
        try:
            while True:
                exec(record["code"])

        except KeyboardInterrupt:
            clear(strip)
