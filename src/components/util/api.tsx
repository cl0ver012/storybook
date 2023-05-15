export const videoTypes = [
  "m4v",
  "avi",
  "mpg",
  "mp4",
  "mkv",
  "3gpp",
  "webm",
  "video/mp4",
  "video/mpg",
  "video/avi",
  "video/m4v",
  "video/mkv",
  "video/3gpp",
  "video/webm",
];

export const audioTypes = ["mp3", "wav", "ogg", "audio/mp3", "audio/wav", "audio/ogg"];
/* eslint-disable import/prefer-default-export */
export async function getFileTypeFromURL(url) {
  try {
    const req = await fetch(url);
    let fileType = null;
    const mimeType = await req.headers.get("content-type");
    if (videoTypes.includes(mimeType)) {
      fileType = "video";
    } else if (audioTypes.includes(mimeType)) {
      fileType = "audio";
    } else if (mimeType === "image/gif") {
      fileType = "gif";
    } else {
      fileType = "image";
    }
    return { mimeType, fileType };
  } catch (e) {
    return { mimeType: "image/png", fileType: "image" };
  }
}
