# REJSACAN_OBDWEB
=== A WEB Based OBDII Dongle Platform using the REJSACAN ESP32-S3 OBDII DONGLE

A REJSACAN OBDII Dongle using the ESP32-S3 with built-in SPIFFF memory is used as a CAN BUS OBDII reader and the data is presented as WEB PAGE using a built-in webserver. The webpage code communicates to the dongle via WiFi and uses websockets to retrieve OBDII data. The platform is using an ESP32 microcontroller which is a dual core mcu with the first core handling the CAN Bus comunications part via SN65HVD230 CAN BUS Transceiver and the 2nd core handling the websocket part. OBDII data is pushed to the UI every 60ms to 100ms for critical data such as rpm and speed, and every 1000ms for not so critical data such as temp, voltage, etc.

The platform code is using ESP32 RTOS for the multi core multi tasking component. That's basically an OBDII with a webserver running inside that dongle which is attached to the car's obd port. And literally you can read every car metric data and show it on the car infotainment / Web browser / Phone app with customizable fancy UI stuff (gauges, graphs, etc.) using standard HTML/JS/CSS/JPG renders.

Any web browser client can connect to the dongle via WIFI with the OBD-II dongle acting as a Wifi Hotspot. Wifi credentials are embedded on the code.

Webserver entry point / homepage is ;

http://192.168.0.10/index.html


The OBDII Dongle with the built-in ESP32-S3 micrcontroller is designed by Magnus Thome and details can be found here;

https://github.com/MagnusThome/RejsaCAN-ESP32

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/d9fb3780-23e6-4935-800e-ecf7336a4d08)


=== The WEB UI assets are stored on the REJSCAN Dongle's SD Card can be customized by a web designer/developer using HTML/JS/CSS/jpg assets;

Sample UIs;

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/7f3da427-e9a6-4ff7-aa03-63902e95e825)

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/c9425636-4ede-4a33-bce3-604956f93b99)

Transparent UIs with a LIVE CAMERA FEED on the webpage background is also possible

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/40da870d-5916-4593-a670-4dd24b201a21)

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/92e0deb7-28c5-4523-9fd6-6baa8f7f16f6)


=== Sample Browser side and Dongle Side SDCARD DocRoot files;

https://github.com/EQMOD/REJSACAN_OBDWEB/tree/main/Custom_USERS_WEBUI

https://github.com/EQMOD/REJSACAN_OBDWEB/tree/main/SDCARD



=== Compiling use the Arduino IDE;

The codes is using the standard OBD-II Library (already included in this repository) with a little bit of customization from the original obdII Libraries-

Rewritten from sandeepmistry/arduino-OBD2 to instead depend on the ESP32 CAN libraries

https://github.com/collin80/esp32_can 
https://github.com/collin80/can_common 

that support ESP32 with TWAI. 

The code is also using the SDFat Library from Greiman. The SdFat library supports FAT16, FAT32, and exFAT file systems on Standard SD, SDHC, and SDXC cards.

https://github.com/greiman/SdFat

One Library file from SDFat needs to be modified in order for SDFat to work on the REJSACAN SD Card Slot;

<img width="288" alt="image" src="https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/3bbd7484-b041-444f-988c-e3554efc774d">

This is a little bit tricky as you need to add the above entry on the SdFatConfig.h file each time you compile the above codes on the REJSACan Dongle
and needs to be commented out if the above library will compiled with your other ESP32 based projects.

=== Suggested ARDUINO IDE settings for the compile and code upload/flashing which also include distributing the routines on the 2 cores;

<img width="366" alt="image" src="https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/10399ca8-dacb-40a7-ba07-0c8165594272">

PSRAM Size:

<img width="444" alt="image" src="https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/7cc459c6-5812-4564-9807-a28a2bfa67d6">





=== Access via WIFI-ELM327 is also possible through the TORQUE app for example. Codes included
















