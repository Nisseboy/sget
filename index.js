let vid;


async function startCapture() {
  let settings = {};
  Array.from(document.getElementsByClassName("setting")).forEach(setting=>{
    settings[setting.children[0].innerText] = setting.children[1].checked;
  })
  let options = {
    video: {
      frameRate: 60
    }
  }
  if (settings["Record Audio"]) {
    options.audio = {
      echoCancellation: settings["Echo Cancellation"],
      noiseSuppression: settings["Noise Suppression"],
    }
  }
  try {
    vid = await navigator.mediaDevices.getDisplayMedia(options);

    const preview = document.getElementsByClassName("preview")[0];
    preview.srcObject = vid;

    document.getElementsByClassName("start-capture")[0].style.display = "none";
    document.getElementsByClassName("stop-capture")[0].style.display = "block";

    vid.oninactive = ()=>{
      document.getElementsByClassName("stop-capture")[0].style.display = "none";
      document.getElementsByClassName("start-capture")[0].style.display = "block";
    }
  } catch(err) {}
}

async function stopCapture() {
  let tracks = vid.getTracks();

  tracks.forEach((track) => track.stop());
}