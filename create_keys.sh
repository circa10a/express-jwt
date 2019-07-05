#!/usr/bin/env bash

key_name="jwtRS256"
ssh-keygen -t rsa -b 2048 -f "${key_name}.key"
openssl rsa -in "${key_name}.key" -pubout -outform PEM -out "${key_name}.key.pub"