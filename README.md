# Photography Portfolio Backend

Repository contains the backend source code for [yanchengqiu.com](https://yanchengqiu.com).

## Tech Stack & Architecture
* **Runtime Environment:** Node.js (v22.x)
* **Server Framework:** Express.js (v5.x)
* **Reverse Proxy:** Cloudflare Tunnels (`cloudflared`)
* **Media Processing:** Cloudinary API (Node.js SDK)

##  Environments & Accounts
This project splits its infrastructure between cloud-hosted static frontends and a self-hosted local backend.

###  Frontend Infrastructure
* **Hosting Provider:** GitHub Pages
  * **Live URL:** [https://farazaleboyeh.github.io](https://farazaleboyeh.github.io)
  * **Deployment Method:** **Automated via GitHub Actions**
    * Every push or pull request merged into the `main` branch triggers the deployment workflow [github/workflows/pages.yml](.github/workflows/pages.yml).
    * The workflow automatically sets up Node.js, installs dependencies, builds the production assets via Vite, and deploys the static files to the `gh-pages` branch.

### Backend Infrastructure (Self-Hosted)
* **Host Hardware:** Raspberry Pi (running locally)
* **Reverse Proxy & Routing:** [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel/)
  * **Purpose:** Exposes the local Raspberry Pi backend securely to the public internet without opening port forwarding rules on the local router.
  * **API Endpoint:** [https://api.yanchengqiu.com](https://api.yanchengqiu.com)

##  Local Development

### Prerequisites
* **Node.js** `v22.x` or higher 
* **npm** `v10.x` or higher

### Installation & Setup
1. Clone with ```git clone https://github.com/farazaleboyeh/portfolio-backend.git```.
2. Run `npm install` to install dependencies.
3. Duplicate .env & fill in with  ```cp .env.example .env```.
4. Run `node server.js` to start server.

### Cloudflare Tunnel Maintenance
The tunnel runs as a system daemon on the Raspberry Pi, mapping traffic from ```api.yanchengqiu.com``` to http://localhost:3000.
* Checking Tunnel status: ```systemctl status cloudflared```
* Restarting Tunnel: ```sudo systemctl restart cloudflared```

## General Project Structure 
```text
├── routes/                
│   └── images.js       # Handles all API requests
├── .env.example        # Template for environment variables
├── package.json        # Dependencies and execution scripts
└── server.js           # Server application entry point
```
Note: Some files and folders omitted for simplicity. 
