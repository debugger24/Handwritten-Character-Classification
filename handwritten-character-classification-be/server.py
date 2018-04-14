import os

from flask import Flask, request, render_template, jsonify
from scipy.misc import imsave, imread, imresize
import numpy as np
import argparse
from keras.models import model_from_yaml
import re
import base64

app = Flask(__name__)

def load_model():
    # load YAML and create model
    yaml_file = open('%s/model.yaml' % '../model', 'r')
    loaded_model_yaml = yaml_file.read()
    yaml_file.close()
    model = model_from_yaml(loaded_model_yaml)

    # load weights into new model
    model.load_weights('%s/model.h5' % '../model')
    return model

@app.route('/predict/', methods=['GET','POST'])
def predict():
    ''' Called when user presses the predict button.
        Processes the canvas and handles the image.
        Passes the loaded image into the neural network and it makes
        class prediction.
    '''

    def parseImage(imgData):
        # parse canvas bytes and save as output.png
        imgstr = re.search(b'base64,(.*)', imgData).group(1)
        with open('output.png','wb') as output:
            output.write(base64.decodebytes(imgstr))

    # get data from drawing canvas and save as image
    parseImage(request.get_data())

    # read parsed image back in 8-bit, black and white mode (L)
    x = imread('output.png', mode='L')
    x = np.invert(x)

    # Visualize new array
    imsave('resized.png', x)
    x = imresize(x,(128,128))

    # reshape image data for use in neural network
    x = x.reshape(1,128,128,1)

    x = x.astype('float32')

    # x /= 255

    out = model.predict(x)

    print (out)
    print (sum(out[0]))

    # Generate response
    response = {'prediction': out[0].tolist().index(max(out[0])),
                'confidence': str(max(out[0]) * 100)[:6],
                'result_v': {'A':out[0][0]*100,
                'B':out[0][1]*100,
                'C':out[0][2]*100,
                'D':out[0][3]*100,
                'E':out[0][4]*100,
                'F':out[0][5]*100,
                'G':out[0][6]*100,
                'H':out[0][7]*100,
                'I':out[0][8]*100,
                'J':out[0][9]*100,
                'K':out[0][10]*100,
                'L':out[0][11]*100,
                'M':out[0][12]*100,
                'N':out[0][13]*100,
                'O':out[0][14]*100,
                'P':out[0][15]*100,
                'Q':out[0][16]*100,
                'R':out[0][17]*100,
                'S':out[0][18]*100,
                'T':out[0][19]*100,
                'U':out[0][20]*100,
                'V':out[0][21]*100,
                'W':out[0][22]*100,
                'X':out[0][23]*100,
                'Y':out[0][24]*100,
                'Z':out[0][25]*100,}}

    return jsonify(response)

if __name__ == '__main__':
    model = load_model()
    app.run(host='0.0.0.0', port=5000)