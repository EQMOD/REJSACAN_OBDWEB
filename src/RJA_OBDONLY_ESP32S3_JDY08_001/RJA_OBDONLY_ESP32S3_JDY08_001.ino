#include "esp32_can.h" 
#include "esp32_obd2.h"


#define CAN_RX_PIN  13
#define CAN_TX_PIN  14


#define CCPWR GPIO_NUM_21
#define PWRC GPIO_NUM_6

#define RXD0 GPIO_NUM_44          // ESP32 RX0 gpio for CC2541 TX pin     
#define TXD0 GPIO_NUM_43          // ESP32 TX0 gpio for CC2541 RX pin (unused)

#define RXD2 GPIO_NUM_15          // ESP32 RX gpio for CC2541 TX pin     
#define TXD2 GPIO_NUM_7          // ESP32 TX gpio for CC2541 RX pin (unused)
#define CC2541RST1 GPIO_NUM_12    // ESP32 gpio pin for CC2541 reset 
#define CC2541Timeout 10          // Readtimeout per 100ms


void setup() {


   pinMode(CC2541RST1, OUTPUT);
  pinMode(CCPWR, OUTPUT);
  //pinMode(PWRC, OUTPUT);
 
   // Turn ON JDY08 Power Line 
 
  digitalWrite(CCPWR, HIGH);

  // JDY08 Reset
  delay(1000);

  
  digitalWrite(CC2541RST1, HIGH);
  delay(300);
  digitalWrite(CC2541RST1, LOW);
  delay(300);
  digitalWrite(CC2541RST1, HIGH);
  

  Serial2.begin(9600,SERIAL_8N1,RXD2,TXD2);
  Serial2.print("AT+NAMERCS_BLE");
  Serial2.print("AT+BAUD9");

  Serial2.print("Starting OBD2 RPM... ");

  
  CANMod.setCANPins((gpio_num_t)CAN_RX_PIN, (gpio_num_t)CAN_TX_PIN);
  CANMod.setDebuggingMode(true);
  
  if (!OBD2.begin()) {
    Serial2.println("failed!");
  }
  else {
    Serial2.println("succeded");
  }
}

void loop() {
  Serial2.print(OBD2.pidName(ENGINE_RPM));
  Serial2.print(" = ");
  Serial2.print(OBD2.pidRead(ENGINE_RPM));
  Serial2.print(OBD2.pidUnits(ENGINE_RPM));
  Serial2.println();
  //delay(1000);
}
