# YouTube Playlist Manager (in development)

A web application that simplifies the process of managing and organizing YouTube playlists. Built with React & Nodejs.

## Features (implemented)

- Google Authentication
- Add multiple playlist videos from different playlists to a new playlist/existing playlist(s)
- Delete playlist videos from its initial playlist after adding to new playlists

## Features (planning)

- Delete multiple playlist videos at once
- Drag and drop playlist videos
- Settings: revoke app access
- Responsive design
- Dark Mode

## Limitations

Most features in this application use [YouTube Data API v3](https://developers.google.com/youtube/v3). Each request made to an API has [quota cost](https://developers.google.com/youtube/v3/determine_quota_cost). If you intend to use this app to add or remove a large number of playlist videos in a day, this may exceed your daily quota allocated by the YouTube Data API. Therefore, use the app with caution, monitoring your quota cost in the Google Developer Console if necessary.

## Installation

1. Register OAuth application in Google Developers Console

- Create a project in Google Developers Console
- Go to Enabled APIs & services page, enable YouTube Data API v3
- Go to the Credentials page, create a new OAuth client ID (Application type: Web application). In authorized redirect URI, insert this callback URL below:

```
[origin]/api/auth/callback
```

Once created, you will receive a client ID and client secret. Create a `.env` file and add those to this file (see `.env.example` in both client-side and server-side applications).

- Setup OAuth consent screen

2. Install dependencies for both client-side and server-side applications

```bash
cd client
npm install

cd ../server
npm install
```

3. Start applications

```bash
# Server-side application
npm start

# Client-side application
npm run dev
```

## Technologies

- Server: Nodejs + Express
- Client: React + TypeScript, TanStack Query, React Router, Styled Components, WebWorker

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.
