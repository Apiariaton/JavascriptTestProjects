async function main () {

    const audioPlayerLive = document.querySelector("#audioPlayerLive");
    const audioPlayerRecorded = document.querySelector("#audioPlayerRecorded");
    const buttonStartRecording = document.querySelector("#startRecording");
    const buttonStopRecording = document.querySelector("#stopRecording");


    const stream = await navigator.mediaDevices.getUserMedia({audio:true});

    audioPlayerLive.srcObject = null;
    audioPlayerLive.srcObject = stream;

    if (!MediaRecorder.isTypeSupported('audio/webm')){
        console.warn("audio/webm is not supported!");
    }


    const mediaRecorder = new MediaRecorder(stream,{
        mimeType: 'audio/webm'
    });

    buttonStartRecording.addEventListener('click',()=> {
        mediaRecorder.start();
    });

    buttonStopRecording.addEventListener('click',()=>{
        mediaRecorder.stop();
    });

    mediaRecorder.addEventListener('dataavailable',event => {
        console.log(event.data);
        console.log(event.data.text())
        audioPlayerRecorded.src = URL.createObjectURL(event.data);
    })

};

main();