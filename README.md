Overview

Ship Proxy System is a lightweight and efficient proxy server application designed to handle HTTP requests, routing, and caching for various web services. It enables developers to test and debug network communications, simulate real-world web traffic, and optimize their applications with minimal setup.

Features

Handles HTTP GET and POST requests

Proxy routing for multiple target servers

Easy configuration for ports and endpoints

Logging of incoming requests and responses

Lightweight and easy to deploy

Compatible with Windows, Linux, and MacOS

Installation
Requirements

Python 3.11+

Git

Optional: Virtual environment

Steps

Clone the repository:

git clone https://github.com/RITIKYADAV0070/ship-proxy-system.git


Navigate to the project folder:

cd ship-proxy-system


Install dependencies (if any):

pip install -r requirements.txt

Usage

Start the proxy server with:

python server.py


Run the client to test connections:

python client.py


Modify the configuration in config.py to change ports, target URLs, or other settings.

Configuration

You can configure the following in config.py:

PORT – Port on which the proxy server will run

TARGET_URL – Default target URL for routing requests

LOGGING – Enable or disable request logging

Contributing

Contributions are welcome! Follow these steps:

Fork the repository

Create a new branch (git checkout -b feature/YourFeature)

Make your changes

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature/YourFeature)

Open a Pull Request
