# NUIM-Advanced-Competition-Lecturely

**Lecturely** is a web application designed to assist people with hearing impairments and students who want to summarize lectures. The app converts spoken words into text in real-time and provides AI-powered summaries of the lectures afterward.

## Features

- 🎤 **Real-time Speech-to-Text**: Converts the lecturer's speech into text and displays it in real-time.
- 📱 **QR Code Room Access**: Users join lecture rooms by scanning a QR code.
- 🔄 **Firebase Integration**: Real-time data synchronization using Firebase.
- 📝 **AI-Powered Summaries**: Generates concise summaries of lectures after they are completed.
- 💾 **Firestore Storage**: Stores lecture transcripts for future reference.

## How It Works

1. The **Master Client** creates a room and generates a QR code.
2. Users scan the QR code to join the room.
3. The Master Client speaks, and their voice is converted into text using a speech-to-text algorithm.
4. The text is stored in Firebase in real-time and distributed to connected users.
5. Once the room is closed, the transcript is saved to Firestore, where users can access it later.
6. AI algorithms summarize the stored text for easy review.

## Tech Stack

- **Frontend**: React, TypeScript, Material UI (MUI)
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: Firebase Realtime Database & Firestore
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

3. Set up Firebase:
   - Create a Firebase project and add your Firebase configuration to `.env`:
     ```bash
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
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

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your_username/lecturely](https://github.com/your_username/lecturely)
