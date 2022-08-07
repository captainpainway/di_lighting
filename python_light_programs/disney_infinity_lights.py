import time
from rpi_ws281x import *
import argparse
import random
from itertools import cycle
import math

LED_COUNT       = 255
LED_PIN         = 18
LED_FREQ_HZ     = 800000
LED_DMA         = 10
LED_BRIGHTNESS  = 120
LED_INVERT      = False
LED_CHANNEL     = 0

def shuffle(lst):
    for i in range(len(lst) - 1, 0, -1):
        j = random.randint(0, i + 1)
        lst[i], lst[j] = lst[j], lst[i]
    return lst

def normalize(num, lower, upper):
    return lower + (upper - lower) * num

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)

def sully(strip, wait_ms = 100, iterations = 10):
    color = 'teal';
    for it in range(iterations):
        for i in range(strip.numPixels()):
            #if (i + it) % 21 == 0:
                #if color == 'teal':
                    #color = 'purple'
                #else:
                    #color = 'teal'
            #if color == 'teal':
            if (i - it) % 10 == 0:
                strip.setPixelColor(i, Color(0, 150, 130))
            else:
                strip.setPixelColor(i, Color(50, 0, 50))
        strip.show()
        time.sleep(wait_ms/1000.0)

def sorcerer_mickey(strip, wait_ms = 10):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 0, 50))
    strip.show()
    pixel_shuffle = shuffle(list(range(0, strip.numPixels() - 1)))
    pixel_cycle = cycle(pixel_shuffle)

    while True:
        this_pixel = next(pixel_cycle)
        strip.setPixelColor(this_pixel, Color(255, 255, 255))
        strip.show();
        time.sleep(wait_ms/1000.0)
        strip.setPixelColor(this_pixel, Color(0, 0, 50))
        strip.show();

def iron_man(strip, wait_ms = 50):
    color = 'red'
    for i in range(strip.numPixels()):
        if i % 10 == 0:
            if color == 'red':
                color = 'yellow'
            else:
                color = 'red'
        if color == 'red':
            strip.setPixelColor(i, Color(255, 0, 0))
        else:
            strip.setPixelColor(i, Color(250, 200, 0))
        strip.show()
    #time.sleep(wait_ms/1000.0)

def elsa(strip, wait_ms = 120):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(50, 50, 200))
    strip.show()

    pixel_shuffle = shuffle(list(range(0, strip.numPixels())))
    pixel_cycle = cycle(pixel_shuffle)

    while True:
        this_pixel = next(pixel_cycle)
        strip.setPixelColor(this_pixel, Color(255, 255, 255))
        strip.show()
        time.sleep(wait_ms/1000.0)
        strip.setPixelColor(this_pixel, Color(50, 50, 200))
        strip.show()

def tinkerbell(strip, wait_ms = 10):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(50, 255, 50))
        strip.show()
#         if i - 1 > 0:
#             strip.setPixelColor(i - 1, Color(20, 200, 50))
#             strip.show()
#         if i - 2 > 0:
#             strip.setPixelColor(i - 2, Color(0, 50, 10))
#             strip.show()
#         if i - 3 > 0:
#             strip.setPixelColor(i - 3, Color(0, 20, 5))
#             strip.show()
#        time.sleep(wait_ms/500.0)
        clear(strip)
    for i in range(strip.numPixels(), 0, -1):
        strip.setPixelColor(i, Color(50, 255, 50))
        strip.show()
#         if i + 1 < strip.numPixels():
#             strip.setPixelColor(i + 1, Color(20, 200, 50))
#             strip.show()
#         if i + 2 > strip.numPixels():
#             strip.setPixelColor(i + 2, Color(0, 50, 10))
#             strip.show()
#         if i + 3 > strip.numPixels():
#             strip.setPixelColor(i + 3, Color(0, 20, 5))
#             strip.show()
#        time.sleep(wait_ms/500.0)
        clear(strip)

