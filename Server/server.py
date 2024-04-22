from flask import Flask, request, jsonify

app = Flask(__name__)

data_list = []  # Lista para armazenar os dados

@app.route('/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'GET':
        return jsonify(data_list)  # Retorna a lista de dados quando solicitado
        
    elif request.method == 'POST':
        data = request.json  # Obtém os dados enviados no corpo da solicitação POST
        data_list.append(data)  # Adiciona os dados à lista
        return "Dados recebidos com sucesso!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Permitir solicitações de outros dispositivos na rede local
