# di_lighting
Neopixel lighting controlled by the Disney Infinity base

Full breakdown coming soon. A Spring Boot server powers an API that draws from a MongoDB database. A Rust binary reads NFC tags from Disney Infinity figures and sends tag info to the server. A Python script powers the LED lights. Finally, an Angular front-end allows easy editing for the figures and light programs.
