export function initializePlayer(iframeRef, onPlayerStateChange) {
  const iframe = iframeRef.current;
  if (iframe) {
    new window.YT.Player(iframe, {
      events: {
        onStateChange: onPlayerStateChange, // Use the callback provided by the caller
      },
    });
  }
}
