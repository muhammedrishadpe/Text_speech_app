// init speechSynth API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceselect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchvalue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init Voices array

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    // Loop through voices and creative an option for each one
    voices.forEach(voice => {
        //Create option element
        const option = document.createElement('option');
        //Fill option with voices amd lunguage
        option.textContent = voice.name + '('+ voice.lang +')';

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceselect.appendChild(option);
    });
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak

const speak = () => {
    // Add background animation
    body.style.background = '#fab2a2 url(img/wave1.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    //check if speaking
    if(synth.speaking) {
        console.error('Already speaking....');
        return;
    }
    if(textInput.value !== '') {
        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        ;
        //Speak end
        speakText.onend = e => {
            console.log('don speaking...');
            body.style.background = '#fab2b2';
        };

        //Speak error
        speakText.onerror = e => {
            console.error('Don speaking');
        };

        //Selected voice
        const selectedVoice = voiceselect.selectedOptions[0]
        .getAttribute('data-name');

        //Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.rate = pitch.value;
        //speak
        synth.speak(speakText);
    };
};

//EVENT LISTENERS

//Text form submit
textForm.addEventListener('submit', e => {
e.preventDefault();
speak();
textInput.blur();
});

//Rate value change
rate.addEventListener('change', e => (rateValue.textContent =
rate.value));    


//Pitch value change
pitch.addEventListener('change', e => (pitchvalue.textContent = 
pitch.value));

//Voice select change
voiceselect.addEventListener('change', e => speak());