# YouTube Playlist Manager (in development)

A web application that simplifies the process of managing and organizing YouTube playlists. Built with React & Nodejs.

## Features

- Google Authentication
- Add multiple videos from different playlists to a new playlist/existing playlist(s); remove videos from its initial playlist after adding to new playlist(s)
- Remove multiple videos from different playlists
- Edit, delete playlist
- Drag and drop playlist videos
- Settings: revoke app access, theme (light & dark mode)

## Limitations

1. Most features in this application use [YouTube Data API v3](https://developers.google.com/youtube/v3). Each request made to an API has [quota cost](https://developers.google.com/youtube/v3/determine_quota_cost). If you intend to use this app to add or remove a large number of playlist videos in a day, this may exceed your daily quota allocated by the YouTube Data API. Therefore, use the app with caution, monitoring your quota cost in the Google Developer Console if necessary.
2. Items in **Watch later** playlists cannot be retrieved through the API ([more detail here](https://stackoverflow.com/a/47117301)).
3. Playlist items: The [playlistItems.list](https://developers.google.com/youtube/v3/docs/playlistItems/list) API does not provide video duration and view count in each playlist item. These details require additional requests to [videos.list](https://developers.google.com/youtube/v3/docs/videos/list).

## Installation (locally)

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
npm run build
npm run preview
```

## Technologies

- Server: Nodejs + Express
- Client: React + TypeScript, TanStack Query, React Router, Styled Components, WebWorker

## Screenshots

App screenshots can be found [here](screenshots.md).

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.
