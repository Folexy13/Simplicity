# Simplicity - Your Second Brain, Empowered by Generative AI

<div align="center">
    <img src="./logo.png" alt="Simplicity-logo" width="30%"  style="border-radius: 50%; padding-bottom: 20px"/>
</div>

<div align="center">
<a href="https://discord.gg/HUpRgp2HG8">
  <img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" alt="Join our Discord" height="40">
</a>
</div>

Simplicity, making study simple and Fun.

[Roadmap here](https://brain.Simplicity.app)

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

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/846779307?h=34f4f56605&badge=0&autopause=0&player_id=0&app_id=58479/embed" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>

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

- **Step 2**: Use the install helper

  You can use the install_helper.sh script to setup your env files

  ```bash
  brew install gum # Windows (via Scoop) scoop install charm-gum

  chmod +x install_helper.sh
  ./install_helper.sh
  ```

- **Step 3**: create the `backend/.env` using the `.env_sample` as a guide

  > _Your `supabase_service_key` can be found in your Supabase dashboard under Project Settings -> API. Use the `anon` `public` key found in the `Project API keys` section._

  > _Your `JWT_SECRET_KEY`can be found in your supabase settings under Project Settings -> API -> JWT Settings -> JWT Secret_

  > _To activate vertexAI with PaLM from GCP follow the instructions [here](https://python.langchain.com/en/latest/modules/models/llms/integrations/google_vertex_ai_palm.html) and update `backend/.env`- It is an advanced feature, please be expert in GCP before trying to use it_

  - [ ] Change variables in `backend/.env`

- **Step 4**: Run the following migration scripts on the Supabase database via the web interface (SQL Editor -> `New query`)

  Use the `migration.sh` script to run the migration scripts

  ```bash
  chmod +x migration.sh
  ./migration.sh
  ```

  Choose either create_scripts if it's your first time or migrations if you are updating your database.

  All the scripts can be found in the [scripts](scripts/) folder

  > _If you come from an old version of Simplicity, run the scripts in [migration script](scripts/) to migrate your data to the new version in the order of date_

- **Step 5**: Launch the app

  ```bash
  docker compose -f docker-compose.yml up --build
  ```

- **Step 6**: Navigate to `localhost:3000` in your browser

- **Step 7**: Want to contribute to the project?

  ```
  docker compose -f docker-compose.dev.yml up --build
  ```

## Contributors ✨
