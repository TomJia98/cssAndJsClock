const secondHand = document.querySelector("#second");
const minuteHand = document.querySelector("#minute");
const hourHand = document.querySelector("#hour");

const d = new Date(); // for now
let second = d.getSeconds();
let minute = d.getMinutes();
let hour = d.getHours();

let convertToSeconds = hour * 60 * 60 + minute * 60 + second;
// setting the data attribute of the current time digitally
secondHand.setAttribute("data-init", second);
minuteHand.setAttribute("data-init", minute);
hourHand.setAttribute("data-init", hour);

// setting it on the analog hands
const calcAnalog = (totalSeconds) => {
  const offset = 270;
  if (totalSeconds > 86400) {
    totalSeconds = totalSeconds - 86400;
  }
  let hours = Math.floor(totalSeconds / 60 / 60);
  totalSeconds = totalSeconds - hours * 60 * 60;
  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds - minute * 60;
  let seconds = totalSeconds;
  let analogSeconds = seconds * 6;
  let analogMinutes = (minutes + seconds / 60) * 6;
  let analogHours = (hours + (minutes + seconds / 60) / 60) * 30;
  if (analogSeconds > 360 + offset) {
    analogSeconds -= 360;
  }
  if (analogMinutes > 360 + offset) {
    analogMinutes -= 360;
  }
  if (analogHours > 360 + offset) {
    analogHours -= 360;
  }
  secondHand.style.transform = `rotateZ(${analogSeconds + offset}deg)`;
  minuteHand.style.transform = `rotateZ(${analogMinutes + offset}deg)`;
  hourHand.style.transform = `rotateZ(${analogHours + offset}deg)`;
};

calcAnalog(convertToSeconds);

let index = 0;
setInterval(
  (countdown = () => {
    const newSeconds = convertToSeconds + index;
    calcAnalog(newSeconds);
    index++;
  }),
  1000
);