def mulan(strip, wait_ms = 50):
    pixel_shuffle = shuffle(list(range(0, strip.numPixels())))
    for i in pixel_shuffle:
        strip.setPixelColor(i, Color(255, 0, 0))
        strip.show()
        time.sleep(wait_ms/1000.0)
        strip.setPixelColor(i, Color(0, 0, 0))
        strip.show()

def yoda(strip, wait_ms = 50):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 255, 0))
        strip.show()
    for i in range(strip.numPixels(), 0, -1):
        strip.setPixelColor(i, Color(0, 0, 0))
        strip.show()

def merida(strip, wait_ms = 50):
    color = 'blue'
    for i in range(strip.numPixels()):
        if i % 10 == 0:
            if color == 'blue':
                color = 'green'
            else:
                color = 'blue'
        if color == 'blue':
            strip.setPixelColor(i, Color(0, 50, 255))
        if color == 'green':
            strip.setPixelColor(i, Color(0, 255, 50))
        strip.show()

def vanellope(strip, wait_ms = 50):
    colors = ['orange', 'yellow', 'green', 'blue', 'purple']
    color = 'red'
    for i in range(strip.numPixels()):
        if i % 5 == 0:
            colors.append(color)
            color = colors[0]
            colors = colors[1:]
        if color == 'blue':
            strip.setPixelColor(i, Color(0, 0, 255))
        if color == 'green':
            strip.setPixelColor(i, Color(0, 255, 0))
        if color == 'red':
            strip.setPixelColor(i, Color(255, 0, 0))
        if color == 'orange':
            strip.setPixelColor(i, Color(200, 50, 0))
        if color == 'yellow':
            strip.setPixelColor(i, Color(200, 100, 0))
        if color == 'purple':
            strip.setPixelColor(i, Color(100, 0, 200))
    strip.show()

def leia(strip, wait_ms = 120):
    for i in range(strip.numPixels()):
        if (i % 2 == 0):
            strip.setPixelColor(i, Color(255, 60, 70))
        #    strip.setPixelColor(i + 1, Color(220, 140, 80))
    strip.show()

def baymax(strip):
    full = strip.numPixels()
    half = int(math.floor(full / 2))
    for i in range(0, half):
        strip.setPixelColor(i, Color(255 - i, 0, i))
    for j in range(half, full):
        strip.setPixelColor(j, Color((255 - half) + (j - half), 0, 255 - j))
    strip.show()

def jack_skellington(strip):
    color = 'orange'
    for i in range(strip.numPixels()):
        if i % 21 == 0:
            if color == 'orange':
                color = 'purple'
            else:
                color = 'orange'
        if color == 'orange':
            strip.setPixelColor(i, Color(255, 30, 0))
        if color == 'purple':
            strip.setPixelColor(i, Color(30, 0, 30))
        strip.show()

def mike(strip):
    full = strip.numPixels()
    half = int(math.floor(full / 2))
    for i in range(0, half):
        strip.setPixelColor(i, Color(0, 255 - i, i))
    for j in range(half, full):
        strip.setPixelColor(j, Color(0, (255 - half) + (j - half), 255 - j))
    strip.show()

def hulk(strip):
    full = strip.numPixels()
    half = int(math.floor(full / 2))
    for i in range(strip.numPixels()):
        if i < 60 or i > 192:
            strip.setPixelColor(i, Color(50, 0, 100))
        else:
            strip.setPixelColor(i, Color(0, 255, 0))
    strip.show()

def stitch(strip, wait_ms = 30, iterations = 200):
    for i in range(iterations):
        for j in range(strip.numPixels()):
            strip.setPixelColor(j, Color(0, 255 - i, i + 55))
        strip.show()
        time.sleep(wait_ms / 1000.0)
    for i in range(iterations, 0, -1):
        for j in range(strip.numPixels()):
            strip.setPixelColor(j, Color(0, 255 - i, i + 55))
        strip.show()
        time.sleep(wait_ms / 1000.0)

