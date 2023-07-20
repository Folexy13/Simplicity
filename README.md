# Simplicity - Your Second Brain, Empowered by Generative AI

Simplicity, making study simple and Fun.

## Key Features 🎯

- **Generative AI**:

  - Simplicity employs advanced AI to assist you in generating questions ,summarizing and retrieving information from file.
  - It aims to simplify the already arduous academic lifestyle.
  - It fine if you call it, Students's first aid

- **File Compatibility**:
  - PDF
  - Images(Not Yet)
  - Powerpoint(Not Yet)
  - Excel (Not Yet)
  - CSV (Not Yet)
  - Word (Not Yet)
  - Audio (Not Yet)
  - Video (Not Yet)
- **Open Source**: Freedom is beautiful, and so is Simplicity. Open source and free to use.

## Demo Highlights 🎥

https://vimeo.com/846779307/34f4f56605?share=copy

## Getting Started 🚀

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites 📋

Ensure you have the following installed:

- Nodejs
- Docker

Additionally, you'll need a [RapidApi keys](https://rapidapi.com/hub) account for:

- Creating a new RapidApi project
- RapidApi Project API key

### Installation Steps 💽

- **Step 0**: If needed, the installation is explained on Youtube [here](https://youtu.be/rC-s4QdfY80)

- **Step 1**: Clone the repository using **one** of these commands:

  - If you don't have an SSH key set up:

  ```bash
  git clone https://github.com/Folexy13/Simplicity.git && cd Simplicity
  ```

  - If you have an SSH key set up or want to add it ([guide here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account))

  ```bash
  git clone git@github.com:Folexy13/Simplicity.git && cd Simplicity
  ```

- **Step 2**: install the dependencies

```bash
 cd Simplicity
 run npm install or yarn install
```

run npm install or yarn install

- **Step 3**: create the `backend/.env` using the `.env_sample` as a guide

  > _Your `RAPIDAPI_KEY` can be found in your Rapid Api dashboard under Project_

  > _Your `RAPIDURI`can be found in your Rapid APi settings under Project Settings_

  > _Your `DATABASE_URI`is your mongodb uri_

  - [ ] Change variables in `backend/.env`

- **Step 4**: Run the **_make production_** or **_yarn production_** or **_npm run production_** in your directory terminal to run the monolith application

- **Step 5**: Navigate to `localhost:3000` in your browser
