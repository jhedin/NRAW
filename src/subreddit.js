'use strict'

module.exports = function(requestor) {
	Subreddit.prototype.req = requestor;
	return Subreddit;
}

function Subreddit(name) {
	if (!(this instanceof Subreddit))
    	return new Subreddit();
	this.name = name;
}

Subreddit.prototype.getComments = function(opts) {
	opts = opts || {};
	opts.sort = opts.sort || "new";

	var options = {
		method: 'GET',
	    uri: 'https://oauth.reddit.com/r/' + this.name + '/comments',
	    qs: opts,
		headers: {
			'Authorization': 'bearer ' + this.req.get().tk,
			'User-Agent': this.req.get().ua
		},
		transform: function(data) {
			var ret = data.data.children.map(function(t){return t.data});
			ret.before = data.data.before;
			ret.after = data.data.after;

			return ret;	
		},
	    json: true
	};

	return this.req.request(options);
}

Subreddit.prototype.getLinks = function(opts) {
	opts = opts || {};
	opts.sort = opts.sort || "new";

	var options = {
		method: 'GET',
	    uri: 'https://oauth.reddit.com/r/' + this.name + '/' + opts.sort,
	    qs: opts,
		headers: {
			'Authorization': 'bearer ' + this.req.get().tk,
			'User-Agent': this.req.get().ua
		},
		transform: function(data) {
			var ret = data.data.children.map(function(t){return t.data});
			ret.before = data.data.before;
			ret.after = data.data.after;

			return ret;	
		},
	    json: true
	};

	return this.req.request(options);
}

