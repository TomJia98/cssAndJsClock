const secondHand = document.querySelector("#second");
const minuteHand = document.querySelector("#minute");
const hourHand = document.querySelector("#hour");

const d = new Date(); // for now
let second = d.getSeconds();
let minute = d.getMinutes();
let hour = d.getHours();

let convertToSeconds = hour * 60 * 60 + minute * 60 + second;
console.log(convertToSeconds);
// setting the data attribute of the current time digitally
secondHand.setAttribute("data-init", second);
minuteHand.setAttribute("data-init", minute);
hourHand.setAttribute("data-init", hour);

// setting it on the analog hands
const calcAnalog = (totalSeconds) => {
  const offset = 270;
  //   let hours = Math.floor(totalSeconds / 60 / 60);
  //   let hoursFloat = totalSeconds / 3600;
  //   totalSeconds = totalSeconds - hours * 60 * 60;
  //   let minutes = Math.floor(totalSeconds / 60);
  //   let minuteFloat = totalSeconds / 60;
  //   totalSeconds = totalSeconds - minutes * 60;
  //   let seconds = totalSeconds;
  //   let analogSeconds = seconds * 6;
  //   let analogMinutes = (minuteFloat + seconds / 60) * 6;
  //   let analogHours = (hoursFloat + (minuteFloat + seconds / 60) / 60) * 30;
  let analogSeconds = totalSeconds * 6;
  let analogMinutes = (totalSeconds / 60) * 6;
  let analogHours = (totalSeconds / 3600) * 30;

  //   if (analogSeconds > 360 + offset) {
  //     analogSeconds -= 360;
  //   }
  //   if (analogMinutes > 360 + offset) {
  //     analogMinutes -= 360;
  //   }
  //   if (analogHours > 360 + offset) {
  //     analogHours -= 360;
  //   }
  secondHand.style.transform = `rotateZ(${analogSeconds + offset}deg)`;
  minuteHand.style.transform = `rotateZ(${analogMinutes + offset}deg)`;
  hourHand.style.transform = `rotateZ(${analogHours + offset}deg)`;
};

calcAnalog(convertToSeconds);

let index = 0;
setInterval(
  (countdown = () => {
    const newSeconds = convertToSeconds + index;
    if (newSeconds >= 86400) {
      newSeconds = 0;
      index = 0;
    }
    calcAnalog(newSeconds);
    index++;
  }),
  1000
);
