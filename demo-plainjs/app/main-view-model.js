const Observable = require("tns-core-modules/data/observable").Observable;

function createViewModel() {
    return new Observable();
}

exports.createViewModel = createViewModel;
