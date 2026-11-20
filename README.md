forked from https://github.com/tomayac/joy-con-webhid

# Ring-Con quick start

This demo reads the Ring-Con through the right Joy-Con. The Ring-Con must be
physically attached to the right Joy-Con before initialization.

## Requirements

- Linux with Bluetooth support.
- Node.js and npm.
- Chrome or Chromium with WebHID support, opened on the same computer as the
  Joy-Cons.

## Pair the Joy-Cons on Linux

Press and hold the sync button on a Joy-Con, then pair each Joy-Con separately.
The older Joy-Con Bluetooth protocol works more reliably with BR/EDR discovery:

```bash
sudo bluetoothctl
power on
agent on
default-agent
scan off
scan bredr
devices
pair XX:XX:XX:XX:XX:XX
connect XX:XX:XX:XX:XX:XX
info XX:XX:XX:XX:XX:XX
```

Repeat `pair` and `connect` for the other Joy-Con. Before opening the web page,
confirm that both devices report `Paired: yes` and `Connected: yes`.

If `scan off` reports that discovery is already stopped, that is harmless.
Run `scan bredr` again when a Joy-Con is not listed. Do not use `scan on` for
this pairing procedure.

## Run the current source after cloning or updating

```bash
git clone https://github.com/diyism/ring-con-webhid.git
cd ring-con-webhid
npm install
npm run server
```

After an update, use the same procedure:

```bash
git pull --ff-only
npm install                  # safe to repeat; updates dependencies if needed
npm run server
```

`npm run server` first runs the TypeScript/Vite build, copies the fresh bundle
to `demo/`, and starts the HTTP server with browser caching disabled. Do not
start the server by opening an old `demo/` copy or by copying an old `dist/`
file manually.

