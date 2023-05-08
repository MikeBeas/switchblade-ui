# Requirements

Any environment that can run an application built on React 18 should suffice. This app was created with Node 19, but should work with Node 18. The app is built using Vite.

# Environment Variables

You can setup the following environment variables to configure your Switchblade UI installation. When running the app locally you can do this with a `.env` file at the top level of the repo. This file has been git-ignored and will not be committed.

- `SWITCHBLADE_API_HOST`: The full domain name for your Switchblade API with no trailing slash. If you don't enter this value, you'll be prompted to enter it before you reach the login screen. You will have the option of letting your browser remember your hostname in the future. Leaving this blank will allow anyone to use your installation of this interface to manage their own Switchblade installation, making it possible to host a pubicly-available version of this UI that does not give access to any of your data.