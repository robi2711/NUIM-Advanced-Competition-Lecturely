# NUIM-Advanced-Competition-Lecturely

**Lecturely** is a web application designed to assist people with hearing impairments and students who want to summarize lectures. The app converts spoken words into text in real-time and provides AI-powered summaries of the lectures afterward.

## Features

- 🎤 **Real-time Speech-to-Text**: Converts the lecturer's speech into text and displays it in real-time.
- 📱 **QR Code Room Access**: Users join lecture rooms by scanning a QR code.
- 🔄 **Amazon Integration**: Real-time data synchronization using Amazon.
- 📝 **AI-Powered Summaries**: Generates concise summaries of lectures after they are completed.
- 💾 **DynamoDB Storage**: Stores lecture transcripts for future reference.

## How It Works

1. The **Master Client** creates a room and generates a QR code.
2. Users scan the QR code to join the room.
3. The Master Client speaks, and their voice is converted into text using a speech-to-text algorithm.
4. The text is stored in Firebase in real-time and distributed to connected users.
5. Once the room is closed, the transcript is saved to Dynamo, where users can access it later.
6. AI algorithms summarize the stored text for easy review.

## Tech Stack

- **Frontend**: React, TypeScript, Material UI (MUI)
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: DynamoDB
- **AI Summarization**: Custom AI models (details TBD)

## Installation

To set up this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/your_username/lecturely.git
    cd lecturely
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up AWS Console:
   - Create a Aws project and add your AWS configuration to `.env`:
     ```bash
     COGNITO_CLIENT_ID = your client id
     COGNITO_CLIENT_SECRET = your client secret
     COGNITO_REDIRECT_URIS = your redirect uris
     DYNAMO_KEY= your dynamo key
     DYNAMO_SECRET=your dynamo secret key
     AWS_REGION=Your aws region
     ```

4. Run the development server:
    ```bash
    npm start
    ```

## Usage

1. **Create a Room**: The Master Client creates a room and shares the QR code with participants.
2. **Join a Room**: Participants scan the QR code to connect to the session.
3. **Real-time Transcription**: As the Master Client speaks, their words are transcribed and shared with all participants.
4. **Access Previous Lectures**: After the session ends, users can access past lectures from their dashboard.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to your branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Roadmap

- [ ] Add support for multiple languages.
- [ ] Improve AI summarization accuracy.
- [ ] Implement offline mode for lecture storage.


## Contact


