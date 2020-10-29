const request = require("request");
let anilistURL = "https://graphql.anilist.co";

module.exports = class anilist {
	static searchAnime(name) {
		return new Promise(function (resolve, reject) {
			request({
				url: anilistURL,
				method: "POST",
				json: true,
				body: {
					query: `
query {
  Media (search: "${name}", type: ANIME) {
    id
    episodes
    type
    description(asHtml: false)
    averageScore
    duration
    source
    status
    popularity
    isAdult
    favourites
    bannerImage
    coverImage {
      large
    }
    title {
      romaji
      native
      userPreferred
    }
    genres
    startDate {
      year
      month
      day
    }
  }
}
`
				}
			}, function(err, res, body) {
				if(res.statusCode === 200) {
					resolve(body);
				}
				if(res.statusCode === 404 || res.statusCode === 404) {
					reject(body);
				}
			})
		})
	}

	static searchCharacter(name) {
		return new Promise(function (resolve, reject) {
			request({
				url: anilistURL,
				method: "POST",
				json: true,
				body: {
					query: `
query {
  Character (search: "${name}") {
    name {
      first
      last
      full
      native
    }
    image {
      large
      medium
    }
    description
    siteUrl
  }
}
`
				}
			}, function(err, res, body) {
				if(res.statusCode === 200) {
					resolve(body);
				}
				if(res.statusCode === 404 || res.statusCode === 404) {
					reject(body);
				}
			})
		})
	}
}