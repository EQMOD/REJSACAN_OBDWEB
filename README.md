# REJSACAN_OBDWEB
A WEB Based OBDII Dongle Platform using the REJSACAN ESP32-S3 OBDII DONGLE

A REJSACAN OBDII Dongle using the ESP32-S3 with built-in SPIFFF memory is used as a CAN BUS OBDII reader and the data is presented as WEB PAGE using a built-in webserver. The webpage code communicates to the dongle via WiFi and uses websockets to retrieve OBDII data. The platform is using an ESP32 microcontroller which is a dual core mcu with the first core handling the CAN Bus comunications part via SN65HVD230 CAN BUS Transceiver and the 2nd core handling the websocket part. OBDII data is pushed to the UI every 60ms to 100ms for critical data such as rpm and speed, and every 1000ms for not so critical data such as temp, voltage, etc.

The platform code is using ESP32 RTOS for the multi core multi tasking component. That's basically an OBDII with a webserver running inside that dongle which is attached to the car's obd port. And literally you can read every car metric data and show it on the car infotainment / Web browser / Phone app with customizable fancy UI stuff (gauges, graphs, etc.) using standard HTML/JS/CSS/JPG renders.

The OBDII Dongle with the built-in ESP32-S3 micrcontroller is designed by Magnus Thome and details can be found here;

https://github.com/MagnusThome/RejsaCAN-ESP32

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/d9fb3780-23e6-4935-800e-ecf7336a4d08)


The WEB UI assets are stored on the REJSCAN Dongle's SD Card can be customized by a web designer/developer using HTML/JS/CSS/jpg assets;

Sample UIs;

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/7f3da427-e9a6-4ff7-aa03-63902e95e825)

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/c9425636-4ede-4a33-bce3-604956f93b99)

Transparent UIs with a LIVE CAMERA FEED on the webpage background is also possible

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/40da870d-5916-4593-a670-4dd24b201a21)

![image](https://github.com/EQMOD/REJSACAN_OBDWEB/assets/29789200/92e0deb7-28c5-4523-9fd6-6baa8f7f16f6)










