import numpy as np
from flask import Flask, request, render_template
import pickle
from sklearn.metrics import classification_report
import pandas as pd

# TO LOAD THE MODEL AND THE SCALER!
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search',methods=['POST','GET'])
def search():
    #For rendering results on HTML 
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    classes = np.array(["YES","NO"])
    output = classes[prediction][0]

    return render_template('index.html', prediction_text='Results: {}'.format(output))