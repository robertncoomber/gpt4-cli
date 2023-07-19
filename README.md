# gpt-cli

Basic implementation of the openai gpt models in a terminal interface. This was made to use gpt4 on a per usage basis rather than a flat $20 fee. It's also fun to run this in the terminal. This requires you own openai api key and access to the gpt-4 model.

![image of console](https://raw.githubusercontent.com/robertncoomber/gpt4-cli/main/readme-img.png)

### Setup
This is a basic node app.
1) clone to your local machine
2) run `npm i` to install packages
3) create a .env file in the root and add you api key `OPENAI_API_KEY=your-key`

### Usage
1) start the app with `node .`
2) chose your model, type a number and press enter
3) start a conversation with chat
4) save the conversation by typing `save yourfilename` this will save a yourfilename.txt file to the project root 
5) quit the app by typing `quit`

### Notes
- This doesn't stream the responses yet so give it some time to complete, especially if it is using gpt4 with a longer message.
