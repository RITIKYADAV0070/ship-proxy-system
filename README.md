# Ship Proxy System 🚢

**Ship Proxy System** is a lightweight and efficient **Node.js proxy server** designed to handle HTTP requests, routing, and caching for various web services. It helps developers test and debug network communications, simulate real-world web traffic, and optimize their applications with minimal setup.

---

## Features ✨

- Handles **HTTP GET** and **POST** requests  
- Supports **proxy routing** for multiple target servers  
- **Easy configuration** for ports and endpoints  
- **Logging** of incoming requests and responses  
- **Lightweight** and easy to deploy  
- Compatible with **Windows, Linux, and macOS**

---

## Installation ⚡

### Requirements

- Node.js **18+**  
- npm (comes with Node.js) or yarn  
- Git  
- Optional: Use a **virtual environment** or **nvm** to manage Node versions

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RITIKYADAV0070/ship-proxy-system.git

2. **Navigate to the project folder:**
   cd ship-proxy-system
3. **Install dependencies**
   pip install -r requirements.txt

   **Usage**

1. Start the proxy server:
   node server.js
2. Run the client to test connections:
   node client.js
3. Modify configuration in config.js to change:

   PORT – Port on which the proxy server runs

TARGET_URL – Default target URL for routing requests

  LOGGING – Enable or disable request logging

  Configuration 🛠️

All configurable settings are in config.js:

| Setting      | Description                             | Example              |
| ------------ | --------------------------------------- | -------------------- |
| `PORT`       | Port on which the proxy server runs     | `8080`               |
| `TARGET_URL` | Default target URL for routing requests | `http://example.com` |
| `LOGGING`    | Enable or disable request logging       | `true` / `false`     |

**Contributing** 

Contributions are welcome! Follow these steps:

Fork the repository

Create a new branch:

git checkout -b feature/YourFeature


Make your changes

Commit your changes:

git commit -m "Add feature"


Push to your branch:

git push origin feature/YourFeature


Open a Pull Request
