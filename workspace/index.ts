import App from './app';
import Timer from './timer';
Timer.reset();

let app = new App();

app.runFistTurnCode();

while (true) {
    Timer.reset();
    app.runNextTurnCode();
}
