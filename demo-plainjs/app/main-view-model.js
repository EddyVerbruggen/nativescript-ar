const Observable = require("tns-core-modules/data/observable").Observable;

function createViewModel() {
    const viewModel = new Observable();
   
    return viewModel;
}

exports.createViewModel = createViewModel;
