from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita o CORS para todas as rotas

data_list = []  # Lista para armazenar os dados

@app.route('/data', methods=['GET', 'POST', 'PUT'])
def handle_data():
    if request.method == 'GET':
        return jsonify(data_list)  # Retorna a lista de dados quando solicitado
    elif request.method == 'POST':
        data = request.json  # Obtém os dados enviados no corpo da solicitação POST
        data_list.append(data)  # Adiciona os dados à lista
        return "Dados recebidos com sucesso!"
    elif request.method == 'PUT':
        data = request.json  # Obtém os dados enviados no corpo da solicitação PUT
        data_list.append(data)  # Adiciona os dados à lista
        return "Dados atualizados com sucesso!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Permitir solicitações de outros dispositivos na rede local
