Selected Works — Video Best Practices

Overview

This document summarizes recommended settings and practices for adding MP4 video demos to the "Selected Works" or Projects section (short preview clips + full demos).

Quick recommendations

- Format: MP4 container (.mp4)
- Video codec: H.264 (AVC) — best compatibility across browsers
- Audio codec: AAC
- Alternative: WebM (VP9/AV1) can be added for cutting-edge browsers if you need better compression

Dimensions & Resolutions

- Preview (grid/thumbnail): 1280x720 (720p) is a good balance between quality and size. For small/thumbnail areas you can use 640x360.
- Full playback (modal/hero): 1920x1080 (1080p) recommended when you want higher quality.
- Keep aspect ratio consistent across project videos (e.g., 16:9) for predictable layout.

Bitrate & File Size

- 1080p: 2.5–5 Mbps (2500–5000 kbps)
- 720p: 1.0–3 Mbps (1000–3000 kbps)
- Aim for: <= 5–10 MB for short preview clips (3–10 seconds) to ensure fast page loads.

Encoding/Optimization Tips

- Use ffmpeg to create web-optimized MP4 with a faststart (places moov atom at the beginning):

  ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart -vf "scale=1280:-2" output.mp4

- For smaller thumbnails, scale down to 640x360 and lower bitrate:

  ffmpeg -i input.mov -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 96k -movflags +faststart -vf "scale=640:-2" preview.mp4

- Use short, loop-friendly clips (3–8s) for hover previews. Create a separate longer video for the modal with higher bitrate if needed.

Accessibility & Performance

- Provide a `poster` (image) for the video so users on slow connections or devices without autoplay see a representative frame.
- Use muted autoplay only for short previews (autoplay with sound is blocked on many browsers).
- Provide controls and allow sound in the modal/full player.
- Consider providing multiple source formats (MP4 + WebM) for optimal performance across browsers.

Progressive Enhancement

- For long-form demos or very large assets, consider adaptive streaming (HLS/DASH) if you expect users to watch long videos.

Notes

- The current site uses the `poster` attribute and shows a muted looped preview on hover, and opens a modal with controls for full playback.
- Replace the placeholder files in `/public/videos/` with your encoded MP4s and keep poster images in `/public/projects/` as fallbacks.

If you want, I can add scripts to auto-encode/resize videos using ffmpeg and place optimized outputs into `/public/videos/`.
