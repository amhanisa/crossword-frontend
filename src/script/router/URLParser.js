const URLParser = {
  parseActiveURLWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this.urlSplitter(url);
    return this.urlCombiner(splittedUrl);
  },

  parseActiveURLWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this.urlSplitter(url);
  },

  urlSplitter(url) {
    const urlsSplits = url.split("/");
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  urlCombiner(splittedUrl) {
    return (
      (splittedUrl.resource ? `/${splittedUrl.resource}` : "/") +
      (splittedUrl.id ? "/:id" : "") +
      (splittedUrl.verb ? `/${splittedUrl.verb}` : "")
    );
  },
};

export default URLParser;
