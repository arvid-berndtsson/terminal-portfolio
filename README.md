# Terminal Portfolio
This project is a personal terminal portfolio built using the [T3 Stack](https://create.t3.gg/), which is bootstrapped with `create-t3-app`.

## Getting Started
### Prerequisites
Ensure you have the following installed on your local development environment:

- Node.js (version 22.x or later)
- npm

### Installation
Clone the repository:

```bash
git clone https://github.com/dotarvid/terminal-portfolio.git
cd terminal-portfolio
```
### Install the dependencies:

```bash
npm install
```
### Set up environment variables:

Copy the .env.example file to .env and fill in the necessary environment variables. As of **2024-09-17** there are no environment variables needed.

```bash
cp .env.example .env
```
### Running the Development Server
To start the development server, run:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production
To build the project for production, run:

```bash
npm run build
```
The output will be located in the .next directory. You can then start the production server with:

```bash
npm start
```

## Contributing
If you would like to contribute to this project, please fork the repository and create a new branch for your feature or bugfix. Submit a pull request, and your changes will be reviewed.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) for more information.
