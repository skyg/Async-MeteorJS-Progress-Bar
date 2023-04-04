import { Meteor } from 'meteor/meteor';
import { ProgressBars } from '../imports/api/progressBars';

const STEP = 5;
// Todo: add speed increase event after waiting 30sc

Meteor.startup(() => {
    ProgressBars.remove({});
});

Meteor.publish('progressBars', function () {
    return ProgressBars.find();
});

Meteor.methods({
    startProgress: function () {
        const progressBarId = ProgressBars.insert({ progress: 0, link: null, speed: 1 });
        updateProgress(progressBarId);
        return progressBarId;
    },

    restartProgress: function (progressBarId) {
        ProgressBars.update(progressBarId, { $set: { progress: 0, link: null, speed: 1 } });
        updateProgress(progressBarId);
    },

    deleteProgress: function (progressBarId) {
        ProgressBars.remove(progressBarId);
    },
});

function updateProgress(progressBarId) {
    let progress = 0;
    const interval = Meteor.setInterval(() => {
        progress += STEP;
        let link = null;

        if (progress >= 100) {
            link = getRandomLink();
        }

        ProgressBars.update(progressBarId, { $set: { progress: progress, link: link } });

        if (progress >= 100) {
            Meteor.clearInterval(interval);
        }
    }, 1000);
}

function getRandomLink() {
    const links = [
        'https://www.lempire.com/',
        'https://www.lemlist.com/',
        'https://www.lemverse.com/',
        'https://www.lemstash.com/',
    ];

    return links[Math.floor(Math.random() * links.length)];
}
