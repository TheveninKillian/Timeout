localStorage.clear();

class Timeout {
  constructor() {
    this.time = {};
    localStorage.setItem('hour', 0);
    localStorage.setItem('minute', 25);
    localStorage.setItem('second', 0);
    localStorage.setItem('pause', 5);
    this.reset();
    this.chrome = chrome;
    this.initOpenWin = false;

    this.createMenusOptions();
    this.chrome.contextMenus.onClicked.addListener(() => {
      this.reset();
    });

    this.chrome.browserAction.onClicked.addListener(() => {
      if (localStorage.getItem('change') === 'true') {
        this.timeOptions();
        localStorage.setItem('change', false);
      }

      if (this.initClick === 1) {
        if (
          this.time.hour !== 0 ||
          this.time.minute !== 0 ||
          this.time.second !== 0
        ) {
          if (localStorage.getItem('isPause') === null) {
            this.activeTimer();
          } else {
            this.activePause();
          }

          this.initClick = 2;
        }
      } else {
        clearInterval(this.setActiveTimer);
        clearInterval(this.setActivePause);
        this.chromeBrowserAction('Timeout', '../src/img/sablierpause.png', '-');
        this.initClick = 1;
      }
    });

    window.addEventListener('storage', (e) => {
      if (e.newValue === 'activeStop') {
        this.reset();
      }

      if (e.newValue === 'activeWork') {
        if (this.initOpenWin === true) {
          this.openWin.close();
          this.initOpenWin = false;
        }
        this.activeTimer();
      }

      if (e.newValue === 'activePause') {
        if (this.initOpenWin === true) {
          this.openWin.close();
          this.initOpenWin = false;
        }
        this.activePause();
      }

      if (e.key === 'isStop') {
        localStorage.removeItem('isStop');
      }
    });
  }

  timeOptions() {
    this.time.hour = parseInt(localStorage.getItem('hour'));
    this.time.minute = parseInt(localStorage.getItem('minute'));
    this.time.second = parseInt(localStorage.getItem('second'));
    this.time.pause = parseInt(localStorage.getItem('pause'));
  }

  chromeBrowserAction(title, icon, badge) {
    chrome.browserAction.setTitle({
      title: title,
    });

    chrome.browserAction.setIcon({
      path: icon,
    });

    chrome.browserAction.setBadgeText({
      text: badge,
    });
  }

  createMenusOptions() {
    this.chrome.contextMenus.create({
      title: 'Stop timer',
      contexts: ['browser_action'],
    });
  }

  activeTimer() {
    this.count = `${this.time.hour}:${this.time.minute}:${this.time.second}`;

    if (this.time.hour === 0) {
      this.count = `${this.time.minute}:${this.time.second}`;
    } else if (this.time.hour === 0 && this.time.minute === 0) {
      this.count = `${this.time.second}sec`;
    } else if (
      this.time.hour === 0 &&
      this.time.minute === 0 &&
      this.time.second === 0
    ) {
      this.reset();
    }

    this.chromeBrowserAction(
      'Active',
      '../src/img/sablieractive.png',
      this.count
    );

    this.setActiveTimer = setInterval(() => {
      if (this.time.second === 0) {
        if (this.time.hour !== 0 && this.time.minute !== 0) {
          this.time.second = 60;
          this.count = `${this.time.hour}:${--this.time.minute}:${--this.time
            .second}`;
        } else if (this.time.hour !== 0 && this.time.minute === 0) {
          this.time.second = 60;
          this.time.minute = 60;
          this.count = `${--this.time.hour}:${this.time.minute}:${--this.time
            .second}`;
        } else if (this.time.hour === 0 && this.time.minute !== 0) {
          this.time.second = 60;
          this.count = `${--this.time.minute}:${--this.time.second}`;
        } else if (this.time.hour === 0 && this.time.minute === 0) {
          this.reset();
          this.initClick = 2;
          this.openWin = window.open('../paused.html');
          this.initOpenWin = true;
        }
      } else {
        this.count = `${this.time.hour}:${this.time.minute}:${--this.time
          .second}`;

        if (this.time.hour === 0 && this.time.minute !== 0) {
          this.count = `${this.time.minute}:${--this.time.second}`;
        } else if (this.time.hour === 0 && this.time.minute === 0) {
          this.count = `${--this.time.second}`;
        }
      }

      this.chromeBrowserAction(
        'Active',
        '../src/img/sablieractive.png',
        this.count
      );
    }, 1000);
  }

  activePause() {
    if (this.time.pause !== 0) {
      this.count = `${this.time.pause}min`;

      this.chromeBrowserAction(
        'Timeout',
        '../src/img/sablierpause.png',
        this.count
      );

      this.setActivePause = setInterval(() => {
        this.count = `${--this.time.pause}min`;

        if (this.time.pause === 0) {
          this.reset();
          this.initClick = 2;
          this.openWin = window.open('../work.html');
          this.initOpenWin = true;
        }

        this.chromeBrowserAction(
          'Timeout',
          '../src/img/sablierpause.png',
          this.count
        );
      }, 60000);
    } else {
      this.reset();
    }
  }

  reset() {
    localStorage.removeItem('isPause');
    localStorage.removeItem('isActive');

    clearInterval(this.setActiveTimer);
    clearInterval(this.setActivePause);

    this.initClick = 1;
    this.count = '';
    this.chromeBrowserAction('Timeout', '../src/img/icon.png', '');

    this.timeOptions();

    if (this.initOpenWin === true) {
      this.openWin.close();
      this.initOpenWin = false;
    }
  }
}

new Timeout();