Open [http://127.0.0.1:8080](http://127.0.0.1:8080), then:

1. Click **Connect Joy-Cons**.
2. Select the right and left Joy-Cons in the WebHID chooser and connect them.
3. Insert the right Joy-Con into the Ring-Con.
4. Click **Connect Ring-Con**. The page sends the Ring-Con initialization
   commands, including `0x5C`, `0x5A`, and `0x40 0x03`.
5. Enable **Show debug info** and scroll to the bottom.
6. Squeeze and pull the Ring-Con. **Ring-Con Strain** should follow the physical
   force, not the right Joy-Con's pitch.

If the page was already open while the source was updated, reload it once with
`Ctrl+Shift+R` before reconnecting the Joy-Cons.

## Emulator controller layout

In Suyu, Yuzu, Eden, or a similar emulator, use:

```text
Player 1: connect controller = right Joy-Con; input device = right Joy-Con 1
Player 2: connect controller = dual Joy-Cons; input device = left Joy-Con 1
```

Do not enable **Advanced > Other > Enable direct Joy-Con driver**. Also do not
enable **Advanced > Emulated devices > Ring Controller > Enable Ring Input**;
that option can take the Ring-Con away from the right Joy-Con.

## Troubleshooting after `git pull`

- If `npm run server` does not print a build step, the checkout has an old
  `package.json`; update the repository before testing.
- If Ring-Con Strain follows right-Joy-Con pitch, stop the old server, run
  `npm run server` again, hard-refresh the page, and reconnect the devices.
- A successful **Ring-Con connected** message alone is not sufficient; verify
  that squeezing and pulling the Ring-Con changes the Strain value.

===============================================================================================

# Joy-Con WebHID

A [WebHID](https://web.dev/hid) driver for
[Nintendo Joy-Cons](https://en.wikipedia.org/wiki/Joy-Con) with support for all buttons, analog
sticks, all LEDs, and the device's gyroscope and accelerometer sensors.

## Demo

See the [live demo](https://tomayac.github.io/joy-con-webhid/demo/) of the driver.

<img width="800" alt="Joy-Con WebHID demo showing two Joy-Cons slightly tilted with one of the analog sticks moved to the right on one Joy-Con and the 'A' button pressed on the other." src="https://user-images.githubusercontent.com/145676/101152193-01fc4f80-3623-11eb-8afd-50485f2807c6.png">

Another demo is [Chrome Dino WebHID](https://github.com/tomayac/chrome-dino-webhid), where you
can play the Chrome dino game 🦖 over WebHID by jumping with a Joy-Con controller in your pocket.

[![Joy-Con WebHID Chrome dino demo](https://img.youtube.com/vi/HuhQXXgDnCQ/0.jpg)](https://www.youtube.com/watch?v=HuhQXXgDnCQ)

Yet another demo courtesy of [@light2peter](https://github.com/light2peter) is the [Web MIDI demo](https://tomayac.github.io/joy-con-webhid/demo/webmidi.html), where the Joy-Cons are being used to make music on Web MIDI receivers.

[![Joy-Con WebHID Web MIDI](https://img.youtube.com/vi/tMTnkjwSFNM/0.jpg)](https://youtu.be/tMTnkjwSFNM?t=42)

## Installation

```bash
npm install --save joy-con-webhid
```

(For **Linux**, see this [comment on Issue #3](https://github.com/tomayac/joy-con-webhid/issues/3#issuecomment-944427792)
for required pre-steps.)

## Usage

Make sure you have a pairing button on your page.

```html
<button class="connect" type="button">Connect Joy-Con</button>
```

Import the script and hook up the pairing button.
Then create an interval that waits for Joy-Cons to appear,
which can happen after pairing, on page load when previously paired Joy-Cons are reconnected,
and when Joy-Cons wake up again after being idle.

```js
import * as JoyCon from './node_modules/dist/index.js';

// For the initial pairing of the Joy-Cons. They need to be paired one by one.
// Once paired, Joy-Cons will be reconnected to on future page loads.
document.querySelector('.connect').addEventListener('click', async () => {
  // `JoyCon.connectJoyCon()` handles the initial HID pairing.
  // It keeps track of connected Joy-Cons in the `JoyCon.connectedJoyCons` Map.
  await JoyCon.connectJoyCon();
});

// Joy-Cons may sleep until touched and fall asleep again if idle, so attach
// the listener dynamically, but only once.
setInterval(async () => {
  for (const joyCon of JoyCon.connectedJoyCons.values()) {
    if (joyCon.eventListenerAttached) {
      continue;
    }
    // Open the device and enable standard full mode and inertial measurement
    // unit mode, so the Joy-Con activates the gyroscope and accelerometers.
    await joyCon.open();
    await joyCon.enableStandardFullMode();
    await joyCon.enableIMUMode();
    await joyCon.enableVibration();
    // Get information about the connected Joy-Con.
    console.log(await joyCon.getDeviceInfo());
    // Rumble.
    await joyCon.rumble(600, 600, 0.5);
    // Turn On and Off the Home LED 3 times
    await joyCon.setHomeLEDPattern(2, 3, 0, [
      { intensity: 0, fadeDuration: 10, duration: 5 },
      { intensity: 15, fadeDuration: 10, duration: 5 },
      { intensity: 0, fadeDuration: 10, duration: 5 },
    ]);
    // Listen for HID input reports.
    joyCon.addEventListener('hidinput', ({ detail }) => {
      // Careful, this fires at ~60fps.
      console.log(`Input report from ${joyCon.device.productName}:`, detail);
    });
    joyCon.eventListenerAttached = true;
  }
}, 2000);
```

## Why not use the Gamepad API?

The [Gamepad API](https://w3c.github.io/gamepad/)
supports Joy-Con controllers out-of-the-box,
but since the API (currently) does not have a concept of orientation,
the Joy-Cons' accelerometer and gyroscope data cannot be accessed.
The buttons and analog sticks are fully exposed, though.
If all you need is this, then by all means
[go for the Gamepad API](https://web.dev/gamepad/).

## Acknowledgements

This project takes heavy inspiration from [@wazho](https://github.com/wazho)'s
[ns-joycon](https://github.com/wazho/ns-joycon),
which in turn is based on [@dekuNukem](https://github.com/dekuNukem)'s
[Nintendo_Switch_Reverse_Engineering](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering).
The rumble code was contributed by
[@baku89](https://github.com/baku89).
The [HVC-Controller](https://twitter.com/taisukef/status/1572349705828569092) code was added by [@taisukef](https://github.com/taisukef).
The [Ring-Con](https://en.wikipedia.org/wiki/Ring_Fit_Adventure) code from [@mascii](https://github.com/mascii/demo-of-ring-con-with-web-hid).
TypeScript support was added by [@andrewgremlich](https://github.com/andrewgremlich).

## License

Apache 2.0.
