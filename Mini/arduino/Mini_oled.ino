#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085_U.h>
#include <DHT.h>
#include <ArtronShop_BH1750.h>
#include <U8g2lib.h>

// Definições para o sensor DHT11
#define DHTPIN D5     // Pino que está conectado ao pino OUT do DHT11
#define DHTTYPE DHT11 // Definindo o tipo de DHT - DHT11
DHT dht(DHTPIN, DHTTYPE);

// Cria uma instância do sensor BMP180.
Adafruit_BMP085_Unified bmp = Adafruit_BMP085_Unified(10085);

// Instância do sensor BH1750. Use o endereço 0x23 ou 0x5C conforme o seu sensor.
ArtronShop_BH1750 bh1750(0x23, &Wire);

// Inicializa o display OLED
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ D4, /* data=*/ D3, /* reset=*/ U8X8_PIN_NONE);

void setup() {
  // Inicializa a comunicação serial
  Serial.begin(115200);
  
  // Inicializa a comunicação I2C
  Wire.begin(D3, D4); // SDA, SCL
  
  // Inicializa o display OLED
  u8g2.begin();
  
  // Inicializa o sensor DHT11
  dht.begin();

  // Inicializa o sensor BMP180
  if (!bmp.begin()) {
    Serial.println("OOPS! Não foi possível encontrar o BMP180. Verifique as conexões.");
    while (1);
  }
  Serial.println("BMP180 encontrado e inicializado");

  // Inicializa o sensor BH1750
  while (!bh1750.begin()) {
    Serial.println("BH1750 não encontrado !");
    delay(1000);
  }
}

void loop() {
  // Lê a informação do BMP180
  sensors_event_t event;
  bmp.getEvent(&event);
  
  if (event.pressure) {
    // Converte a pressão de hPa para atm (1 atm = 1013.25 hPa)
    float pressure_atm = event.pressure / 1013.25; 
    drawSensorData("Temp", dht.readTemperature(), "Press", event.pressure, "Lum", bh1750.light(), "Umidade", dht.readHumidity());
  } else {
    Serial.println("Erro ao ler a pressão!");
  }

  delay(2000); // Pausa de 2 segundos entre as leituras
}

void drawSensorData(const char* label1, float data1, const char* label2, float data2, const char* label3, float data3, const char* label4, float data4) {
  // Limpa o buffer do display
  u8g2.clearBuffer();

  // Define a fonte
  u8g2.setFont(u8g2_font_profont10_tr);

  // Escreve os dados no display
  char buffer[20];
  sprintf(buffer, "%s: %.1f", label1, data1);
  u8g2.drawStr(0, 10, buffer);
  sprintf(buffer, "%s: %.1f", label2, data2);
  u8g2.drawStr(0, 25, buffer);
  sprintf(buffer, "%s: %.1f", label3, data3);
  u8g2.drawStr(0, 40, buffer);
  sprintf(buffer, "%s: %.1f", label4, data4);
  u8g2.drawStr(0, 55, buffer);

  // Envia o conteúdo do buffer para o display
  u8g2.sendBuffer();
}
