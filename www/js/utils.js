'use strict';

define(function () {
    return {
        setCookie: function (name, value, time) {
            var oDate = new Date();
            oDate.setDate( oDate.getDate() + time);
            document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
        },
        getCookie : function (name) {
            return decodeURIComponent( document.cookie.match(name + '=[a-zA-Z0-9%\.]+')[0].split('=')[1] );
        },
        removeCookie: function  (name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
    }
});