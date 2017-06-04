$(document).ready(function () {

    //re-define init function
    ko.validation.init({

        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        errorClass: 'errorStyle',
        messageTemplate: null

    }, true);

    //function for checking captcha
    var checkCaptcha = function (val) {
        return val == 'y'
    }

    //function for checking password
    var checkPassword = function (val, other) {
        return val == other;
    }

    //check captcha

    //create the rules for validation
    var viewModel = {
        //var self = this;

        username: ko.observable().extend({
            required: true,
            minLength: 6,
            maxLength: 17
        }),
        email: ko.observable().extend({
            email: true
        }),
        password: ko.observable().extend({
            required: true
        }),
        captcha: ko.observable().extend({

            //custom Validation
            validation: {
                validator: checkCaptcha,
                message: 'Please check your captcha !!'
            }
        }),
        submit: function () {
            $('div.alert-success').hide();
            $('div.alert-danger').hide();
            if (viewModel.errors().length == 0) {
                alert('OK, great!!!');
                $('div.alert-success').show();
            } else {
                alert('Please check your submission');
                $('div.alert-danger').show();
            }
        }
    };

    //Catch errors
    viewModel.errors = ko.validation.group(viewModel);
    ko.applyBindings(viewModel);
});