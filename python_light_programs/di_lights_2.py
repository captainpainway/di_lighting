from rpi_ws281x import *
import argparse
import os
import psycopg2
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

def get_connection():
    load_dotenv(find_dotenv())
    try:
        POSTGRES_USER = os.environ.get("POSTGRES_USER")
        POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
        return psycopg2.connect(
            database="disney_infinity",
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            host="127.0.0.1",
            port="5432"
        )
    except:
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('scheme', help='Which color scheme to apply')
    args = parser.parse_args()

    conn = get_connection()
    collection = conn.cursor()
    collection.execute("SELECT * FROM light_programs WHERE scheme = %s", args.scheme)
    record = collection.fetchone()

    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()

    if record:
        try:
            while True:
                exec(record[1])

        except KeyboardInterrupt:
            clear(strip)
