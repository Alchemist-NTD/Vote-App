FROM python:3.8-slim-buster

RUN mkdir /src

WORKDIR /src

COPY requirements.txt /src/

RUN apt-get update && apt-get install -y build-essential python3-dev python3-pip

RUN pip3 install -r requirements.txt

COPY . /src

EXPOSE 8000