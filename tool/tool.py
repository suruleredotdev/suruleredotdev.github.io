#!/usr/bin/python3

import flask
import os
from subprocess import Popen, PIPE, STDOUT
import logging

app = flask.Flask(__name__)

app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')

@app.route('/')
def start():
    run("./serve.rb")

def run(cmd):
    process = Popen(cmd, stdout=STDOUT, stderr=STDOUT)
    return process

def log(pipe, prefix=""):
    for line in iter(pipe.readline, b''): # b'\n'-separated lines
        logging.info('%s %r', prefix, line)