def rainbow_fade(strip, wait_ms = 1000, iterations = 255):
    for i in range(iterations):
        for j in range(strip.numPixels()):
            strip.setPixelColor(j, wheel(i % 255))
        strip.show()
        time.sleep(wait_ms / 1000.0)
        
def still_rainbow(strip, wait_ms=50, iterations=50):
    for i in range(strip.numPixels()):
        strip.setPixelColor((i) % strip.numPixels(), wheel((i * 30) % 255))
    strip.show()
        
def rainbow(strip, wait_ms=50, iterations=300):
    for j in range(iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor((i + j) % strip.numPixels(), wheel((i * 20) % 255))
        strip.show()
        time.sleep(wait_ms/1000.0)

def tiffany_blue(strip):
    #for i in range(86, 170):
    for i in range(0, strip.numPixels(), 2):
        strip.setPixelColor(i, Color(129, 216, 208))
        strip.show()

def binary_time():
    now = time.localtime()
    current_time = time.strftime("%H:%M", now)
    return current_time


def binary_clock(strip):
    time = binary_time()
   # print(time)

    h_one = range(23, 43)
    h_two = range(43, 64)
    h_four = range(64, 86)
    h_eight = range(86, 106)

    for i in h_one:
        strip.setPixelColor(i, Color(255, 0, 0))
    for i in h_two:
        strip.setPixelColor(i, Color(0, 255, 0))
    for i in h_four:
        strip.setPixelColor(i, Color(0, 0, 255))
    for i in h_eight:
        strip.setPixelColor(i, Color(200, 150, 0))
    strip.show()

def ralph(strip):
    full = strip.numPixels()
    half = int(math.floor(full / 2))
    for i in range(0, strip.numPixels()):
        strip.setPixelColor(i, Color(255, 30, 0));
    strip.show()

def vader(strip):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(150, 0, 9))
        strip.show()

def teal(strip):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 150, 80))
        strip.show()

def clear(strip):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 0, 0))
    strip.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('scheme', help='Which color scheme to apply')
    args = parser.parse_args()

    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()

    try:
        while True:
            if (args.scheme == 'sully'):
                sully(strip)
            if (args.scheme == 'sorcerer_mickey'):
                sorcerer_mickey(strip)
            if (args.scheme == 'iron_man'):
                iron_man(strip)
            if (args.scheme == 'elsa'):
                elsa(strip)
            if (args.scheme == 'tinkerbell'):
                tinkerbell(strip)
            if (args.scheme == 'mulan'):
                mulan(strip)
            if (args.scheme == 'vanellope'):
                vanellope(strip)
            if (args.scheme == 'yoda'):
                yoda(strip)
            if (args.scheme == 'merida'):
                merida(strip)
            if (args.scheme == 'leia'):
                leia(strip)
            if (args.scheme == 'baymax'):
                baymax(strip)
            if (args.scheme == 'jack_skellington'):
                jack_skellington(strip)
            if (args.scheme == 'mike'):
                mike(strip)
            if (args.scheme == 'hulk'):
                hulk(strip)
            if (args.scheme == 'stitch'):
                stitch(strip)
            if (args.scheme == 'rainbow_fade'):
                rainbow_fade(strip)
            if (args.scheme == 'still_rainbow'):
                still_rainbow(strip)
            if (args.scheme == 'tiffany_blue'):
                tiffany_blue(strip)
            if (args.scheme == 'binary_clock'):
                binary_clock(strip)
            if (args.scheme == 'ralph'):
                ralph(strip)
            if (args.scheme == 'vader'):
                vader(strip)
            if (args.scheme == 'teal'):
                teal(strip)
            if (args.scheme == 'clear'):
                clear(strip)

    except KeyboardInterrupt:
        clear(strip)
