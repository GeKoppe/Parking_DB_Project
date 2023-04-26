
"""
Example script showing how to represent todo lists and todo entries in Python
data structures and how to implement endpoint for a REST API with Flask.

Requirements:
* flask
"""

import random
from flask import Flask, request, jsonify, Response


# initialize Flask server
app = Flask(__name__)

# add some headers to allow cross origin access to the API on this server, necessary for using preview in Swagger Editor!
@app.after_request
def apply_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/usage', methods=['GET'])
def get_usage():
    usage = random.randint(0,176)
    return jsonify({'usage': usage, 'perma': random.randint(0,176 - usage)})

@app.route('/parker', methods=['GET', 'POST'])
def parker():
    if request.method == 'POST':
        body = request.get_json(force=True)
        if body.get('plate') == None or body.get('permaParker') == None:
            return Response('{\"message\": \"Name or perma wasn\'t given\"}', status=400, mimetype='application/json')
        else:
            return jsonify(body)

@app.route('/parking-lots/<nr>', methods=['GET'])
def lot_nr(nr):
    in_use = random.randint(0,1) == 1
    body = {
        'inUse': in_use,
        'plate': '',
        'driveInTime': '',
        'permaParker': False
    }
    if in_use:
        body['plate'] = 'AB-CD-123E'
        body['driveInTime'] = '26.04.2023 13:37'
        body['permaParker'] = True
    
    return jsonify(body)

@app.route('/all-lots', methods=['GET'])
def all_lots():
    lots = []
    for i in range(180):
        lots.append({'nr': i+1, 'inUse': (random.randint(0,1) == 1)})
    return jsonify({'lots': lots})

if __name__ == '__main__':
    # start Flask server
    app.run(host='0.0.0.0', port=13376)
