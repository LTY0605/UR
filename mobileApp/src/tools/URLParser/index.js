/**
 * Created by Jackie on 2017/2/17.
 */

// 说明：一个非常健全的 Javascript 链接(URL)解析类
// 整理：http://www.CodeBit.cn

/**
 * @projectDescription     Poly9's polyvalent URLParser class
 *
 * @author    Denis Laprise - denis@poly9.com - http://poly9.com
 * @version    0.1
 * @namespace    Poly9
 *
 * See the unit test file for more examples.
 * URLParser is freely distributable under the terms of an MIT-style license.
 */

if (typeof Poly9 == 'undefined') {
    var Poly9 = {};
}

/**
 * Creates an URLParser instance
 *
 * @classDescription    Creates an URLParser instance
 * @return {Object}    return an URLParser object
 * @param {String} url    The url to parse
 * @constructor
 * @exception {String}  Throws an exception if the specified url is invalid
 */
Poly9.URLParser = function (url) {
    var _this = this;

    this._fields = {
        'Username': 4,
        'Password': 5,
        'Port': 7,
        'Protocol': 2,
        'Host': 6,
        'Pathname': 8,
        'URL': 0,
        'Querystring': 9,
        'Fragment': 10
    };

    this._values = {};
    this._regex = null;
    this.version = 1;
    this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    this._paramValues = {};
    var paramParsed = false;

    for (var f in this._fields) {
        this['get' + f] = this._makeGetter(f);
    }

    if (typeof url != 'undefined') {
        this._parse(url);
    }

    var parseQueryString = function (hash) {
        if (paramParsed) return _this._paramValues;
        if (hash == null || hash.length <= 0) return null;
        var items = hash.split("&"), i, item;
        var i, j;

        for (i = 0, j = items.length; i < j; i++) {
            item = items[i].split("=");
            if (item.length === 2 && item[0].length > 0) {
                _this._paramValues[item[0]] = decodeURIComponent(item[1]);
            }
        }
        paramParsed = true;
        return _this._paramValues;
    };

    this.getQuery = function (key) {
        var param = parseQueryString(_this.getQuerystring());
        if (param == null) return null;
        return param[key];
    }
}

/**
 * @method
 * @param {String} url    The url to parse
 * @exception {String}     Throws an exception if the specified url is invalid
 */
Poly9.URLParser.prototype.setURL = function (url) {
    this._parse(url);
}

Poly9.URLParser.prototype._initValues = function () {
    for (var f in this._fields) {
        this._values[f] = '';
    }
}

Poly9.URLParser.prototype._parse = function (url) {
    this._initValues();
    var r = this._regex.exec(url);
    if (!r) throw "DPURLParser::_parse -> Invalid URL";

    for (var f in this._fields) if (typeof r[this._fields[f]] != 'undefined') {
        this._values[f] = r[this._fields[f]];
    }
}

Poly9.URLParser.prototype._makeGetter = function (field) {
    return function () {
        return this._values[field];
    }
}

export default Poly9.URLParser