#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085_U.h>
#include <DHT.h>
#include <ArtronShop_BH1750.h>

// Definições para o sensor DHT11
#define DHTPIN D5     // Pino que está conectado ao pino OUT do DHT11
#define DHTTYPE DHT11 // Definindo o tipo de DHT - DHT11
DHT dht(DHTPIN, DHTTYPE);

// Cria uma instância do sensor BMP180.
Adafruit_BMP085_Unified bmp = Adafruit_BMP085_Unified(10085);

// Instância do sensor BH1750. Use o endereço 0x23 ou 0x5C conforme o seu sensor.
ArtronShop_BH1750 bh1750(0x23, &Wire);

void setup() {
  Serial.begin(115200);

  // Inicializa a comunicação I2C
  Wire.begin(D3, D4); // SDA, SCL
  
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
    Serial.println("BH1750 not found !");
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
    Serial.print("Pressão: ");
    Serial.print(event.pressure);
    Serial.println(" hPa");
    Serial.print("Pressão em atm: ");
    Serial.println(pressure_atm);

    // Obtém a temperatura do sensor BMP180
    float temperatureBMP;
    bmp.getTemperature(&temperatureBMP);
    Serial.print("Temperatura BMP180: ");
    Serial.print(temperatureBMP);
    Serial.println(" ºC");
  } else {
    Serial.println("Erro ao ler a pressão!");
  }

  // Lê a informação do DHT11
  float humidity = dht.readHumidity();
  float temperatureDHT = dht.readTemperature();

  // Verifica se alguma leitura falhou e sai mais cedo (para tentar novamente).
  if (isnan(humidity) || isnan(temperatureDHT)) {
    Serial.println("Falha ao ler do DHT11!");
  } else {
    Serial.print("Umidade: ");
    Serial.print(humidity);
    Serial.println(" %");
    Serial.print("Temperatura DHT11: ");
    Serial.print(temperatureDHT);
    Serial.println(" ºC");
  }

   // Leitura do BH1750
  float lightLevel = bh1750.light();
  Serial.print("Luz: ");
  Serial.print(lightLevel);
  Serial.println(" lx");

  delay(2000); // Pausa de 2 segundos entre as leituras
}
