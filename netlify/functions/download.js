const ytdl = require('ytdl-core');

exports.handler = async function (event, context) {
  const url = JSON.parse(event.body).url;

  if (!ytdl.validateURL(url)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid YouTube URL' }),
    };
  }

  try {
    const info = await ytdl.getInfo(url);
    const downloadUrl = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' }).url;

    return {
      statusCode: 200,
      body: JSON.stringify({ downloadUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process the video' }),
    };
  }
};
